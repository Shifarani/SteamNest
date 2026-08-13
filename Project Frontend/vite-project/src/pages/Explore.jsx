import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Compass,
  Sparkles,
  TrendingUp,
  PlayCircle,
  Users,
} from "lucide-react";

import { getAllVideos } from "../api/videoApi";
import VideoCard from "../components/VideoCard/VideoCard";
import Categories from "../components/Categories/Categories";

const Explore = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchVideos = async () => {
    try {
      const response = await getAllVideos();

      console.log("Explore Videos:", response);

      setVideos(response?.docs || response || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return videos;

    return videos.filter((video) => {
      return (
        video?.title?.toLowerCase().includes(keyword) ||
        video?.description?.toLowerCase().includes(keyword) ||
        video?.owner?.fullName?.toLowerCase().includes(keyword)
      );
    });
  }, [videos, search]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <div className="flex flex-col items-center">

          <div className="relative">
            <div className="h-20 w-20 animate-spin rounded-full border-[6px] border-orange-500 border-t-transparent"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle
                size={28}
                className="text-orange-500"
              />
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold text-slate-800">
            Discovering Amazing Videos
          </h2>

          <p className="mt-2 text-slate-500">
            Please wait while we load fresh content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600" />

        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[var(--bg)]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[var(--bg)]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* LEFT */}

            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[var(--bg)]/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl">

                <Sparkles size={16} />

                SteamNest Explore

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-3xl bg-[var(--bg)]/15 p-5 backdrop-blur-xl">

                  <Compass
                    size={42}
                    className="text-white"
                  />

                </div>

                <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                  Explore
                </h1>

              </div>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-orange-100">
                Discover trending videos, talented creators and fresh content
                from the SteamNest community. Search, explore and enjoy endless
                entertainment with a beautiful experience.
              </p>
                            {/* Stats Cards */}

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">

                <div className="rounded-3xl border border-white/20 bg-[var(--bg)]/10 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-[var(--bg)]/20">

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg)]/20">
                    <PlayCircle size={24} className="text-white" />
                  </div>

                  <h3 className="text-3xl font-extrabold text-white">
                    {videos.length}+
                  </h3>

                  <p className="mt-1 text-orange-100">
                    Videos Available
                  </p>

                </div>

                <div className="rounded-3xl border border-white/20 bg-[var(--bg)]/10 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-[var(--bg)]/20">

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg)]/20">
                    <Users size={24} className="text-white" />
                  </div>

                  <h3 className="text-3xl font-extrabold text-white">
                    {
                      new Set(
                        videos.map((video) => video?.owner?._id)
                      ).size
                    }
                  </h3>

                  <p className="mt-1 text-orange-100">
                    Creators
                  </p>

                </div>

                <div className="rounded-3xl border border-white/20 bg-[var(--bg)]/10 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-[var(--bg)]/20">

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg)]/20">
                    <TrendingUp size={24} className="text-white" />
                  </div>

                  <h3 className="text-3xl font-extrabold text-white">
                    Trending
                  </h3>

                  <p className="mt-1 text-orange-100">
                    Fresh Content
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <div className="rounded-[32px] border border-white/20 bg-[var(--bg)]/10 p-8 shadow-2xl backdrop-blur-2xl">

                <h2 className="mb-6 text-2xl font-bold text-white">
                  Search & Discover
                </h2>

                <div className="relative">

                  <Search
                    size={22}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search videos, creators, categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl border-2 border-white/30 bg-[var(--bg)] px-14 py-5 text-slate-700 shadow-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:scale-[1.02] focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
                  />

                </div>

                <div className="mt-8 flex flex-wrap gap-3">

                  {[
                    "Trending",
                    "Gaming",
                    "Coding",
                    "Music",
                    "Education",
                  ].map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-white/20 bg-[var(--bg)]/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[var(--bg)]/25"
                    >
                      {item}
                    </button>
                  ))}

                </div>

                <div className="mt-8 rounded-2xl bg-[var(--bg)]/10 p-5 backdrop-blur-xl">

                  <p className="text-sm uppercase tracking-widest text-orange-100">
                    Explore Results
                  </p>

                  <h3 className="mt-2 text-4xl font-black text-white">
                    {filteredVideos.length}
                  </h3>

                  <p className="mt-1 text-orange-100">
                    Videos Found
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <div className="sticky top-16 z-20 border-b border-slate-200 bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          <Categories />
        </div>
      </div>
            {/* ================= VIDEO SECTION ================= */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">

              <TrendingUp size={16} />

              Recommended For You

            </div>

            <h2 className="mt-4 text-4xl font-black text-[var(--text)]">
              Explore Amazing Videos
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-slate-500">
              Browse trending content from talented creators around the
              SteamNest community.
            </p>

          </div>

          {/* Right */}

          <div className="flex flex-wrap items-center gap-4">

            <div className="rounded-2xl border border-slate-200 bg-[var(--bg)] px-5 py-3 shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Results
              </p>

              <h3 className="text-2xl font-black text-orange-500">
                {filteredVideos.length}
              </h3>

            </div>

            <button
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Latest Videos
            </button>

          </div>

        </div>

        {/* Grid */}

        {filteredVideos.length > 0 ? (

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {filteredVideos.map((video) => (

              <div
                key={video._id}
                className="group"
              >

                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-[var(--bg)] shadow-md transition-all duration-500 hover:-translate-y-3 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-200/50">

                  <div className="relative">

                    <VideoCard video={video} />

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (
                    <div className="flex flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-[var(--bg)] px-8 py-20 text-center shadow-xl">

            <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-orange-100 to-purple-100">

              <Search
                size={50}
                className="text-orange-500"
              />

            </div>

            <h2 className="text-4xl font-black text-slate-800">
              No Videos Found
            </h2>

            <p className="mt-4 max-w-lg text-lg leading-8 text-slate-500">
              We couldn't find any videos matching your search.
              Try another keyword or clear your search to discover
              more amazing content on SteamNest.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-10 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 px-10 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-orange-300"
            >
              Explore All Videos
            </button>

          </div>

        )}

      </section>

    </div>
  );
};

export default Explore;