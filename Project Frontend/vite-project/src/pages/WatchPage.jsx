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
  const { currentUser } = useAuth();
 
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
      setLoading(true);

      const data = await getVideoById(videoId);

      console.log("Video Data:", data);

      setVideo(data);

      setLikesCount(data.likesCount || 0);
      setIsLiked(data.isLiked || false);

      // Add to watch history only for logged-in user
      if (currentUser?._id) {
        console.log("Adding history:", videoId);

        await addToWatchHistory(videoId);
      }

    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  if (videoId) {
    fetchVideo();
  }
}, [videoId, currentUser?._id]);



useEffect(() => {
  if (video) {
    setIsSubscribed(video.isSubscribed || false);
    setSubscriberCount(video.subscribersCount || 0);
  }
}, [video]);


useEffect(() => {
  const fetchRelatedVideos = async () => {
    try {
      const data = await getAllVideos();

      console.log(data);
      console.log(Object.keys(data));

      const videos = data?.docs || [];

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

      setComments(data?.comments || []);

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



const handleLike = async () => {
  try {
    setLikeLoading(true);

    const response = await toggleVideoLike(videoId);

    console.log("Like API Response:", response);

    const data = response?.data;

    if (data) {
      setIsLiked(data.isLiked ?? false);
      setLikesCount(data.likesCount ?? 0);
    }

  } catch (error) {
    console.error("Like Error:", error);
  } finally {
    setLikeLoading(false);
  }
};



// SUBSCRIBE
const handleSubscribe = async () => {
  if (!currentUser?._id) {
    alert("Please login to subscribe");
    return;
  }

  if (!video?.owner?._id) return;

  const previousState = isSubscribed;

  try {
    setSubscribeLoading(true);

    setIsSubscribed(!previousState);

    setSubscriberCount((prev) =>
      previousState ? Math.max(prev - 1, 0) : prev + 1
    );

    await toggleSubscription(video.owner._id);

  } catch (error) {
    console.error("Subscription Error:", error);

    // Rollback
    setIsSubscribed(previousState);

    setSubscriberCount((prev) =>
      previousState ? prev + 1 : Math.max(prev - 1, 0)
    );

  } finally {
    setSubscribeLoading(false);
  }
};

useEffect(() => {
  const fetchPlaylists = async () => {
    try {
      if (!currentUser?._id) return;

      const data = await getUserPlaylists(currentUser._id);

      setPlaylists(data || []);

    } catch (error) {
      console.error("Playlist Error:", error);
    }
  };

  fetchPlaylists();

}, [currentUser?._id]);



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
    if (!currentUser?._id) {
      alert("Please login first");
      return;
    }

    if (!playlistName.trim() || !playlistDescription.trim()) {
      alert("Please enter playlist name and description");
      return;
    }

    await createPlaylist({
      name: playlistName,
      description: playlistDescription,
    });

    const data = await getUserPlaylists(currentUser._id);

    setPlaylists(data || []);

    setPlaylistName("");
    setPlaylistDescription("");

  } catch (error) {
    console.error("Create Playlist Error:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to create playlist"
    );
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
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">

    <div className="mx-auto w-full max-w-7xl">

        <div className="grid grid-cols-1 gap-5 lg:gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">

        {/* ================= LEFT ================= */}

        <div>

          {/* Video Player */}

          <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl sm:rounded-3xl">

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

            <div className="mt-4 rounded-2xl border border-gray-100 bg-[var(--bg)] p-4 shadow-lg sm:mt-6 sm:rounded-3xl sm:p-5 lg:p-7">

            <h1 className="text-2xl font-bold leading-tight text-[var(--text)] sm:text-3xl">

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

            <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-orange-50 p-4 sm:mt-8 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

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
    w-full 
    lg:w-auto
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

            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:mt-8 sm:p-6">

              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Description
              </h3>

              <p className="text-[var(--muted)] leading-8 whitespace-pre-line">

                {video?.description}

              </p>

            </div>



            {/* Action Buttons */}

           <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
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
                w-full 
                sm:w-auto
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
                  w-full 
                  sm:w-auto
                "
              >
                🔗 Share
              </button>

            </div>



            {/* ================= COMMENTS ================= */}

            <div className="mt-8 rounded-2xl border border-gray-100 bg-[var(--bg)] p-4 shadow-lg sm:mt-10 sm:rounded-3xl sm:p-7">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-[var(--text)]">

                  Comments

                </h2>

                <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">

                  {comments.length} Comments

                </span>

              </div>

                {currentUser && (
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
                p-4
                sm:p-5
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
                      gap-3
                      sm:gap-4
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

           <div className="rounded-2xl border border-gray-100 bg-[var(--bg)] p-4 shadow-lg sm:rounded-3xl sm:p-6 xl:sticky xl:top-24">
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
                    gap-3
                    rounded-2xl
                    sm:gap-4
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
                     className="h-20 w-28 shrink-0 rounded-xl object-cover sm:h-24 sm:w-40"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">    
    <div className="my-4 w-full max-w-md rounded-3xl bg-[var(--bg)] p-4 shadow-2xl sm:p-6">

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
       className="mb-3 w-full rounded-xl border border-gray-300 bg-transparent p-3 outline-none focus:border-orange-500"
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
