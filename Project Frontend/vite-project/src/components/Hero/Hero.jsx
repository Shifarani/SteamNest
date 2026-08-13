import { Link } from "react-router-dom";
import { FaPlay, FaUpload } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
 return (
  <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50">

    {/* Background */}
    <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-orange-300/20 blur-3xl animate-pulse" />
    <div className="absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-purple-300/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)",
        backgroundSize: "45px 45px",
      }}
    />

    <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center justify-between gap-10 px-6 py-10">

      {/* LEFT */}

      <div className="max-w-2xl">

        {/* SteamNest Badge */}
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-7 py-3 shadow-xl">

          {/* Purple Glowing Dot */}
          <span className="relative flex h-3 w-3">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>

           <span className="relative inline-flex h-3 w-3 rounded-full bg-fuchsia-300 shadow-[0_0_15px_#d946ef]"></span>
           </span>
          <span className="text-sm font-bold tracking-[0.25em] text-white">
            STEAMNEST
          </span>

        </div>
        

        {/* Heading */}

        <h1 className="mt-5 text-5xl font-black leading-[1.05] text-[#0f172a] md:text-7xl">

          Watch.

          <br />

          Create.

          <br />

          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 bg-clip-text text-transparent">

            Upload. Share.

          </span>

        </h1>

        {/* Description */}

        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">

          SteamNest is your complete MERN video streaming platform where
          users can upload videos, watch content, like, comment,
          subscribe to creators, create playlists, manage channels
          and explore trending videos from anywhere.

        </p>

        {/* Feature Pills */}

        <div className="mt-7 flex flex-wrap gap-3">

          <div className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            🎥 HD Streaming
          </div>

          <div className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            ⬆ Upload
          </div>

          <div className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            ❤️ Like
          </div>

          <div className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            💬 Comments
          </div>

          <div className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            📂 Playlists
          </div>

          <div className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            🔔 Subscribe
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            to="/explore"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <FaPlay size={15} />

            Explore

            <FiArrowRight className="transition group-hover:translate-x-1" />
          </Link>

          <Link
            to="/upload"
            className="group flex items-center gap-2 rounded-xl border border-purple-300 bg-[var(--bg)] px-6 py-3 text-base font-semibold text-[var(--muted)] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:text-purple-600"
          >
            <FaUpload size={15} />

            Upload
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Join Now
          </Link>

        </div>

      </div>
            {/* RIGHT SIDE */}

         <div className="relative hidden lg:flex flex-1 items-start justify-center -translate-y-25">
        {/* Main Video Card */}

        <div className="relative w-[470px] rounded-[28px] border border-white/50 bg-[var(--bg)]/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">

          <div className="aspect-video overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-400 to-purple-600">

            <div className="flex h-full flex-col justify-between p-5 text-white">

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-[var(--bg)]/20 px-3 py-1 text-xs backdrop-blur">
                  🔴 LIVE
                </span>

                <span className="rounded-full bg-black/30 px-3 py-1 text-xs">
                  4K HD
                </span>

              </div>

              <div className="flex justify-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bg)]/20 backdrop-blur transition-all duration-300 hover:scale-110">

                  <FaPlay className="ml-1 text-3xl text-white" />

                </div>

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Welcome to SteamNest
                </h2>

                <p className="mt-2 text-sm text-orange-100">
                  Watch • Upload • Like • Comment • Subscribe
                </p>

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-5 flex items-center justify-between">

            <div>

              <h3 className="font-bold text-[var(--muted)]">
                Trending Videos 🚀
              </h3>

              <p className="text-sm text-[var(--muted)]">
                Discover amazing creators every day.
              </p>

            </div>

            <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
              Watch
            </button>

          </div>

        </div>

        {/* Floating Card */}

        <div className="absolute -left-6 top-10 rounded-2xl bg-[var(--bg)]/90 p-4 shadow-xl backdrop-blur animate-bounce">

          <p className="text-xs text-[var(--muted)]">
            Subscribers
          </p>

          <h2 className="text-2xl font-black text-orange-500">
            1.2K+
          </h2>

        </div>

        {/* Floating Card */}

        <div className="absolute -right-5 bottom-20 rounded-2xl bg-[var(--bg)]/90 p-4 shadow-xl backdrop-blur animate-pulse">

          <p className="text-xs text-[var(--muted)]">
            Uploads
          </p>

          <h2 className="text-2xl font-black text-purple-600">
            500+
          </h2>

        </div>

        {/* Floating Card */}

        <div className="absolute right-16 top-0 rounded-2xl bg-[var(--bg)]/90 p-4 shadow-xl backdrop-blur">

          <p className="text-xs text-[var(--muted)]">
            Likes
          </p>

          <h2 className="text-2xl font-black text-pink-500">
            25K+
          </h2>

        </div>

      </div>

    </div>

    {/* Bottom Stats */}

    <div className="relative z-10 mx-auto mb-12 grid max-w-7xl grid-cols-2 gap-5 px-6 md:grid-cols-4">

      <div className="rounded-2xl bg-[var(--bg)]/80 p-6 text-center shadow-lg backdrop-blur transition hover:-translate-y-2">
        <h2 className="text-3xl font-black text-orange-500">
          10K+
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Video Views
        </p>
      </div>

      <div className="rounded-2xl bg-[var(--bg)]/80 p-6 text-center shadow-lg backdrop-blur transition hover:-translate-y-2">
        <h2 className="text-3xl font-black text-purple-600">
          1K+
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Creators
        </p>
      </div>

      <div className="rounded-2xl bg-[var(--bg)]/80 p-6 text-center shadow-lg backdrop-blur transition hover:-translate-y-2">
        <h2 className="text-3xl font-black text-orange-500">
          500+
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Uploads
        </p>
      </div>

      <div className="rounded-2xl bg-[var(--bg)]/80 p-6 text-center shadow-lg backdrop-blur transition hover:-translate-y-2">
        <h2 className="text-3xl font-black text-purple-600">
          99%
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Happy Users
        </p>
      </div>

    </div>

  </section>
);
}
export default Hero;