import { useRef, useState } from "react";
import { createStory } from "../../api/storyApi";

const CreateStory = ({ refreshStories, avatar, myStory }) => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // =========================
  // OPEN FILE SELECTOR
  // =========================
  const handleChooseStory = () => {
    if (uploading) return;

    fileInputRef.current?.click();
  };

  // =========================
  // UPLOAD STORY
  // =========================
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await createStory(file);

      // Stories dobara fetch hongi
      // Iske baad myStory update hoga
      await refreshStories();

      alert("Story uploaded successfully!");
    } catch (error) {
      console.error("Story upload error:", error);

      alert(
        error?.response?.data?.message ||
          "Story upload failed"
      );
    } finally {
      setUploading(false);

      // Same file dobara select karne ke liye
      e.target.value = "";
    }
  };

  // =========================
  // PROFILE PHOTO CLICK
  // =========================
  const handleProfileClick = () => {
    // Story uploaded hai tabhi open hogi
    if (myStory) {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* =====================================================
          CREATE STORY
      ====================================================== */}

      <div className="flex flex-col items-center shrink-0">

        {/* MAIN STORY CIRCLE */}

        <div
          className={`
            relative
            w-20
            h-20
            rounded-full

            transition-all
            duration-300

            ${
              myStory
                ? `
                  p-[3px]
                  bg-gradient-to-tr
                  from-yellow-400
                  via-pink-500
                  to-purple-600
                `
                : `
                  p-[3px]
                  bg-white
                `
            }
          `}
        >

          {/* PROFILE PHOTO */}

          <button
            type="button"
            onClick={handleProfileClick}
            disabled={uploading}
            className="
              w-full
              h-full
              rounded-full
              overflow-hidden
              bg-white
              block

              disabled:opacity-70
            "
          >
            <img
              src={
                avatar ||
                "/default-avatar.png"
              }
              alt="Your profile"
              className="
                w-full
                h-full
                rounded-full
                object-cover
              "
            />
          </button>


          {/* =================================================
              PLUS BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={handleChooseStory}
            disabled={uploading}
            className="
              absolute

              -right-1
              -bottom-1

              w-7
              h-7

              rounded-full

              bg-gradient-to-r
              from-orange-500
              to-purple-600

              text-white

              flex
              items-center
              justify-center

              text-xl
              font-bold

              border-2
              border-white

              shadow-lg

              hover:scale-110

              transition-transform
              duration-200

              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {uploading ? "..." : "+"}
          </button>

        </div>


        {/* =================================================
            LABEL
        ================================================== */}

        <p className="text-center text-sm mt-2">
          {uploading
            ? "Uploading..."
            : "Add Story"}
        </p>

      </div>


      {/* =====================================================
          HIDDEN FILE INPUT
      ====================================================== */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />


      {/* =====================================================
          YOUR STORY VIEWER
      ====================================================== */}

      {isOpen && myStory && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            bg-black/90

            flex
            items-center
            justify-center
          "
          onClick={() => setIsOpen(false)}
        >

          <div
            className="
              relative

              w-full
              max-w-md
              h-[90vh]

              flex
              items-center
              justify-center
            "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                absolute

                top-3
                right-3

                z-10

                w-10
                h-10

                rounded-full

                bg-black/60

                text-white

                text-xl

                flex
                items-center
                justify-center
              "
            >
              ✕
            </button>


            {/* STORY IMAGE */}

            {myStory.mediaType === "video" ? (
              <video
                src={myStory.mediaUrl}
                autoPlay
                controls
                className="
                  max-h-full
                  max-w-full

                  rounded-2xl

                  object-contain
                "
              />
            ) : (
              <img
                src={myStory.mediaUrl}
                alt="Your Story"
                className="
                  max-h-full
                  max-w-full

                  rounded-2xl

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

export default CreateStory;