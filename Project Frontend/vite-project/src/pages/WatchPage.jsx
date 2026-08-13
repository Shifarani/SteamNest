import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoById,getAllVideos } from "../api/videoApi";
import { Link } from "react-router-dom";
import {getComments, addComment} from "../api/commentApi";
import { toggleVideoLike } from "../api/likeApi";
import { toggleSubscription } from "../api/subscriptionApi";
import { useAuth } from "../context/AuthContext";
import ShareModal from "../components/ShareModal";
import { addToWatchHistory } from "../api/userApi";
import {
  getUserPlaylists,
  createPlaylist,
  addVideoToPlaylist,
} from "../api/playlistApi";

  const WatchPage = () => {
  const { videoId } = useParams();
 
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
   const [commentText, setCommentText] = useState("");
   const [isLiked, setIsLiked] = useState(false);
   const [likeLoading, setLikeLoading] = useState(false);
   const [likesCount, setLikesCount] = useState(0);
   const [subscribeLoading, setSubscribeLoading] = useState(false);
   const [isSubscribed, setIsSubscribed] = useState(false);
const [subscriberCount, setSubscriberCount] = useState(0);
const [playlists, setPlaylists] = useState([]);
const [showPlaylistModal, setShowPlaylistModal] = useState(false);
const [playlistName, setPlaylistName] = useState("");
const [playlistDescription, setPlaylistDescription] = useState("");
const [showShareModal, setShowShareModal] = useState(false);


  useEffect(() => {
  const fetchVideo = async () => {
    try {
      const data = await getVideoById(videoId);

      console.log("Video Data:", data);

      setVideo(data);

      setLikesCount(data.likesCount || 0);
      setIsLiked(data.isLiked || false);

      console.log("Adding history:", videoId);

      await addToWatchHistory(videoId);

    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  if (videoId) {
    fetchVideo();
  }
}, [videoId]);



useEffect(() => {
  if (video) {
    setIsSubscribed(video.isSubscribed);
    setSubscriberCount(video.subscribersCount);
  }
}, [video]);



useEffect(() => {
  const fetchRelatedVideos = async () => {
    try {
      const data = await getAllVideos();

      console.log(data);
      console.log(Object.keys(data));

      const videos = data.docs;

      const filteredVideos = videos.filter(
        (item) => item._id !== videoId
      );

      setRelatedVideos(filteredVideos);

    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  fetchRelatedVideos();

}, [videoId]);



useEffect(() => {
  const fetchComments = async () => {
    try {
      const data = await getComments(videoId);

      console.log("Comments API Response:", data);

      setComments(data.comments);

    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  if (videoId) {
    fetchComments();
  }

}, [videoId]);



// ADD COMMENT
const handleAddComment = async () => {
  try {

    if (!commentText.trim()) return;

    const newComment = await addComment(videoId, commentText);

    setComments((prev) =>
      Array.isArray(prev)
        ? [newComment, ...prev]
        : [newComment]
    );

    setCommentText("");

  } catch (error) {
    console.error("Error adding comment:", error);
  }
};



// LIKE
const handleLike = async () => {
  try {

    setLikeLoading(true);

    await toggleVideoLike(videoId);

    if (isLiked) {

      setIsLiked(false);
      setLikesCount((prev) => prev - 1);

    } else {

      setIsLiked(true);
      setLikesCount((prev) => prev + 1);

    }

  } catch (error) {

    console.error(error);

  } finally {

    setLikeLoading(false);

  }
};



// SUBSCRIBE
const handleSubscribe = async () => {
  try {

    setSubscribeLoading(true);

    const previousState = isSubscribed;

    setIsSubscribed(!previousState);

    setSubscriberCount((prev) =>
      previousState ? prev - 1 : prev + 1
    );

    await toggleSubscription(video.owner._id);


  } catch(error) {

    console.error(error);

    setIsSubscribed(isSubscribed);

  } finally {

    setSubscribeLoading(false);

  }
};

useEffect(() => {
  const fetchPlaylists = async () => {
    try {
      if (!currentUser) return;

      const data = await getUserPlaylists(currentUser._id);

      setPlaylists(data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchPlaylists();

}, [currentUser]);



// LOADING RETURN
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
      Loading...
    </div>
  );
}



// VIDEO NOT FOUND RETURN
if (!video) {
  return (
    <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-red-500">
      Video not found
    </div>
  );
}

const handleCreatePlaylist = async () => {
  try {
    if (!playlistName.trim() || !playlistDescription.trim()) return;

    await createPlaylist({
      name: playlistName,
      description: playlistDescription,
    });

    const data = await getUserPlaylists(currentUser._id);

    setPlaylists(data);
    setPlaylistName("");
    setPlaylistDescription("");

  } catch (error) {
    console.error(error);
  }
};

const handleAddToPlaylist = async (playlistId) => {
  console.log("Playlist Clicked:", playlistId);
  try {
    await addVideoToPlaylist(videoId, playlistId);

    alert("Video added to playlist!");

    setShowPlaylistModal(false);

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "something went wrong");
  }
};

console.log("showShareModal:", showShareModal);
return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-8 px-4">

    <div className="max-w-7xl mx-auto">

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">

        {/* ================= LEFT ================= */}

        <div>

          {/* Video Player */}

          <div className="overflow-hidden rounded-3xl bg-black shadow-2xl">

            <div className="aspect-video">

              <video
                controls
                poster={video?.thumbnail}
                className="h-full w-full"
              >
                <source
                  src={video?.videoFile}
                  type="video/mp4"
                />

                Your browser does not support the video tag.

              </video>

            </div>

          </div>



          {/* ================= VIDEO DETAILS ================= */}

          <div className="mt-6 rounded-3xl bg-[var(--bg)] p-7 shadow-lg border border-gray-100">

            <h1 className="text-3xl font-bold text-[var(--text)] leading-tight">

              {video?.title}

            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--text)]">

              <span className="rounded-full bg-orange-100 px-4 py-1 text-orange-600 font-medium">

                👁 {video?.views} Views

              </span>

              <span className="rounded-full bg-purple-100 px-4 py-1 text-purple-600 font-medium">

                📅 {new Date(video?.createdAt).toLocaleDateString()}

              </span>

            </div>



            {/* Channel Card */}

            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-orange-50 p-5">

              <div className="flex items-center gap-4">

                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?.fullName}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-orange-100"
                />

                <div>

                  <h2 className="text-xl font-bold text-[var(--text)]">

                    {video?.owner?.fullName}

                  </h2>

                  <p className="text-[var(--text)]">

                    @{video?.owner?.username}

                  </p>
                  <p className="text-sm text-orange-600 font-semibold mt-1">
                    👥 {video?.subscribersCount} Subscribers
              </p>

                </div>

              </div>



             <button
  onClick={handleSubscribe}
  disabled={subscribeLoading}
  className={`
    h-12
    rounded-full
    px-8
    text-white
    font-semibold
    transition
    hover:scale-105
    hover:shadow-xl
    ${
          isSubscribed
        ? "bg-green-600"
        : "bg-gradient-to-r from-orange-500 to-purple-600"
    }
  `}
>
  {
    subscribeLoading
      ? "Loading..."
      : isSubscribed
        ? "Subscribed ✓"
        : "Subscribe"
  }
</button>

            </div>
                        {/* Description */}

            <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-100 p-6">

              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Description
              </h3>

              <p className="text-[var(--muted)] leading-8 whitespace-pre-line">

                {video?.description}

              </p>

            </div>



            {/* Action Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className={`
                    flex
                    items-center
                    gap-2
                    rounded-full
                    px-6
                    py-3
                    text-white
                    font-semibold
                    shadow-md
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-xl
                    ${
                      isLiked
                        ? "bg-red-600"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  `}
                >
                 {
                  likeLoading
                    ? "Loading..."
                    : `${isLiked ? "❤️ Liked" : "🤍 Like"} (${likesCount})`
                }
                </button>

              <button
                onClick={() => setShowPlaylistModal(true)}
                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-violet-600
                px-6
                py-3
                text-white
                font-semibold
                shadow-md
                transition-all
                hover:-translate-y-1
                hover:bg-violet-700
                hover:shadow-xl
                "
              >
                📂 Save
              </button>

              <button
                onClick={() => {
                  console.log("Share button clicked");
                  setShowShareModal(true);
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-slate-800
                  px-6
                  py-3
                  text-white
                  font-semibold
                "
              >
                🔗 Share
              </button>

            </div>



            {/* ================= COMMENTS ================= */}

            <div className="mt-10 rounded-3xl border border-gray-100 bg-[var(--bg)] p-7 shadow-lg">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-[var(--text)]">

                  Comments

                </h2>

                <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">

                  {comments.length} Comments

                </span>

              </div>

                {!isReadonly && (
                  <>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="
                mt-6
                h-32
                w-full
                rounded-2xl
                border
                border-gray-300
                p-5
                outline-none
                resize-none
                transition
                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-100
                "
              />



              <button
                onClick={handleAddComment}
                className="
                mt-5
                rounded-xl
                bg-gradient-to-r
                from-orange-500
                to-purple-600
                px-7
                py-3
                font-semibold
                text-white
                transition
                hover:scale-105
                hover:shadow-xl
                "
              >
                Post Comment
              </button>
                </>
            )}


              <div className="mt-8 space-y-6">

              </div>

                             {comments.length === 0 ? (

                  <div className="rounded-2xl border border-dashed border-gray-300 py-10 text-center">

                    <p className="text-[var(--text)]">
                      No comments yet. Be the first to comment 🚀
                    </p>

                  </div>

                ) : (

                  comments.map((comment) => (

                    <div
                      key={comment._id}
                      className="
                      flex
                      gap-4
                      rounded-2xl
                      border
                      border-gray-100
                      bg-gray-50
                      p-5
                      transition
                      hover:border-orange-200
                      hover:bg-orange-50
                      "
                    >

                      <img
                        src={comment.owner?.avatar}
                        alt={comment.owner?.fullName}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-100"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold text-[var(--text)]">

                          {comment.owner?.fullName}

                        </h3>

                        <p className="mt-2 leading-7 text-[var(--muted)]">

                          {comment.content}

                        </p>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>



          {/* ================= RIGHT SIDEBAR ================= */}

          <div>

            <div className="sticky top-24 rounded-3xl border border-gray-100 bg-[var(--bg)] p-6 shadow-lg">

              <h2 className="mb-6 text-2xl font-bold text-[var(--text)]">

                Related Videos

              </h2>

              <div className="space-y-5">

                {relatedVideos.map((item) => (

                  <Link
                    key={item._id}
                    to={`/watch/${item._id}`}
                    className="
                    flex
                    gap-4
                    rounded-2xl
                    p-3
                    transition-all
                    hover:bg-orange-50
                    hover:shadow-md
                    "
                  >

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-24 w-40 rounded-xl object-cover"
                    />

                    <div className="flex flex-col justify-between">

                      <h3 className="line-clamp-2 font-semibold text-[var(--text)]">

                        {item.title}

                      </h3>

                      <div>

                        <p className="text-sm text-[var(--muted)]">

                          {item.owner?.fullName}

                        </p>

                        <p className="mt-1 text-xs text-gray-400">

                          👁 {item.views} Views

                        </p>

                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
      {showPlaylistModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-full max-w-md rounded-3xl bg-[var(--bg)] p-6 shadow-2xl">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📂 Save to Playlist</h2>

        <button
          onClick={() => setShowPlaylistModal(false)}
          className="text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">

        {playlists.length === 0 ? (
          <p className="text-[var(--text)]">
            No playlists found
          </p>
        ) : (
          playlists.map((playlist) => (
            <button
              key={playlist._id}
              onClick={() => handleAddToPlaylist(playlist._id)}
              className="w-full rounded-xl border p-4 text-left hover:bg-orange-50"
            >
              <h3 className="font-semibold">
                {playlist.name}
              </h3>

              <p className="text-sm text-[var(--text)]">
                {playlist.description}
              </p>
            </button>
          ))
        )}

      </div>

      <hr className="my-6" />

      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        className="mb-3 w-full rounded-xl border p-3"
      />

      <textarea
        placeholder="Description"
        value={playlistDescription}
        onChange={(e) => setPlaylistDescription(e.target.value)}
        className="mb-4 w-full rounded-xl border p-3"
      />

      <button
        onClick={handleCreatePlaylist}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 py-3 font-semibold text-white"
      >
        ➕ Create Playlist
      </button>

            

    </div>
  </div>
)}

<ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        video={video}
      />

    </div>

  );
}


export default WatchPage; 