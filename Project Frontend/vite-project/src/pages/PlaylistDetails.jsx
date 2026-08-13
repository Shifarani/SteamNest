import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Play,
  Calendar,
  Eye,
  Loader2,
  Music4,
  Clock3,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { getPlaylistById } from "../api/playlistApi";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  // ==========================
  // States
  // ==========================
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingVideo, setRemovingVideo] = useState(null);

  // ==========================
  // Fetch Playlist
  // ==========================
  const fetchPlaylist = async () => {
    try {
      setLoading(true);

      const res = await getPlaylistById(playlistId);

      const playlistData =
        res?.data?.data ||
        res?.data ||
        res;

      setPlaylist(playlistData);

      setVideos(
        playlistData?.videos ||
        playlistData?.video ||
        []
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load playlist");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // useEffect
  // ==========================
  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId]);

    // ==========================
  // Helper Functions
  // ==========================

  const formatViews = (views = 0) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    }

    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }

    return views;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const goToVideo = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  // ==========================
  // Loading State
  // ==========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="w-14 h-14 animate-spin text-orange-500 mx-auto mb-4" />

          <h2 className="text-white text-2xl font-bold">
            Loading Playlist...
          </h2>

          <p className="text-gray-400 mt-3">
            Please wait while we fetch your playlist.
          </p>
        </div>
      </div>
    );
  }

  // ==========================
  // Playlist Not Found
  // ==========================

  if (!playlist) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex justify-center items-center">
        <div className="text-center">

          <Music4 className="w-16 h-16 text-orange-500 mx-auto mb-5" />

          <h2 className="text-3xl font-bold text-white">
            Playlist Not Found
          </h2>

          <p className="text-gray-400 mt-3">
            This playlist doesn't exist.
          </p>

        </div>
      </div>
    );
  }

  // ==========================
  // Main UI
  // ==========================

  return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Playlist Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg)]/5 backdrop-blur-xl shadow-2xl">

          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${
                videos?.[0]?.thumbnail ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80"
              })`,
            }}
          />

          <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row gap-8">

            {/* Thumbnail */}
            <div className="lg:w-[360px] flex-shrink-0">
              <img
                src={
                  videos?.[0]?.thumbnail ||
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80"
                }
                alt={playlist.name}
                className="w-full h-72 rounded-2xl object-cover shadow-2xl"
              />
            </div>

            {/* Playlist Details */}
            <div className="flex-1 flex flex-col justify-center">

              <span className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-4">
                <Music4 size={16} />
                Playlist
              </span>

              <h1 className="text-5xl font-extrabold mb-5">
                {playlist.name}
              </h1>

              <p className="text-gray-300 text-lg leading-8 max-w-3xl">
                {playlist.description || "No description available."}
              </p>

              <div className="flex flex-wrap gap-6 mt-8">

                <div className="flex items-center gap-2 text-orange-300">
                  <Play size={18} />
                  <span>{videos.length} Videos</span>
                </div>

                <div className="flex items-center gap-2 text-orange-300">
                  <Calendar size={18} />
                  <span>{formatDate(playlist.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 text-orange-300">
                  <Clock3 size={18} />
                  <span>Updated Recently</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Videos Section */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Playlist Videos
          </h2>

          {videos.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/5 backdrop-blur-xl py-20 text-center">

              <Music4
                size={60}
                className="mx-auto text-orange-500 mb-5"
              />

              <h3 className="text-2xl font-bold">
                No Videos Found
              </h3>

              <p className="text-gray-400 mt-3">
                Start adding videos to this playlist.
              </p>

            </div>
          ) : (

            <div className="grid gap-6">
                              {videos.map((video) => (
                <div
                  key={video._id}
                  onClick={() => goToVideo(video._id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg)]/5 backdrop-blur-xl hover:border-orange-500/40 hover:bg-[var(--bg)]/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">

                    {/* Thumbnail */}
                    <div className="relative md:w-80 h-52 md:h-auto flex-shrink-0 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
                          <Play size={24} fill="white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">

                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-orange-400 transition">
                          {video.title}
                        </h3>

                        <p className="text-gray-400 mt-3 line-clamp-2">
                          {video.description}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-6">

                        <div className="flex items-center gap-3">
                          <img
                            src={
                              video.owner?.avatar ||
                              "https://ui-avatars.com/api/?name=User"
                            }
                            alt="Owner"
                            className="w-10 h-10 rounded-full object-cover"
                          />

                          <span className="text-[var(--text)] font-medium">
                            {video.owner?.fullName || "Unknown Creator"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                          <Eye size={18} />
                          <span>{formatViews(video.views)} views</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={18} />
                          <span>{formatDate(video.createdAt)}</span>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PlaylistDetails;
            