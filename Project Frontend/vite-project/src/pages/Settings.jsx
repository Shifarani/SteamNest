import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Moon,
  Sun,
  History,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  // Theme
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Theme
  const handleThemeToggle = () => {
    const value = !darkMode;
    setDarkMode(value);

    if (value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Navigation
  const goProfile = () => {
    navigate("/profile");
  };

  const goDashboard = () => {
    navigate("/dashboard");
  };

  const goWatchHistory = () => {
    navigate("/watch-history");
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-purple-100 py-10 px-5">

  <div className="mx-auto max-w-3xl">

    {/* Heading */}
    <div className="mb-8 text-center">
      <h1 className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent">
        ⚙️ Settings
      </h1>

      <p className="mt-3 text-[var(--text)]">
        Manage your SteamNest account & preferences
      </p>
    </div>

    {/* Main Card */}
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 p-8">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-5xl backdrop-blur">
            ⚙️
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              SteamNest Settings
            </h2>

            <p className="mt-1 text-white/90">
              Customize your experience
            </p>
          </div>

        </div>

      </div>

      {/* Settings List */}
      <div className="space-y-5 p-7">

        {/* About Profile */}
        <div
          onClick={goProfile}
          className="flex cursor-pointer items-center justify-between rounded-2xl bg-orange-50 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-orange-100 p-4">
              <User size={26} className="text-orange-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-500">
                About Profile
              </h3>

              <p className="text-sm text-orange-500">
                View and manage your profile
              </p>
            </div>

          </div>

          <ChevronRight />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between rounded-2xl bg-purple-50 p-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-purple-100 p-4">

              {darkMode ? (
                <Moon size={26} className="text-purple-600" />
              ) : (
                <Sun size={26} className="text-yellow-500" />
              )}

            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-500">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </h3>

              <p className="text-sm text-purple-500">
                Toggle app appearance
              </p>
            </div>

          </div>

          <button
            onClick={handleThemeToggle}
            className={`relative h-8 w-16 rounded-full transition ${
              darkMode ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                darkMode ? "left-9" : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Watch History */}
        <div
          onClick={goWatchHistory}
          className="flex cursor-pointer items-center justify-between rounded-2xl bg-blue-50 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-100 p-4">
              <History size={26} className="text-blue-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-500">
                Watch History
              </h3>

              <p className="text-sm text-blue-500">
                See your watched videos
              </p>
            </div>

          </div>

          <ChevronRight />

        </div>
                {/* Dashboard */}
        <div
          onClick={goDashboard}
          className="flex cursor-pointer items-center justify-between rounded-2xl bg-green-50 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-green-100 p-4">
              <LayoutDashboard
                size={26}
                className="text-green-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-500">
                Dashboard
              </h3>

              <p className="text-sm text-green-500">
                Open your creator dashboard
              </p>
            </div>

          </div>

          <ChevronRight />
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center justify-between rounded-2xl bg-red-50 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-red-100 p-4">
              <LogOut
                size={26}
                className="text-red-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-600">
                Logout
              </h3>

              <p className="text-sm text-red-400">
                Sign out from SteamNest
              </p>
            </div>

          </div>

          <ChevronRight className="text-red-500" />
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default Settings;