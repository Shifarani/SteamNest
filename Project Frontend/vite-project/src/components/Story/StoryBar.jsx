import { useEffect, useMemo, useState } from "react";
import { getActiveStories,deleteStory } from "../../api/storyApi";

const StoryBar = ({ user, onClose, activeStoryUser}) => {
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [storyOpen, setStoryOpen] = useState(false);
  const [activeUserStories, setActiveUserStories] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Frontend temporary seen stories
  const [seenStories, setSeenStories] = useState([]);

  // ================= FETCH STORIES =================

  const fetchStories = async () => {
    try {
      setLoading(true);

      const stories = await getActiveStories();

      console.log("STORY BAR DATA:", stories);

      setAllStories(stories || []);
    } catch (error) {
      console.error("StoryBar fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchStories();
    }
  }, [user?._id]);

  // ================= GROUP STORIES BY USER =================

  const storyUsers = useMemo(() => {
    const grouped = {};

    allStories.forEach((story) => {
      const ownerId =
        story.owner?._id?.toString() ||
        story.owner?.toString();

      if (!ownerId) return;

      if (!grouped[ownerId]) {
        grouped[ownerId] = {
          owner: story.owner,
          stories: [],
        };
      }

      grouped[ownerId].stories.push(story);
    });

    return Object.values(grouped);
  }, [allStories]);

  // ================= MY STORIES =================

  const myStoryUser = storyUsers.find(
    (item) =>
      item.owner?._id?.toString() ===
      user?._id?.toString()
  );

  // ================= OTHER STORIES =================

  const subscribedStoryUsers = storyUsers.filter(
    (item) =>
      item.owner?._id?.toString() !==
      user?._id?.toString()
  );

  // ================= CHECK SEEN =================

  const isStorySeen = (stories) => {
    if (!stories?.length) return false;

    return stories.every((story) =>
      seenStories.includes(story._id)
    );
  };

  // ================= OPEN USER STORY =================

  const handleOpenUserStory = (stories, owner) => {
    if (!stories?.length) return;

    setActiveUserStories(stories);
    setActiveUser(owner);
    setCurrentStoryIndex(0);
    setStoryOpen(true);

    // Mark stories as seen
    const storyIds = stories.map((story) => story._id);

    setSeenStories((prev) => [
      ...new Set([...prev, ...storyIds]),
    ]);
  };

  // ================= AUTO NEXT =================

  useEffect(() => {
    if (
      !storyOpen ||
      activeUserStories.length === 0
    ) {
      return;
    }

    const currentStory =
      activeUserStories[currentStoryIndex];

    const duration =
      currentStory?.mediaType === "video"
        ? 10000
        : 5000;

    const timer = setTimeout(() => {
      if (
        currentStoryIndex <
        activeUserStories.length - 1
      ) {
        setCurrentStoryIndex(
          (prev) => prev + 1
        );
      } else {
        setStoryOpen(false);
        setCurrentStoryIndex(0);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [
    storyOpen,
    currentStoryIndex,
    activeUserStories,
  ]);

  // ================= CLOSE =================

  const closeViewer = () => {
    setStoryOpen(false);
    setCurrentStoryIndex(0);
    setActiveUserStories([]);
    setActiveUser(null);
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="w-full px-6 py-5">
        <div className="h-28 w-full animate-pulse rounded-3xl bg-slate-800" />
      </div>
    );
  }


  const handleDeleteStory = async () => {
  try {
    const storyId =
      activeUserStories[currentStoryIndex]?._id;

    if (!storyId) {
      console.error("Story ID not found");
      return;
    }

    console.log("Deleting story:", storyId);

    await deleteStory(storyId);

    // Remove deleted story from current user's stories
    const updatedStories = activeUserStories.filter(
      (story) => story._id !== storyId
    );

    if (updatedStories.length === 0) {
      // No stories left
      setStoryOpen(false);
      setCurrentStoryIndex(0);
      setActiveUserStories([]);
      setActiveUser(null);
    } else {
      // Show next available story
      setActiveUserStories(updatedStories);

      if (currentStoryIndex >= updatedStories.length) {
        setCurrentStoryIndex(
          updatedStories.length - 1
        );
      }
    }

    // Refresh story bar
    await fetchStories();

    console.log("Story deleted successfully");

  } catch (error) {
    console.error(
      "Delete story error:",
      error?.response?.data || error
    );
  }
};
  return (
    <>
      {/* =====================================================
          STORY BAR
      ====================================================== */}

      <section
    className="
        fixed
        inset-0
        z-[9998]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
        px-4
    "
    onClick={onClose}
    >

        <div
        className="
            w-full
            max-w-3xl
            max-h-[80vh]
            overflow-y-auto
            rounded-3xl
            border
            border-slate-700
            bg-gradient-to-br
            from-[#020617]
            via-[#0b1730]
            to-[#111827]
            p-6
            shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
        >

          {/* ================= HEADING ================= */}

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="
                text-lg
                font-bold
                text-white
              ">
                Stories
              </h2>

              <p className="
                text-xs
                text-slate-400
              ">
                Stories from you and people you follow
              </p>
            </div>

          </div>


          {/* ================= STORIES ================= */}

          <div className="
            flex
            gap-6
            overflow-x-auto
            pb-2
            scrollbar-thin
            scrollbar-thumb-slate-600
          ">

            {/* ================= MY STORY ================= */}

            {myStoryUser && (
              <div className="
                flex
                min-w-[75px]
                flex-col
                items-center
              ">

                <button
                  type="button"
                  onClick={() =>
                    handleOpenUserStory(
                      myStoryUser.stories,
                      myStoryUser.owner
                    )
                  }
                  className={`
                    relative
                    h-20
                    w-20
                    rounded-full
                    p-[3px]
                    transition
                    hover:scale-105

                    ${
                      isStorySeen(
                        myStoryUser.stories
                      )
                        ? "bg-slate-600"
                        : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                    }
                  `}
                >

                  <div className="
                    h-full
                    w-full
                    rounded-full
                    bg-slate-950
                    p-[3px]
                  ">

                    <img
                      src={
                        myStoryUser.owner?.avatar ||
                        "/default-avatar.png"
                      }
                      alt="My Story"
                      className="
                        h-full
                        w-full
                        rounded-full
                        object-cover
                      "
                    />

                  </div>

                </button>

                <p className="
                  mt-2
                  max-w-[80px]
                  truncate
                  text-xs
                  font-medium
                  text-white
                ">
                  My Story
                </p>

              </div>
            )}


            {/* ================= SUBSCRIBED USERS ================= */}

            {subscribedStoryUsers.map(
              (storyUser) => {

                const stories =
                  storyUser.stories;

                const seen =
                  isStorySeen(stories);

                return (
                  <div
                    key={storyUser.owner?._id}
                    className="
                        flex
                        min-w-[75px]
                        flex-col
                        items-center
                        cursor-pointer
                    "
                    >

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenUserStory(
                          stories,
                          storyUser.owner
                        )
                      }
                      className={`
                        h-20
                        w-20
                        rounded-full
                        p-[3px]
                        transition
                        hover:scale-105

                        ${
                          seen
                            ? "bg-slate-600"
                            : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                        }
                      `}
                    >

                      <div className="
                        h-full
                        w-full
                        rounded-full
                        bg-slate-950
                        p-[3px]
                      ">

                        <img
                          src={
                            storyUser.owner
                              ?.avatar ||
                            "/default-avatar.png"
                          }
                          alt={
                            storyUser.owner
                              ?.fullName ||
                            "Story"
                          }
                          className="
                            h-full
                            w-full
                            rounded-full
                            object-cover
                          "
                        />

                      </div>

                    </button>

                    <p className="
                      mt-2
                      max-w-[80px]
                      truncate
                      text-xs
                      font-medium
                      text-slate-200
                    ">
                      {storyUser.owner
                        ?.username ||
                        storyUser.owner
                          ?.fullName ||
                        "User"}
                    </p>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          STORY VIEWER
      ====================================================== */}

      {storyOpen &&
        activeUserStories.length > 0 && (

          <div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/90
            "
            onClick={closeViewer}
          >

            <div
              className="
                relative
                h-[90vh]
                w-[90vw]
                max-w-[500px]
                overflow-hidden
                rounded-3xl
                bg-black
                shadow-2xl
              "
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* ================= PROGRESS ================= */}

              <div className="
                absolute
                left-4
                right-4
                top-4
                z-50
                flex
                gap-1
              ">

                {activeUserStories.map(
                  (_, index) => (

                    <div
                      key={index}
                      className="
                        h-1.5
                        flex-1
                        overflow-hidden
                        rounded-full
                        bg-white/30
                      "
                    >

                      <div
                        className={`
                          h-full
                          rounded-full
                          ${
                            index <
                            currentStoryIndex
                              ? "w-full bg-white"
                              : index ===
                                currentStoryIndex
                              ? "w-full animate-story-progress bg-white"
                              : "w-0"
                          }
                        `}
                      />

                    </div>

                  )
                )}

              </div>


              {/* ================= USER ================= */}

              <div className="
                absolute
                left-4
                top-8
                z-50
                flex
                items-center
                gap-3
              ">

                <img
                  src={
                    activeUser?.avatar ||
                    "/default-avatar.png"
                  }
                  alt="user"
                  className="
                    h-10
                    w-10
                    rounded-full
                    object-cover
                  "
                />

                <span className="
                  font-semibold
                  text-white
                ">
                  {activeUser?.username ||
                    activeUser?.fullName ||
                    "User"}
                </span>

              </div>

             {/* ================= DELETE OWN STORY ================= */}

                  {activeUser?._id?.toString() === user?._id?.toString() && (
                <button
                  type="button"
                  onClick={handleDeleteStory}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "70px",
                    zIndex: 99999,
                    height: "28px",
                    padding: "0 10px",
                    fontSize: "10px",
                    lineHeight: "1",
                    borderRadius: "5px",
                  }}
                  className="
                    bg-gradient-to-r
                    from-orange-500
                    via-pink-500
                    to-violet-600
                    font-medium
                    text-white
                    shadow-md
                  "
                >
                  Delete
                </button>
              )}

              {/* ================= CLOSE ================= */}

              <button
                type="button"
                onClick={onClose}
                className="
                    absolute
                    right-4
                    top-4
                    z-50
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-2xl
                    text-white
                    hover:bg-white/20
                "
                >
                ×
                </button>


              {/* ================= STORY ================= */}

              {activeUserStories[
                currentStoryIndex
              ]?.mediaType === "video" ? (

                <video
                  key={
                    activeUserStories[
                      currentStoryIndex
                    ]?._id
                  }
                  src={
                    activeUserStories[
                      currentStoryIndex
                    ]?.mediaUrl
                  }
                  autoPlay
                  controls
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />

              ) : (

                <img
                  key={
                    activeUserStories[
                      currentStoryIndex
                    ]?._id
                  }
                  src={
                    activeUserStories[
                      currentStoryIndex
                    ]?.mediaUrl
                  }
                  alt="Story"
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />

              )}

            </div>

          </div>
        )}

    </>
  );
};

export default StoryBar;