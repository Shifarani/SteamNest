import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import {
  Camera,
  Mail,
  CalendarDays,
  Pencil,
  ShieldCheck,
  Video,
  Eye,
  Heart,
  Users,
  Plus,
  MapPin,
  Search,
  MessageCircle,
} from "lucide-react";

import {
  getCurrentUser,
  getUserChannelProfile,
  updateAvatar,
  updateCoverImage,
  updateAccountDetails
} from "../api/userApi";

import { getChannelStats } from "../api/dashboardApi";

import { useNavigate } from "react-router-dom";
import { getChannelVideos } from "../api/dashboardApi";
import { deleteVideo, getAllVideos } from "../api/videoApi";

import ActivityTabs from "../components/profile/ActivityTabs";
import PostsSection from "../components/profile/PostsSection";
import VideosSection from "../components/profile/VideosSection";
import CommentsSection from "../components/profile/CommentsSection";
import LikesSection from "../components/profile/LikesSection";
import ImagesSection from "../components/profile/ImagesSection";
import { createStory, getActiveStories, deleteStory} from "../api/storyApi";
import { div } from "framer-motion/client";

import StoryBar from "../components/Story/StoryBar";
import { searchUsers } from "../api/userApi";
import { useAuth } from "../context/AuthContext";



function Profile() {
  const { currentUser } = useAuth();
  const { username } = useParams();
const [hasStory, setHasStory] = useState(false);
const [story, setStory] = useState(null);
const [storyOpen, setStoryOpen] = useState(false);
const [storyUploading, setStoryUploading] = useState(false);
const [myStories, setMyStories] = useState([]);
const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
const [allStories, setAllStories] = useState([]);
const [activeStoryUser, setActiveStoryUser] = useState(null);
const [activeUserStories, setActiveUserStories] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [avatar, setAvatar] = useState(null);

  const [coverImage, setCoverImage] = useState(null);

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [postSearchTerm, setPostSearchTerm] = useState("");
const [latestPost, setLatestPost] = useState(null);
const [showPostBox, setShowPostBox] = useState(false);
const [postText, setPostText] = useState("");
const [showCreateMenu, setShowCreateMenu] = useState(false);
const navigate = useNavigate();
const [videos, setVideos] = useState([]);
const [activeTab, setActiveTab] = useState("posts");
const [stats, setStats] = useState({
  totalVideos: 0,
  totalViews: 0,
  totalLikes: 0,
  totalSubscribers: 0,
});
const [editFullName, setEditFullName] = useState("");
const [editEmail, setEditEmail] = useState("");
const [editAvatarFile, setEditAvatarFile] = useState(null);
const [savingProfile, setSavingProfile] = useState(false);
const [showStories, setShowStories] = useState(false);
const [searchUsersResult, setSearchUsersResult] = useState([]);

useEffect(() => {
  const fetchVideos = async () => {
    if (!user?._id) return;

    try {
      const response = await getAllVideos(user._id);

      console.log("Profile Videos:", response);

      setVideos(response?.docs || []);
    } catch (error) {
      console.log("Profile Videos Error:", error);
      setVideos([]);
    }
  };

  fetchVideos();
}, [user?._id]);

useEffect(() => {
  const search = async () => {
    if (!searchTerm.trim()) {
      setSearchUsersResult([]);
      return;
    }

    try {
      const response = await searchUsers(searchTerm);

      setSearchUsersResult(response.data || []);
    } catch (error) {
      console.error("User search error:", error);
      setSearchUsersResult([]);
    }
  };

  const timer = setTimeout(search, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);



useEffect(() => {
  if (!storyOpen || activeUserStories.length <= 1) return;

  const timer = setTimeout(() => {
    if (currentStoryIndex < activeUserStories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setStoryOpen(false);
      setCurrentStoryIndex(0);
      setStory(activeUserStories[0] || null);
    }
  }, 5000);

  return () => clearTimeout(timer);
}, [storyOpen, currentStoryIndex, activeUserStories]);

  const fetchProfile = async () => {
  try {
    let response;

    if (username) {
      // Other user's profile
      response = await getUserChannelProfile(username);
    } else {
      // Logged-in user's own profile
      response = await getCurrentUser();
    }

    setUser(response.data || response);
  } catch (error) {
    console.log("Profile fetch error:", error);
  } finally {
    setLoading(false);
  }
};

const isOwnProfile =
  !username ||
  currentUser?._id?.toString() === user?._id?.toString();
  
useEffect(() => {
  fetchProfile();
}, [username]);

  const fetchMyStory = async () => {
  try {
    const stories = await getActiveStories();

    const allActiveStories = stories || [];

    // Saari allowed stories save karo
    setAllStories(allActiveStories);

    // Current user's stories
    const currentUserId = user?._id?.toString();

    const userStories = allActiveStories.filter((item) => {
      const ownerId =
        item.owner?._id?.toString() ||
        item.owner?.toString();

      return ownerId === currentUserId;
    });

    setMyStories(userStories);
    setHasStory(userStories.length > 0);

    if (userStories.length > 0) {
  setActiveStoryUser(user);
}

    setCurrentStoryIndex(0);
    setStory(userStories[0] || null);

  } catch (error) {
    console.log("Story fetch error:", error);
  }
};

useEffect(() => {
  if (user?._id) {
    fetchMyStory();
  }
}, [user]);

const handleStoryUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setStoryUploading(true);

    // Direct file bhejna hai
    await createStory(file);

    console.log("Story uploaded successfully");

    // Latest story fetch
    await fetchMyStory();

    alert("Story uploaded successfully!");

  } catch (error) {
    console.error("Story upload error:", error);
    console.error("Backend error:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Story upload failed!"
    );
  } finally {
    setStoryUploading(false);

    // Same file dobara select kar sake
    e.target.value = "";
  }
};

  const fetchStats = async () => {

  try {

    const response = await getChannelStats();

    console.log("Profile Stats:", response);

    setStats(response.data);

  } catch(error) {

    console.log("Stats Error:", error);

  }

};


useEffect(() => {

  fetchStats();

}, []);

 const handleAvatarChange = async(e)=>{
  if (!isOwnProfile) return;

 const file = e.target.files[0];

 if(!file) return;


 setAvatar(
   URL.createObjectURL(file)
 );


 const formData = new FormData();

 formData.append(
   "avatar",
   file
 );


 try{

   const response = await updateAvatar(formData);

   console.log("Avatar Update Response:", response);


   setUser(response.data);


   setAvatar(response.data.avatar);


 }catch(error){

   console.log(error);

 }

};
 const handleCoverChange = async (e) => {
      if (!isOwnProfile) return;

  const file = e.target.files[0];

  if(!file) return;


  // instant preview
  setCoverImage(URL.createObjectURL(file));


  const formData = new FormData();

  formData.append(
    "coverImage",
    file
  );


  try {

    const response = await updateCoverImage(formData);
   
console.log("Cover Update Response:", response);

    console.log(
      "Cover Updated",
      response
    );


    setUser(response.data);

  } catch(error){

    console.log(error);

  }

}; 

  if (loading) {
  return   (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-purple-700 to-slate-950">
        <h1 className="text-3xl font-bold text-white animate-pulse">
          Loading Profile...
        </h1>
      </div>
    );
  }

  const handleDeleteVideo = async (videoId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this video?"
  );

  if (!confirmDelete) return;

  try {
    await deleteVideo(videoId);

    alert("Video deleted successfully!");

    setVideos((prev) =>
      prev.filter((video) => video._id !== videoId)
    );

  } catch (error) {
    console.error(error);
    alert("Failed to delete video");
  }
};

