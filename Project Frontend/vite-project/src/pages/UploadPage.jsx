import { useState } from "react";
import {
  FiUploadCloud,
  FiImage,
  FiVideo,
  FiFileText,
  FiSend,
} from "react-icons/fi";
import { uploadVideo } from "../api/videoApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const UploadPage = () => {

  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);




  const handleUpload = async () => {
    if (!title || !description || !thumbnail || !video) {
        toast.error("Please fill all fields");
        return;
      }
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("videoFile", video);

      const data = await uploadVideo(formData);

      toast.success("Video uploaded");
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setVideo(null);

      // navigate(`/watch/${data.data._id}`); // baad me use karenge
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


return (

<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">

  <div className="w-full max-w-7xl bg-[var(--bg)] rounded-[35px] shadow-2xl overflow-hidden">

    <div className="grid lg:grid-cols-2">

      {/* ================= LEFT GRADIENT ================= */}

      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-purple-600 p-10 lg:p-14 text-white">

        {/* Blur Circles */}

        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[var(--bg)]/10 blur-3xl"></div>

        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-purple-300/20 blur-3xl"></div>

        <div className="relative z-10 h-full flex flex-col justify-between">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-[var(--bg)]/20 backdrop-blur-md flex items-center justify-center">

                <FiUploadCloud size={34} />

              </div>

              <div>

                <h2 className="text-4xl font-extrabold">
                  SteamNest
                </h2>

                <p className="text-orange-100">
                  Creator Studio
                </p>

              </div>

            </div>

          </div>



          {/* Center Content */}

          <div className="my-14">

            <h1 className="text-5xl font-extrabold leading-tight">

              Upload

              <br />

              Your Videos 🚀

            </h1>

            <p className="mt-6 text-lg text-orange-50 leading-8 max-w-md">

              Share your creativity with the world.

              Upload high quality videos, add thumbnails,

              write descriptions and inspire thousands of viewers.

            </p>

          </div>



          {/* Bottom Features */}

          <div className="space-y-5">

            <div className="flex items-center gap-4">

              <div className="w-3 h-3 rounded-full bg-[var(--bg)]"></div>

              <span className="text-lg">
                Fast & Secure Upload
              </span>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-3 h-3 rounded-full bg-[var(--bg)]"></div>

              <span className="text-lg">
                HD Thumbnail Support
              </span>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-3 h-3 rounded-full bg-[var(--bg)]"></div>

              <span className="text-lg">
                Reach Your Audience
              </span>

            </div>

          </div>

        </div>

      </div>



      {/* ================= RIGHT SIDE ================= */}

      <div className="p-8 lg:p-12">

        <h1 className="text-4xl font-bold text-gray-800">
          Upload Your Video
        </h1>

        <p className="text-[var(--text)] mt-2 mb-8">
          Fill all the required details before publishing your content.
        </p>



        {/* Title */}

        <label className="block font-semibold text-gray-700 mb-2">
          Video Title
        </label>

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter your video title"
          className="w-full h-14 rounded-xl border border-gray-300 px-5 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
        />



        {/* Description */}

        <label className="block font-semibold text-gray-700 mt-7 mb-2">
          Description
        </label>

        <textarea
          rows="5"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Tell viewers about your video..."
          className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
        />

        {/* Upload Boxes Start Here */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">

                  {/* Thumbnail Upload */}

          <label className="group cursor-pointer">

            <div className="border-2 border-dashed border-orange-300 hover:border-orange-500 rounded-2xl p-6 transition-all duration-300 hover:bg-orange-50 h-52 flex flex-col justify-center items-center">

              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition">

                <FiImage className="text-3xl text-orange-500" />

              </div>

              <h3 className="mt-5 font-bold text-lg">
                Thumbnail
              </h3>

              <p className="text-sm text-[var(--text)] mt-2 text-center px-3">

                {thumbnail
                  ? thumbnail.name
                  : "Click to select thumbnail"}

              </p>

              <span className="mt-4 text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">

                PNG • JPG

              </span>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e)=>setThumbnail(e.target.files[0])}
              />

            </div>

          </label>



          {/* Video Upload */}

          <label className="group cursor-pointer">

            <div className="border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-2xl p-6 transition-all duration-300 hover:bg-purple-50 h-52 flex flex-col justify-center items-center">

              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition">

                <FiVideo className="text-3xl text-purple-600" />

              </div>

              <h3 className="mt-5 font-bold text-lg">
                Video
              </h3>

              <p className="text-sm text-[var(--text)] mt-2 text-center px-3">

                {video
                  ? video.name
                  : "Click to select video"}

              </p>

              <span className="mt-4 text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">

                MP4 • MOV

              </span>

              <input
                hidden
                type="file"
                accept="video/*"
                onChange={(e)=>setVideo(e.target.files[0])}
              />

            </div>

          </label>
        </div>
        

        {/* Publish Button */}
        <button
  onClick={handleUpload}
  disabled={loading}
  className="
    mt-10
    w-full
    h-14
    rounded-xl
    bg-gradient-to-r
    from-orange-500
    via-orange-500
    to-purple-600
    text-white
    font-semibold
    text-lg
    flex
    items-center
    justify-center
    gap-3
    hover:shadow-xl
    hover:scale-[1.02]
    active:scale-100
    transition-all
    duration-300
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  <FiSend size={20} />

  {loading ? "Uploading..." : "Publish Video"}

</button>
</div>

</div>

</div>

</div>
);
};


export default UploadPage;