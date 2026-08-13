import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, CalendarDays } from "lucide-react";
import { getLikedVideos } from "../../api/likeApi";

const LikesSection = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedVideos = async () => {
    try {
      setLoading(true);

      const data = await getLikedVideos();

      setLikedVideos(data || []);
    } catch (error) {
      console.log("Liked Videos Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedVideos();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <p className="text-lg text-[var(--muted)]">
          Loading Liked Videos...
        </p>
      </div>
    );
  }

  // No liked videos
  if (likedVideos.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <Heart
          size={45}
          className="mx-auto mb-4 text-red-400"
        />

        <h2 className="text-2xl font-bold text-white">
          No Liked Videos
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          Videos you like will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {likedVideos.map((item) => {
        const video = item.video;

        if (!video) return null;

        return (
          <Link
            key={item._id}
            to={`/watch/${video._id}`}
            className="
              block
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[var(--bg)]/10
              backdrop-blur-xl
              transition
              hover:border-orange-400/40
              hover:bg-[var(--bg)]/15
            "
          >

            <div className="flex flex-col gap-5 p-5 sm:flex-row">

              {/* Thumbnail */}

              <img
                src={
                  video.thumbnail ||
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"
                }
                alt={video.title}
                className="
                  h-52
                  w-full
                  rounded-xl
                  object-cover
                  sm:h-32
                  sm:w-52
                "
              />

              {/* Video Information */}

              <div className="flex flex-1 flex-col justify-center">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="mb-2 flex items-center gap-2">
                      <Heart
                        size={18}
                        className="fill-red-400 text-red-400"
                      />

                      <span className="text-sm font-semibold text-red-400">
                        Liked Video
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {video.title}
                    </h3>

                  </div>

                </div>

                {/* Owner */}

                {video.owner && (
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    By{" "}
                    <span className="text-orange-300">
                      {video.owner.fullName ||
                        video.owner.fullname ||
                        video.owner.username}
                    </span>
                  </p>
                )}

                {/* Stats */}

                <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-[var(--muted)]">

                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    {video.views || 0} Views
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    {video.createdAt
                      ? new Date(
                          video.createdAt
                        ).toLocaleDateString()
                      : "No date"}
                  </div>

                </div>

                <p className="mt-4 text-sm text-orange-300">
                  Click to watch →
                </p>

              </div>

            </div>

          </Link>
        );
      })}

    </div>
  );
};

export default LikesSection;