import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { FaPlayCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({

  email: "",
  password: "",
});
const [rememberMe, setRememberMe] = useState(false);
const { fetchCurrentUser } = useAuth();


const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleLogin = async (e) => {
  e.preventDefault();
  

    if (!formData.email.trim()) {
  toast.error("Email is required");
  return;
}

if (!formData.password.trim()) {
  toast.error("Password is required");
  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  toast.error("Enter a valid email");
  return;
}


  try {
    setLoading(true);

    const response = await axios.post(
     "https://steamnest.onrender.com/api/v1/users/login",
      {
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Login Successful");

if (rememberMe) {

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.data.user)
  );

} else {

  sessionStorage.setItem(
    "user",
    JSON.stringify(response.data.data.user)
  );

}

await fetchCurrentUser();

navigate("/home");

  } catch (error) {

   toast.error(
  error.response?.data?.message ||
  "Login Failed"
);

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-100 flex items-center justify-center px-6 py-10">

      {/* Main Card */}

      <div className="w-full max-w-6xl bg-[var(--bg)]/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/40 grid lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-orange-500 via-orange-400 to-purple-600 text-white p-14 relative overflow-hidden">

          <div className="absolute w-72 h-72 rounded-full bg-[var(--bg)]/10 -top-20 -left-20 blur-3xl"></div>

          <div className="absolute w-72 h-72 rounded-full bg-[var(--bg)]/10 -bottom-20 -right-20 blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3">

              <FaPlayCircle className="text-5xl" />

              <h1 className="text-4xl font-extrabold">
                SteamNest
              </h1>

            </div>

            <h2 className="mt-10 text-4xl font-bold leading-tight">

              Welcome Back 👋

            </h2>

            <p className="mt-6 text-lg text-orange-100 leading-8">

              Login to continue watching, uploading,
              liking videos and connecting with your
              favourite creators.

            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-[var(--bg)]"></div>

                <span>Watch Unlimited Videos</span>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-[var(--bg)]"></div>

                <span>Upload Your Own Content</span>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-[var(--bg)]"></div>

                <span>Like, Comment & Subscribe</span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div>

            <h2 className="text-4xl font-bold text-gray-800">

              Login

            </h2>

            <p className="mt-3 text-[var(--text)]">

              Welcome back! Please login to your account.

            </p>

          </div>

          {/* ================= FORM ================= */}

          <form className="mt-10 space-y-6"
          onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">

                Email

              </label>

              <div className="relative">

                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  py-4
                  pl-12
                  pr-4
                  outline-none
                  focus:ring-4
                  focus:ring-orange-200
                  focus:border-orange-500
                  transition
                  "
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">

                Password

              </label>

              <div className="relative">

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  py-4
                  pl-12
                  pr-14
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--text)]
                  hover:text-orange-500
                  "
                >

                  {showPassword ? (
                    <FiEyeOff size={22} />
                  ) : (
                    <FiEye size={22} />
                  )}

                </button>

              </div>

            </div>

            {/* Remember + Forgot */}

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 cursor-pointer">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-orange-500"
            />

                Remember me

              </label>

              <Link
                to="/forgot-password"
                className="
                text-orange-500
                hover:text-purple-600
                font-semibold
                "
              >

                Forgot Password?

              </Link>

            </div>

            {/* LOGIN BUTTON */}

           

             
              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-gradient-to-r
                from-orange-500
                to-purple-600
                hover:scale-[1.02]
                transition-all
                duration-300
                text-white
                rounded-xl
                py-4
                font-semibold
                flex
                justify-center
                items-center
                gap-3
                shadow-xl
                disabled:opacity-60
                disabled:cursor-not-allowed
                "
              >
               <>
                    {loading ? (
                      <>
                        <div
                          className="
                          w-5
                          h-5
                          border-2
                          border-white
                          border-t-transparent
                          rounded-full
                          animate-spin
                          "
                        ></div>

                        Logging In...
                      </>
                    ) : (
                      <>
                        Login

                        <FiArrowRight />
                      </>
                    )}
                  </>

                {!loading && <FiArrowRight />}
              </button>
          

            {/* SIGNUP */}

            <p className="text-center text-[var(--text)]">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="
                font-semibold
                text-orange-500
                hover:text-purple-600
                "
              >

                Create Account

              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;