const handleOpenUserStory = (userStories) => {
  if (!userStories?.length) return;

  setActiveUserStories(userStories);
  setCurrentStoryIndex(0);
  setStory(userStories[0]);
  setStoryOpen(true);

  const owner = userStories[0]?.owner;

  setActiveStoryUser(owner);
};

const storyUsers = Object.values(
  allStories.reduce((groups, storyItem) => {
    const ownerId =
      storyItem.owner?._id?.toString() ||
      storyItem.owner?.toString();

    if (!ownerId) return groups;

    if (!groups[ownerId]) {
      groups[ownerId] = {
        owner: storyItem.owner,
        stories: [],
      };
    }

    groups[ownerId].stories.push(storyItem);

    return groups;
  }, {})
);

const filteredVideos = videos.filter((video) =>
  video.title
    ?.toLowerCase()
    .includes(postSearchTerm.toLowerCase())
);


 return (
  <>
    {/* ================= Background Glow ================= */}

    <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-orange-500/20 blur-[170px]" />

    <div className="absolute top-0 right-[-120px] h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[170px]" />

    <div className="absolute bottom-[-120px] left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-violet-600/20 blur-[170px]" />

    <div className="relative min-h-screen bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-6 py-8">

      {/* ================= Hero Card ================= */}

      <div className="overflow-hidden rounded-[32px] border border-white/15 bg-[var(--bg)]/10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,.35)]">

        {/* ================= Cover ================= */}

         <div className="relative h-[220px] sm:h-[250px] md:h-[280px] overflow-hidden rounded-3xl group">

                <img
                  src={
                    coverImage ||
                    user?.coverImage ||
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&auto=format&fit=crop&q=80"
                  }
                  alt="cover"
                  className="
                    h-full w-full object-cover
                    transition duration-700
                    group-hover:scale-105
                  "
                />

                {/* Dark overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/20
                  to-transparent
                  pointer-events-none
                " />

                {/* 🌈 Colorful hover glow */}
                <div className="
                  absolute inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all duration-500
                  bg-gradient-to-r
                  from-orange-500/20
                  via-pink-500/20
                  to-purple-600/20
                  pointer-events-none
                " />

                {/* 📁 Hidden file input */}
                <input
                  id="coverInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverChange}
                />

                {/* ✨ CHANGE COVER BUTTON */}
                <label
                  htmlFor="coverInput"
                  className="
                    absolute
                    right-6
                    bottom-6
                    z-20
                    cursor-pointer

                    flex
                    items-center
                    gap-2

                    rounded-2xl
                    px-5
                    py-3

                    font-semibold
                    text-white

                    bg-black/40
                    backdrop-blur-md

                    border
                    border-white/30

                    shadow-lg

                    opacity-0
                    translate-y-3

                    group-hover:opacity-100
                    group-hover:translate-y-0

                    transition-all
                    duration-300

                    hover:bg-gradient-to-r
                    hover:from-orange-500
                    hover:via-pink-500
                    hover:to-purple-600

                    hover:scale-105
                  "
                >
                  📷 Change Cover
                </label>

              </div>

              


        {/* ================= Bottom ================= */}

        <div className="relative px-10 pb-10">

          {/* ================= Avatar ================= */}

          <div className="absolute -top-20 left-10">

            <div className="relative">

              {/* ================= STORY RING ================= */}

              <div
                className="relative h-40 w-40 rounded-full p-[5px]"
                style={
                  myStories.length > 0
                    ? {
                        background: `conic-gradient(
                          ${Array.from(
                            { length: myStories.length },
                            (_, index) => {
                              const total = myStories.length;

                              const start =
                                (index / total) * 360;

                              const end =
                                ((index + 1) / total) * 360 - 4;

                              return `#f97316 ${start}deg, #ec4899 ${end}deg`;
                            }
                          ).join(", ")}
                        )`,
                      }
                    : {}
                }
              >

                {/* ================= AVATAR ================= */}

                <div
                 onClick={() => {
                    if (myStories.length > 0) {
                      setShowStories(true);
                    }
                  }}
                  className={`h-full w-full rounded-full bg-[#111827] p-[5px] ${
                    myStories.length > 0 ? "cursor-pointer" : ""
                  }`}
                >


                  

                  <img
                    src={
                      avatar ||
                      user?.avatar ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                  />

                </div>

              </div>

                



              {/* ================= AVATAR INPUT ================= */}

              <input
                id="avatarInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />

              {/* ================= STORY INPUT ================= */}

                            {isOwnProfile && (
                <>
                  <input
                    id="storyInput"
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleStoryUpload}
                  />

                  {/* ================= STORY + BUTTON ================= */}

                  <label
                    htmlFor="storyInput"
                    className="absolute bottom-2 right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-violet-600 shadow-xl transition hover:scale-110"
                  >
                    <Plus size={18} />
                  </label>
                </>
              )}

            </div>

          </div>

          {/* ================= User Info ================= */}

          <div className="pl-48 pt-8">

            <div className="flex flex-wrap items-center justify-between gap-6">

              <div>

                <h1 className="text-5xl font-black tracking-tight">
                  {user?.fullName || "SteamNest User"}
                </h1>

                <p className="mt-3 text-lg text-orange-200">
                  @{user?.username || "username"}
                </p>

              </div>

              <div className="flex gap-4">

               {isOwnProfile && (
                    <button
                      onClick={() => setEditProfileOpen(true)}
                      className="
                        flex items-center gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-orange-500
                        to-violet-600
                        px-7 py-3
                        font-semibold
                        shadow-xl
                        transition
                        hover:scale-105
                      "
                    >
                      <Pencil size={18} />
                      Edit Profile
                    </button>
                  )}
                <Link
                  to="/dashboard"
                  className="rounded-2xl border border-white/20 bg-[var(--bg)]/10 px-7 py-3 font-semibold backdrop-blur-xl transition hover:bg-[var(--bg)]/20"
                >
                  Go to Dashboard
                </Link>

              </div>

            </div>
                        {/* ================= Search ================= */}

           <div className="mt-10">

  <div className="relative">

    <Search
      size={20}
      className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-300"
    />

    <input
      type="text"
      value={postSearchTerm}
      onChange={(e) => setPostSearchTerm(e.target.value)}
      placeholder="Search posts..."
      className="
        w-full
        rounded-3xl
        border
        border-white/15
        bg-[var(--bg)]/10
        backdrop-blur-3xl
        py-5
        pl-16
        pr-6
        text-white
        placeholder:text-gray-300
        outline-none
        transition-all
        duration-300
        focus:border-orange-400
        focus:bg-[var(--bg)]/15
        focus:ring-4
        focus:ring-orange-500/20
      "
    />

    {/* SEARCH RESULTS */}
    {searchUsersResult.length > 0 && (
      <div className="
        absolute
        left-0
        right-0
        top-full
        z-50
        mt-2
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-slate-900/95
        shadow-2xl
        backdrop-blur-xl
      ">

       {searchUsersResult.map((searchedUser) => (
        <div
          key={searchedUser._id}
          onClick={() => {
            navigate(`/profile/${searchedUser.username}`);
            setSearchTerm("");
            setSearchUsersResult([]);
          }}
          className="
            flex
            cursor-pointer
            items-center
            gap-3
            px-5
            py-3
            transition
            hover:bg-white/10
          "
        >

            <img
              src={
                searchedUser.avatar ||
                "/default-avatar.png"
              }
              alt={searchedUser.username}
              className="
                h-10
                w-10
                rounded-full
                object-cover
              "
            />

            <div>
              <p className="font-semibold text-white">
                {searchedUser.fullName}
              </p>

              <p className="text-sm text-gray-400">
                @{searchedUser.username}
              </p>
            </div>

          </div>
        ))}

      </div>
    )}

  </div>

</div>
            {/* ================= Activity ================= */}

            <div className="mt-10">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold tracking-wide">
                  Activity
                </h2>

                <div className="relative">
                   {isOwnProfile && ( 
                  <button
                    onClick={() =>
                      setShowCreateMenu(!showCreateMenu)
                    }
                    className="
                      flex items-center gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-orange-500
                      to-purple-600
                      px-6 py-3
                      font-semibold
                      text-white
                      shadow-lg
                      transition
                      hover:scale-105
                    "
                  >
                    + Create
                  </button>
                   )}

                  {isOwnProfile && showCreateMenu && (

                    <div
                      className="
                        absolute
                        right-0
                        z-50
                        mt-3
                        w-52
                        rounded-2xl
                        border
                        border-white/20
                        bg-[#111827]
                        p-3
                        shadow-2xl
                      "
                    >

                      {/* Upload Video */}
                       {isOwnProfile && (  
                      <button
                        onClick={() => {
                          navigate("/upload");
                          setShowCreateMenu(false);
                        }}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-xl
                          px-4
                          py-3
                          text-white
                          hover:bg-[var(--bg)]/10
                        "
                      >
                        🎥 Upload Video
                      </button>
                       )}

                      {/* Create Post */}

                      <button
                        onClick={() => {
                          setActiveTab("posts");
                          setShowCreateMenu(false);
                        }}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-xl
                          px-4
                          py-3
                          text-white
                          hover:bg-[var(--bg)]/10
                        "
                      >
                        📝 Create Post
                      </button>

                    </div>

                  )}

                </div>

              </div>

              {/* ================= Activity Tabs ================= */}

              <ActivityTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <div className="mt-6">

                {/* ================= POSTS ================= */}

                {activeTab === "posts" && (
                  <>
                    {/* Your Posts */}

                    <h2 className="mb-6 mt-8 text-2xl font-bold">
                      Latest Post
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                     {filteredVideos.map((video) => (

                        <Link
                          key={video._id}
                          to={`/watch/${video._id}`}
                          className="block"
                        >

                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-56 w-full object-cover"
                          />

                          <div className="p-5">

                            <h3 className="text-xl font-bold text-white">
                              {video.title}
                            </h3>

                            <p className="mt-2 text-gray-300">
                              {video.description}
                            </p>

                            <div className="mt-4 text-sm text-gray-300">
                              👁 {video.views} Views
                            </div>

                            {isOwnProfile && (
                            <div className="mt-5 flex gap-3">

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  navigate(
                                    `/edit-video/${video._id}`
                                  );
                                }}
                                className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                              >
                                ✏️ Edit
                              </button>

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  handleDeleteVideo(video._id);
                                }}
                                className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                              >
                                🗑 Delete
                              </button>

                            </div>
                            )}

                          </div>

                        </Link>

                      ))}

                    </div>
                  </>
                )}

           

<div className="mt-6">

  {/* ================= POSTS ================= */}

  {activeTab === "posts" && (
    <PostsSection 
    user={user}
    isOwnProfile={isOwnProfile}
    />
  )}

  {/* ================= VIDEOS ================= */}

  {activeTab === "videos" && (
    <VideosSection
      videos={videos}
      onDelete={handleDeleteVideo}
    />
  )}

  {/* ================= COMMENTS ================= */}

  {activeTab === "comments" && (
    <CommentsSection />
  )}

  {/* ================= LIKES ================= */}

  {activeTab === "likes" && (
    <LikesSection />
  )}

  {/* ================= IMAGES ================= */}

  {activeTab === "images" && (
    <ImagesSection />
  )}

</div>

              </div>
                            {/* ================= Latest Post Card ================= */}

              <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg)]/10 backdrop-blur-2xl shadow-2xl">

                {/* ================= Header ================= */}

                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        avatar ||
                        user?.avatar ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      alt="avatar"
                      className="h-14 w-14 rounded-full border-2 border-orange-400 object-cover"
                    />

                    <div>

                      <h3 className="text-lg font-bold">
                        {user?.fullName}
                      </h3>

                      <p className="text-sm text-gray-300">
                        @{user?.username} • 2 hours ago
                      </p>

                    </div>

                  </div>

                  <button
                    className="
                      rounded-full
                      bg-[var(--bg)]/10
                      p-2
                      transition
                      hover:bg-[var(--bg)]/20
                    "
                  >
                    ⋮
                  </button>

                </div>

                {/* ================= Thumbnail ================= */}

                <div className="relative h-[340px] overflow-hidden">

                  <img
                    src={
                      latestPost?.thumbnail ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80"
                    }
                    alt="post"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />

                </div>

                {/* ================= Content ================= */}

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {latestPost?.title || "No Title"}
                  </h2>

                  <p className="mt-3 leading-7 text-gray-300">
                    {latestPost?.description ||
                      "No description available."}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-6 text-gray-300">

                    {/* Likes */}

                    <div className="flex items-center gap-2">
                      <Heart
                        size={18}
                        className="text-red-400"
                      />
                      <span>128 Likes</span>
                    </div>

                    {/* Comments */}

                    <div className="flex items-center gap-2">
                      <MessageCircle
                        size={18}
                        className="text-sky-400"
                      />
                      <span>
                        {latestPost?.comments || 0} Comments
                      </span>
                    </div>

                    {/* Views */}

                    <div className="flex items-center gap-2">
                      <Eye
                        size={18}
                        className="text-orange-300"
                      />
                      <span>
                        {latestPost?.views || 0} Views
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

{/* ================= EDIT PROFILE ================= */}

{isOwnProfile && editProfileOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">

    <div className="relative w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#111827] p-8 shadow-2xl">

      {/* Close */}

      <button
        onClick={() => setEditProfileOpen(false)}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
      >
        ×
      </button>

      {/* Heading */}

      <h2 className="text-3xl font-bold text-white">
        Edit Profile
      </h2>

      <p className="mt-2 text-gray-400">
        Update your profile information
      </p>

      {/* Profile */}

      <div className="mt-8 flex items-center gap-5">

        <img
          src={
            editAvatarFile
              ? URL.createObjectURL(editAvatarFile)
              : avatar ||
                user?.avatar ||
                "https://ui-avatars.com/api/?name=User"
          }
          alt="avatar"
          className="h-24 w-24 rounded-full border-4 border-orange-500 object-cover"
        />

        <div>

          <h3 className="text-xl font-bold text-white">
            {editFullName || user?.fullName}
          </h3>

          <p className="text-gray-400">
            @{user?.username}
          </p>

          <label
            htmlFor="editProfileAvatar"
            className="mt-3 inline-block cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
          >
            Change Profile Picture
          </label>

          <input
            id="editProfileAvatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setEditAvatarFile(file);
              }
            }}
          />

        </div>

      </div>

      {/* Fields */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {/* Full Name */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            value={editFullName}
            onChange={(e) => setEditFullName(e.target.value)}
            placeholder={user?.fullName || "Enter full name"}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-orange-500"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Email
          </label>

          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder={user?.email || "Enter email"}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-orange-500"
          />

        </div>

      </div>

      {/* Save */}

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => setEditProfileOpen(false)}
          disabled={savingProfile}
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          disabled={savingProfile}
          onClick={async () => {

            try {

              setSavingProfile(true);

              // ================= ACCOUNT DETAILS =================

              const fullName =
                editFullName.trim() || user?.fullName;

              const email =
                editEmail.trim() || user?.email;

              await updateAccountDetails({
                fullName,
                email,
              });

              // ================= AVATAR =================

              if (editAvatarFile) {

                const formData = new FormData();

                formData.append(
                  "avatar",
                  editAvatarFile
                );

                await updateAvatar(formData);
              }

              // ================= REFRESH USER =================

              const updatedUserResponse =
                await getCurrentUser();

              const updatedUser =
                updatedUserResponse?.data ||
                updatedUserResponse;

              setUser(updatedUser);

              setAvatar(updatedUser?.avatar || "");

              // Reset

              setEditFullName("");
              setEditEmail("");
              setEditAvatarFile(null);

              setEditProfileOpen(false);

              alert("Profile updated successfully!");

           } catch (error) {
                  console.log("PROFILE UPDATE ERROR:", error);
                  console.log("STATUS:", error?.response?.status);
                  console.log("DATA:", error?.response?.data);

                  alert(
                    error?.response?.data?.message ||
                    "Failed to update profile"
                  );
                } finally {
                  setSavingProfile(false);
                }

          }}
          className="rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {savingProfile ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>

  </div>
)}

                  {/* ================= STORY VIEWER ================= */}

              {storyOpen && myStories.length > 0 && (

                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-violet-700">

                  {/* ================= STORY CONTAINER ================= */}

                  <div className="relative h-[90vh] w-[90vw] max-w-[500px] overflow-hidden rounded-3xl bg-black shadow-2xl">

                    {/* ================= PROGRESS BARS ================= */}

                    <div className="absolute left-4 right-4 top-4 z-50 flex gap-1">

                      {activeUserStories.map((_, index) => (

                        <div
                          key={index}
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30"
                        >

                          <div
                            key={`${currentStoryIndex}-${index}`}
                            className={`h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 ${
                              index < currentStoryIndex
                                ? "w-full"
                                : index === currentStoryIndex
                                ? "animate-story-progress"
                                : "w-0"
                            }`}
                          />

                        </div>

                      ))}

                    </div>
                  

                    {/* ================= CLOSE BUTTON ================= */}

                    <button
                      onClick={() => {
                        setStoryOpen(false);
                        setCurrentStoryIndex(0);
                        setStory(myStories[0] || null);
                      }}
                      className="absolute right-4 top-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-2xl text-white transition hover:bg-black/60"
                    >
                      ×
                    </button>

                    {/* ================= STORY CONTENT ================= */}

                    {activeUserStories[currentStoryIndex]?.mediaType === "video" ? (

                      <video
                        key={activeUserStories[currentStoryIndex]?._id}
                        src={activeUserStories[currentStoryIndex]?.mediaUrl}
                        autoPlay
                        controls
                        className="h-full w-full object-contain"
                      />

                    ) : (

                      <img
                        key={activeUserStories[currentStoryIndex]?._id}
                        src={activeUserStories[currentStoryIndex]?.mediaUrl}
                        alt="Story"
                        className="h-full w-full object-contain"
                      />

                    )}
                    

                  </div>
                  <div/>
                  <div/>

                  
                  <div/>
                  </div>
                  
                  
              )}

              {/* ================= STORIES POPUP ================= */}

          {showStories && (
            <StoryBar
              user={user}
              onClose={() => setShowStories(false)}
              activeStoryUser={activeStoryUser}
               handleOpenUserStory={handleOpenUserStory}
            />
          )}

              
              </>
 )
}
              
              export default Profile;

                

              
