import { Link } from "react-router-dom";
//import { formatDistanceToNow } from "date-fns";
import { getSecureImageUrl } from "../../utils/imageUrl";

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--bg)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <img
        src={getSecureImageUrl(video.thumbnail)}
          alt={video.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Duration */}
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
          {video.duration || "0:00"}
        </span>
      </div>

      {/* Content */}
      <div className="flex gap-3 p-4">
        {/* Avatar */}
        <img
          src={getSecureImageUrl(video.owner.avatar)}
          alt={video.owner.fullName}
          className="h-10 w-10 rounded-full object-cover"
        />

        {/* Details */}
        <div className="flex-1">
          <h3 className="line-clamp-2 font-semibold text-[var(--text)]">
            {video.title}
          </h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {video.owner.fullName}
          </p>

          <p className="text-sm text-[var(--muted)]">
  {video.views} views •{" "}
  {new Date(video.createdAt).toLocaleDateString()}
</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;