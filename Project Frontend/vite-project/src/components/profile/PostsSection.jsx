import { useEffect, useState } from "react";
import { createTweet, getUserTweets,deleteTweet } from "../../api/tweetApi";

const PostsSection = ({ user, isOwnProfile }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [publishing, setPublishing] = useState(false);

  const fetchPosts = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);

      const data = await getUserTweets(user._id);

      setPosts(data || []);
    } catch (error) {
      console.log("Posts Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handlePublish = async () => {
     
    if (!isOwnProfile) return;

    if (!content.trim()) {
      alert("Please write something!");
      return;
    }

    try {
      setPublishing(true);

      await createTweet(content);

      setContent("");

      await fetchPosts();

    } catch (error) {
      console.log(error);
      alert("Failed to publish post");
    } finally {
      setPublishing(false);
    }
  };


  const handleDeletePost = async (tweetId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) return;

  try {
    await deleteTweet(tweetId);

    setPosts((prev) =>
      prev.filter((post) => post._id !== tweetId)
    );

    alert("Post deleted successfully!");
  } catch (error) {
    console.error("Delete post error:", error);
    alert("Failed to delete post");
  }
};
  return (
    <div className="space-y-6">

      {/* Create Post */}

      <div className="rounded-2xl bg-[var(--bg)]/10 p-6 backdrop-blur-xl border border-white/10">

        <h2 className="text-2xl font-bold text-white">
          Create Post
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="mt-4 w-full rounded-xl bg-black/20 p-4 text-white outline-none"
        />

        <button
          onClick={handlePublish}
          disabled={publishing}
          className="mt-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 font-semibold text-white"
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="rounded-2xl bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">

          <h2 className="text-white text-xl">
            Loading Posts...
          </h2>

        </div>

      ) : posts.length === 0 ? (

        <div className="rounded-2xl bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">

          <h2 className="text-3xl font-bold text-white">
            No Posts Yet
          </h2>

          <p className="mt-3 text-[var(--muted)]">
            Publish your first post 🚀
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {posts.map((post) => (

            <div
              key={post._id}
              className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-6 backdrop-blur-xl"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold text-white">
                    {user?.fullName || user?.username}
                  </h2>

                  <p className="text-sm text-[var(--muted)]">
                    @{user?.username}
                  </p>

                </div>

               <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--muted)]">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>

              

              {isOwnProfile && (
                <button
                  type="button"
                  onClick={() => handleDeletePost(post._id)}
                  className="
                    rounded-lg
                    bg-red-500/20
                    px-3
                    py-1.5
                    text-sm
                    font-semibold
                    text-red-400
                    transition
                    hover:bg-red-500
                    hover:text-white
                  "
                >
                  Delete
                </button>
              )}
            </div>

              </div>

              <p className="mt-5 whitespace-pre-wrap text-[var(--muted)]">
                {post.content}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default PostsSection;