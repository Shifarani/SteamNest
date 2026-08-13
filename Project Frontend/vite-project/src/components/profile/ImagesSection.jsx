import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon, Eye } from "lucide-react";
import { getChannelVideos } from "../../api/dashboardApi";

const ImagesSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const response = await getChannelVideos();

      setVideos(response.data || []);
    } catch (error) {
      console.log("Images Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <p className="text-lg text-gra">
          Loading Images...
        </p>
      </div>
    );
  }

  // No images
  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <ImageIcon
          size={45}
          className="mx-auto mb-4 text-orange-400"
        />

        <h2 className="text-2xl font-bold text-white">
          No Images Yet
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          Your video thumbnails will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {videos.map((video) => (
        <Link
          key={video._id}
          to={`/watch/${video._id}`}
          className="
            group
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[var(--bg)]/10
            backdrop-blur-xl
            transition
            hover:-translate-y-1
            hover:border-orange-400/40
          "
        >

          {/* Image */}

          <div className="relative overflow-hidden">

            <img
              src={video.thumbnail}
              alt={video.title}
              className="
                h-56
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />

            {/* Overlay */}

            <div className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/0
              transition
              group-hover:bg-black/30
            ">
              <ImageIcon
                size={35}
                className="
                  scale-75
                  text-white
                  opacity-0
                  transition
                  group-hover:scale-100
                  group-hover:opacity-100
                "
              />
            </div>

          </div>


          {/* Information */}

          <div className="p-4">

            <h3 className="truncate text-lg font-bold text-white">
              {video.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
              <Eye size={16} />
              {video.views || 0} Views
            </div>

          </div>

        </Link>
      ))}

    </div>
  );
};

export default ImagesSection;