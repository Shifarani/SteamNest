import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Video } from "lucide-react";

const VideosSection = ({ videos = [], onDelete }) => {
  const navigate = useNavigate();
  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <Video
          size={50}
          className="mx-auto mb-4 text-orange-400"
        />

        <h2 className="text-2xl font-bold text-white">
          No Videos Yet
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          Upload your first video and start building your channel 🚀
        </p>

        <Link
          to="/upload"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          Upload Video
        </Link>
      </div>
    );
  }

  return (
   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {videos.map((video) => (
        <div
          key={video._id}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg)]/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/40"
        >
          {/* Thumbnail */}
          <Link to={`/watch/${video._id}`}>
            <div className="relative h-52 overflow-hidden sm:h-48">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />

              <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1 text-sm text-white">
                🎥 Video
              </div>
            </div>
          </Link>

          {/* Content */}
          <div className="p-5 sm:p-5">
            <Link to={`/watch/${video._id}`}>
              <h3 className="line-clamp-2 text-lg font-bold text-white hover:text-orange-400">
                {video.title}
              </h3>
            </Link>

            <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
              {video.description || "No description available."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {video.views || 0} Views
              </span>

              <span>
                {video.createdAt
                  ? new Date(video.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

            {/* Actions */}
           <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
  <button
    onClick={() => navigate(`/edit-video/${video._id}`)}
    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
  >
    <Pencil size={16} />
    Edit
  </button>

  <button
    onClick={() => onDelete(video._id)}
    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
  >
    <Trash2 size={16} />
    Delete
  </button>
</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosSection;