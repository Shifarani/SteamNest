import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { User, History, Settings, LogOut, ChevronDown } from "lucide-react";


const ProfileMenu = ({ user }) => {
  const navigate = useNavigate();

const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
  try {

    await logout();

    toast.success("Logged out successfully");

    navigate("/login");

  } catch {

    toast.error("Logout failed");

  }
};

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full p-1 transition hover:bg-[var(--bg)]"
      >
       <img
          src={
            user?.avatar?.replace("http://", "https://") ||
            "https://ui-avatars.com/api/?name=User&background=f97316&color=fff"
          }
          alt={user?.fullName}
          className="h-10 w-10 rounded-full object-cover border"
        />

        <ChevronDown
          size={18}
          className={`transition duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border bg-[var(--bg)] shadow-xl">

          {/* User Info */}
          <div className="border-b p-4">
           <img
                          src={
              user?.avatar?.replace("http://", "https://") ||
              "https://ui-avatars.com/api/?name=User&background=f97316&color=fff"
            }
              alt={user?.fullName}
              className="mx-auto h-16 w-16 rounded-full object-cover"
            />

            <h2 className="mt-3 text-center font-semibold">
              {user?.fullName}
            </h2>
          </div>

          {/* Menu */}
          <div className="py-2">

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--card)]"
            >
              <User size={18} />
              My Profile
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--card)]"
            >
              <History size={18} />
              Watch History
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--card)]"
            >
              <Settings size={18} />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;