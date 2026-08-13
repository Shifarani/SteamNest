import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-105">
        <FaPlay
          size={18}
          className="text-white ml-0.5"
        />
      </div>

      <div className="flex flex-col leading-none">
        <h1 className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
          SteamNest
        </h1>

        <span className="text-[10px] uppercase tracking-[0.25em] text-white">
          Stream • Share • Shine
        </span>
      </div>
    </Link>
  );
};

export default Logo;