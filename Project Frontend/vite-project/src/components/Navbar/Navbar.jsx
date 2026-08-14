import { Link, NavLink } from "react-router-dom";
import { FiBell, FiUpload,FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Sidebar from "./SideBar";

const Navbar = () => {

  const { currentUser, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
        const isLoggedIn = !!currentUser;
        const user = currentUser;

        console.log("Navbar User:",currentUser);
        console.log("isLoggedIn:", isLoggedIn);
  return (
    <>
  <Sidebar
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-hidden border-b border-slate-700 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 backdrop-blur-md">

     <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

        {/* Left */}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-white transition hover:bg-[var(--bg)]/10"
          >
            <FiMenu size={25} />
          </button>
          <Logo />

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className="font-medium text-white transition hover:text-orange-500"
            >
              Home
            </NavLink>

            <NavLink
              to="/explore"
              className="font-medium text-white transition hover:text-orange-500"
            >
              Explore
            </NavLink>

            <NavLink
              to="/subscriptions"
              className="font-medium text-white transition hover:text-orange-500"
            >
              Subscriptions
            </NavLink>
          </nav>
        </div>

        {/* Center */}
        <div className="hidden flex-1 justify-center px-10 lg:flex">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <Link
            to="/upload"
          className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
          >
            <FiUpload />
            <span className="hidden md:block">Upload</span>
          </Link>

            <button className="rounded-full p-2 text-orange-400 transition hover:bg-[var(--bg)]/10 hover:text-purple-400">
              <FiBell size={21} />
            </button>

          {loading ? null : isLoggedIn ? (
            <ProfileMenu user={user} />
          ) : (
         <div className="flex shrink-0 items-center gap-1">
          <Link
            to="/login"
            className="whitespace-nowrap px-1 text-sm font-medium text-white hover:text-orange-500"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-2.5 py-1.5 text-sm text-white"
          >
            Signup
          </Link>
        </div>
          )}

        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar;