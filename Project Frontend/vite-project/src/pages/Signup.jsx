import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
  fullName: "",
  username: "",
  email: "",
  password: "",
});

const [avatar, setAvatar] = useState(null);

const [coverImage, setCoverImage] = useState(null);

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = new FormData();

    data.append("fullName", formData.fullName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", avatar);

    if (coverImage) {
      data.append("coverImage", coverImage);
    }

  const response = await axiosInstance.post(
  "/users/register",
  data
);

console.log("REGISTER RESPONSE:", response.data);

localStorage.setItem(
  "accessToken",
  response.data.data.accessToken
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.data.user)
);

await fetchCurrentUser();

alert("Account Created Successfully 🎉");

navigate("/dashboard");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-purple-100 flex items-center justify-center px-6 py-10">

      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-[var(--bg)] shadow-2xl lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-orange-500 via-orange-400 to-purple-600 p-12 text-white">

          <h1 className="text-5xl font-extrabold">
            SteamNest
          </h1>

          <p className="mt-6 text-lg leading-8">
            Discover, Upload and Share amazing videos with creators around the world.
          </p>

          <img
            src="https://illustrations.popsy.co/amber/video-call.svg"
            alt="illustration"
            className="mt-12"
          />
        </div>

        {/* Right Side */}

        <div className="p-10">

          <h2 className="text-4xl font-bold text-gray-800">
            Create Account 🚀
          </h2>

          <p className="mt-2 text-[var(--text)]">
            Join SteamNest and start sharing your videos.
          </p>

          <form 
          onSubmit={handleSubmit}
          className="mt-8 space-y-5">

            {/* Full Name */}

            <div>

              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <div className="flex items-center rounded-xl border bg-gray-50 px-4">

                <FaUser className="text-gray-400" />

                <input
                   type="text"
                   name="fullName"
                   placeholder="Enter full name"
                   value={formData.fullName}
                   onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />

              </div>

            </div>

            {/* Username */}

            <div>

              <label className="mb-2 block font-medium">
                Username
              </label>

              <div className="flex items-center rounded-xl border bg-gray-50 px-4">

                <FaUser className="text-gray-400" />
               <input
                     type="text"
                      name="username"
                      placeholder="Choose username"
                     value={formData.username}
                    onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />
                
              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <div className="flex items-center rounded-xl border bg-gray-50 px-4">

                <FaEnvelope className="text-gray-400" />
                     <input
                       type="email"
                      name="email"
                        placeholder="Enter email"
                       value={formData.email}
                       onChange={handleChange}
                      className="w-full bg-transparent p-4 outline-none"
                 />
                

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block font-medium">
                Password
              </label>

              <div className="flex items-center rounded-xl border bg-gray-50 px-4">

                <FaLock className="text-gray-400" />

                 <input
                     type={showPassword ? "text" : "password"}
                     name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent p-4 outline-none"
                 />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Upload */}

            <div className="grid gap-5 md:grid-cols-2">

             <label className="cursor-pointer rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 p-6 text-center transition hover:bg-orange-100">

                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="Avatar Preview"
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <FaCamera className="mx-auto text-3xl text-orange-500" />

                      <p className="mt-3 font-medium">
                        Upload Avatar
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />

                </label>

             <label className="cursor-pointer rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 p-6 text-center transition hover:bg-purple-100">

              {coverImage ? (
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="Cover Preview"
                  className="mx-auto h-24 w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <FaCamera className="mx-auto text-3xl text-purple-500" />

                  <p className="mt-3 font-medium">
                    Cover Image
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />

            </label>

            </div>

            {/* Button */}
                <button
                 type="submit"
                  disabled={loading}
                 className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
             >
             {loading ? "Creating Account..." : "Create Account"}
             </button>
            

          </form>

          <p className="mt-8 text-center text-[var(--text)]">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-orange-500"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Signup;
