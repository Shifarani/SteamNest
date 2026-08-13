import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCompass,
  FiUsers,
  FiList,
  FiClock,
  FiUpload,
  FiUser,
  FiBarChart2,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, loading, logout } = useAuth();

  const isLoggedIn = !!currentUser;

  const linkClasses = ({ isActive }) =>
  `group flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-300 ${
    isActive
      ? "bg-gradient-to-r from-orange-500 to-purple-600 !text-white shadow-lg scale-[1.02]"
      : "!text-[#000080] hover:bg-[var(--bg)] hover:shadow-md hover:translate-x-2"
  }`;
 
  return (
    <>
  {/* Overlay */}
  <div
    onClick={onClose}
    className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-500 ${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
  />

  {/* Sidebar */}
 <aside
  className={`fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 overflow-hidden bg-[var(--bg)] shadow-[0_10px_60px_rgba(0,0,0,0.25)] transition-all duration-500 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-purple-50" />

    {/* Decorative Blur */}
    <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-orange-300/30 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />

    <div className="relative flex h-full flex-col">

      {/* Header */}
     <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 px-6 py-4 text-white">
        <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[var(--bg)]/10" />
          <div className="absolute -left-8 -bottom-8 h-16 w-16 rounded-full bg-[var(--bg)]/10" />

        <div className="relative flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg)]/20 text-3xl shadow-lg backdrop-blur-lg">
              🚀
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-wide">
                SteamNest
              </h2>

              <p className="mt-1 text-sm text-orange-100">
                Watch • Upload • Create
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-[var(--bg)]/20 p-2 backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-[var(--bg)]/30"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* User Card */}

        {!loading && (
          <div className="mt-6 rounded-2xl border border-white/20 bg-[var(--bg)]/15 p-4 backdrop-blur-xl">

            {isLoggedIn ? (
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg)] text-xl font-bold text-orange-500 shadow-md">
                  {currentUser?.fullName?.charAt(0)?.toUpperCase()}
                </div>

                <div>

                  <h3 className="text-lg font-semibold">
                    {currentUser?.fullName}
                  </h3>

                  <p className="text-sm text-orange-100">
                    @{currentUser?.username}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs">

                    <span className="h-2 w-2 rounded-full bg-green-400" />

                    Online

                  </div>

                </div>

              </div>
            ) : (
              <div>

                <h3 className="text-lg font-semibold">
                  Welcome 👋
                </h3>

                <p className="mt-1 text-sm text-orange-100">
                  Login to unlock all features
                </p>

                <div className="mt-4 flex gap-3">

                  <NavLink
                    to="/login"
                    onClick={onClose}
                    className="rounded-xl bg-[var(--bg)] px-5 py-2 text-sm font-semibold text-orange-600 shadow transition hover:scale-105"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    onClick={onClose}
                    className="rounded-xl border border-white px-5 py-2 text-sm font-semibold transition hover:bg-[var(--bg)]/20"
                  >
                    Signup
                  </NavLink>

                </div>

              </div>
            )}

          </div>
        )}

       </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
      

        <h4 className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
          Discover
        </h4>

        <nav className="space-y-2">

          <NavLink
            to="/"
            onClick={onClose}
            className={linkClasses}
          >
            <FiHome className="text-orange-500" size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/explore"
            onClick={onClose}
            className={linkClasses}
          >
            <FiCompass className="text-purple-500" size={20} />
            <span>Explore</span>
          </NavLink>

          <NavLink
            to="/subscriptions"
            onClick={onClose}
            className={linkClasses}
          >
            <FiUsers className="text-pink-500" size={20} />
            <span>Subscriptions</span>
          </NavLink>

                    <div className="my-6 border-t border-orange-100" />

          {/* Library */}
          <h4 className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
            Library
          </h4>

          <NavLink
            to="/playlists"
            onClick={onClose}
            className={linkClasses}
          >
            <FiList className="text-blue-500" size={20} />
            <span>Playlists</span>
          </NavLink>

          <NavLink
            to="/history"
            onClick={onClose}
            className={linkClasses}
          >
            <FiClock className="text-amber-500" size={20} />
            <span>Watch History</span>
          </NavLink>

          <div className="my-6 border-t border-orange-100" />

          {/* Creator */}
          <h4 className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
            Creator
          </h4>

          <NavLink
            to="/upload"
            onClick={onClose}
            className={linkClasses}
          >
            <FiUpload className="text-orange-500" size={20} />
            <span>Upload Video</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={linkClasses}
          >
            <FiBarChart2 className="text-emerald-500" size={20} />
            <span>Dashboard</span>
          </NavLink>

          <div className="my-6 border-t border-orange-100" />

          {/* Account */}
          <h4 className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
            Account
          </h4>

          <NavLink
            to="/profile"
            onClick={onClose}
            className={linkClasses}
          >
            <FiUser className="text-pink-500" size={20} />
            <span>My Profile</span>
          </NavLink>

          {!loading && !isLoggedIn && (
            <>
              <NavLink
                to="/login"
                onClick={onClose}
                className={linkClasses}
              >
                <FiLogIn className="text-green-500" size={20} />
                <span>Login</span>
              </NavLink>

              <NavLink
                to="/signup"
                onClick={onClose}
                className={linkClasses}
              >
                <FiUserPlus className="text-violet-500" size={20} />
                <span>Signup</span>
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="group mt-3 flex w-full items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 font-semibold text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-lg"
            >
              <FiLogOut
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              <span>Logout</span>
            </button>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-orange-100 bg-gradient-to-r from-orange-50 to-purple-50 px-6 py-5">

        <div className="rounded-2xl border border-orange-100 bg-[var(--bg)]/70 p-4 shadow-sm backdrop-blur-md">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-bold text-[var(--text)]">
                SteamNest
              </h3>

              <p className="text-xs text-[var(--muted)]">
                Watch • Create • Inspire
              </p>
            </div>

            <div className="rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
              v1.0
            </div>

          </div>

        </div>

      </div>

    </div>

  </aside>

</>
  );
};
export default Sidebar;