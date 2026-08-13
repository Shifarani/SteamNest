import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVideoById, updateVideo } from "../api/videoApi";

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(videoId);

        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

     const updated = await updateVideo(videoId, formData);

     console.log(updated);

      alert("Video updated successfully!");

      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert("Failed to update video");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

 return (
  <div className="min-h-screen bg-gradient-to-br from-orange-500 via-purple-600 to-[#2e1065] flex items-center justify-center px-6 py-10">

    {/* Background Glow */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-orange-400/30 rounded-full blur-[120px]" />
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/30 rounded-full blur-[140px]" />

    <div
      className="
        relative
        w-full
        max-w-2xl
        rounded-[32px]
        border
        border-white/20
        bg-[var(--bg)]/10
        backdrop-blur-3xl
        shadow-[0_20px_80px_rgba(0,0,0,.45)]
        p-10
      "
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">
          ✨ Edit Video
        </h1>

        <p className="text-[var(--muted)] mt-2">
          Update your video details and thumbnail.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-white font-medium mb-2">
            Video Title
          </label>

          <input
            type="text"
            value={title}
            placeholder="Enter video title"
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              rounded-2xl
              bg-[var(--bg)]/10
              border
              border-white/20
              px-5
              py-4
              text-white
              placeholder:text-[var(--muted)]
              outline-none
              transition
              focus:border-orange-400
              focus:ring-2
              focus:ring-orange-500
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white font-medium mb-2">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            placeholder="Write your description..."
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full
              rounded-2xl
              bg-[var(--bg)]/10
              border
              border-white/20
              px-5
              py-4
              text-white
              placeholder:text-[var(--muted)]
              resize-none
              outline-none
              transition
              focus:border-orange-400
              focus:ring-2
              focus:ring-orange-500
            "
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-white font-medium mb-3">
            Upload Thumbnail
          </label>

          <label
            className="
              flex
              flex-col
              items-center
              justify-center
              h-44
              rounded-2xl
              border-2
              border-dashed
              border-orange-400/60
              bg-[var(--bg)]/5
              cursor-pointer
              hover:bg-[var(--bg)]/10
              transition
            "
          >
            <span className="text-5xl mb-2">📸</span>

            <p className="text-white font-semibold">
              Click to upload
            </p>

            <p className="text-[var(--muted)] text-sm">
              PNG, JPG or WEBP
            </p>

            {thumbnail && (
              <p className="mt-3 text-orange-300 text-sm">
                {thumbnail.name}
              </p>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="
              flex-1
              py-4
              rounded-2xl
              bg-[var(--bg)]/10
              border
              border-white/20
              text-white
              font-semibold
              transition
              hover:bg-[var(--bg)]/20
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updating}
            className="
              flex-1
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              via-pink-500
              to-purple-600
              text-white
              font-bold
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_0_30px_rgba(249,115,22,.45)]
              disabled:opacity-60
            "
          >
            {updating ? "Updating..." : "Update Video"}
          </button>

        </div>

      </form>
    </div>
  </div>
);
}
export default EditVideo;
  