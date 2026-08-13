import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-5">

      <div className="text-center max-w-lg">

        {/* Cute Emoji */}
        <div className="text-7xl mb-5 animate-bounce">
          🥺💜
        </div>

        <h1 className="text-8xl font-extrabold text-white mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-white mb-3">
          Oops! Page Lost in Space 🚀
        </h2>

        <p className="text-slate-300 text-lg mb-8">
          Lagta hai ye page kahin chala gaya 😅
          <br />
          Don't worry, SteamNest tumhe wapas le aayega ✨
        </p>


        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-white font-semibold transition hover:bg-orange-600 hover:scale-105"
          >
            <FiHome />
            Go Home
          </Link>


          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-full border border-purple-400 px-6 py-3 text-white font-semibold transition hover:bg-purple-500/20 hover:scale-105"
          >
            <FiArrowLeft />
            Go Back
          </button>

        </div>


        {/* Small Cute Message */}
        <div className="mt-10 rounded-2xl bg-[var(--bg)]/5 backdrop-blur-md border border-white/10 p-5">
          <p className="text-purple-300">
            "Every lost page has a way back home 🌙✨"
          </p>
        </div>

      </div>

    </div>
  );
};

export default NotFound;