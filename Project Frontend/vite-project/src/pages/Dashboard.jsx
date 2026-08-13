import { useEffect, useState } from "react";
import { getChannelStats, getChannelVideos } from "../api/dashboardApi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const analyticsData = [
  { name: "Jan", views: 420, likes: 95 },
  { name: "Feb", views: 650, likes: 140 },
  { name: "Mar", views: 910, likes: 210 },
  { name: "Apr", views: 1250, likes: 290 },
  { name: "May", views: 1680, likes: 380 },
  { name: "Jun", views: 2150, likes: 470 },
  { name: "Jul", views: 2630, likes: 560 },
  { name: "Aug", views: 3180, likes: 670 },
  { name: "Sep", views: 3860, likes: 810 },
  { name: "Oct", views: 4520, likes: 960 },
  { name: "Nov", views: 5280, likes: 1120 },
  { name: "Dec", views: 6150, likes: 1290 },
]; 

  const fetchDashboardData = async () => {
    try {
      const statsRes = await getChannelStats();
      const videosRes = await getChannelVideos();

      setStats(statsRes.data);
      setVideos(videosRes.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }



return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FF7A18] via-[#6D28D9] to-[#0F172A] text-white">

    {/* Background Glow */}
    <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-orange-500/30 blur-[150px]" />
    <div className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-purple-600/30 blur-[180px]" />
    <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-pink-500/20 blur-[170px]" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <span
            className="
            inline-flex
            items-center
            rounded-full
            border
            border-orange-300/30
            bg-[var(--bg)]/10
            px-4
            py-1
            text-sm
            backdrop-blur-md
            "
          >
            🚀 Creator Dashboard
          </span>

          <h1
            className="
            mt-4
            text-5xl
            font-black
            leading-tight
            bg-gradient-to-r
            from-orange-300
            via-white
            to-purple-300
            bg-clip-text
            text-transparent
            "
          >
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-[var(--muted)] text-lg">
            Monitor your channel growth, uploads and audience engagement.
          </p>

        </div>

        <button
          className="
          h-14
          px-8
          rounded-2xl
          bg-gradient-to-r
          from-orange-500
          to-purple-600
          font-semibold
          shadow-xl
          hover:scale-105
          hover:shadow-orange-500/40
          duration-300
          "
        >
          + Upload Video
        </button>

      </div>

      {/* Stats Cards */}

      {stats && (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">

          {/* Videos */}

          <div
            className="
            group
            rounded-3xl
            border
            border-white/15
            bg-[var(--bg)]/10
            backdrop-blur-2xl
            p-7
            hover:-translate-y-2
            duration-300
            shadow-xl
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-orange-500/20
                flex
                items-center
                justify-center
                text-3xl
                "
              >
                🎥
              </div>

              <span className="text-green-400 text-sm font-semibold">
                +12%
              </span>

            </div>

            <p className="mt-6 text-[var(--muted)]">
              Total Videos
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.totalVideos}
            </h2>

          </div>

          {/* Subscribers */}

          <div
            className="
            group
            rounded-3xl
            border
            border-white/15
            bg-[var(--bg)]/10
            backdrop-blur-2xl
            p-7
            hover:-translate-y-2
            duration-300
            shadow-xl
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-purple-500/20
                flex
                items-center
                justify-center
                text-3xl
                "
              >
                👥
              </div>

              <span className="text-green-400 text-sm font-semibold">
                +18%
              </span>

            </div>

            <p className="mt-6 text-[var(--muted)]">
              Subscribers
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.totalSubscribers}
            </h2>

          </div>

          {/* Views */}

          <div
            className="
            group
            rounded-3xl
            border
            border-white/15
            bg-[var(--bg)]/10
            backdrop-blur-2xl
            p-7
            hover:-translate-y-2
            duration-300
            shadow-xl
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-cyan-500/20
                flex
                items-center
                justify-center
                text-3xl
                "
              >
                👁️
              </div>

              <span className="text-green-400 text-sm font-semibold">
                +31%
              </span>

            </div>

            <p className="mt-6 text-[var(--muted)]">
              Total Views
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.totalViews}
            </h2>

          </div>

          {/* Likes */}

          <div
            className="
            group
            rounded-3xl
            border
            border-white/15
            bg-[var(--bg)]/10
            backdrop-blur-2xl
            p-7
            hover:-translate-y-2
            duration-300
            shadow-xl
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-pink-500/20
                flex
                items-center
                justify-center
                text-3xl
                "
              >
                ❤️
              </div>

              <span className="text-green-400 text-sm font-semibold">
                +24%
              </span>

            </div>

            <p className="mt-6 text-[var(--muted)]">
              Total Likes
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.totalLikes}
            </h2>

          </div>

        </div>
      )}
            {/* ================= Analytics Section ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-7 mt-10">

        {/* Analytics Chart */}

        <div
          className="
          xl:col-span-3
          rounded-[32px]
          bg-[var(--bg)]/10
          backdrop-blur-2xl
          border
          border-white/15
          p-7
          shadow-2xl
          "
        >

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Channel Analytics
              </h2>

              <p className="text-[var(--muted)] mt-1">
                Last 12 Months Performance
              </p>

            </div>

            <div
              className="
              px-4
              py-2
              rounded-xl
              bg-[var(--bg)]/10
              text-sm
              "
            >
              2026
            </div>

          </div>

          <ResponsiveContainer
            width="100%"
            height={430}
          >

            <LineChart
              data={analyticsData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="viewsLine"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#A855F7"
                  />
                  <stop
                    offset="100%"
                    stopColor="#7C3AED"
                  />
                </linearGradient>

                <linearGradient
                  id="likesLine"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#FB923C"
                  />
                  <stop
                    offset="100%"
                    stopColor="#F97316"
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#ffffff15"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#E5E7EB",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#E5E7EB",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#1E1B4B",
                  border: "none",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="views"
                stroke="url(#viewsLine)"
                strokeWidth={5}
                dot={{
                  r: 6,
                  strokeWidth: 3,
                  stroke: "#A855F7",
                  fill: "#fff",
                }}
                activeDot={{
                  r: 10,
                  fill: "#A855F7",
                }}
              />

              <Line
                type="monotone"
                dataKey="likes"
                stroke="url(#likesLine)"
                strokeWidth={5}
                dot={{
                  r: 6,
                  strokeWidth: 3,
                  stroke: "#F97316",
                  fill: "#fff",
                }}
                activeDot={{
                  r: 10,
                  fill: "#F97316",
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>



        {/* Performance Card */}

        <div
          className="
          xl:col-span-2
          rounded-[32px]
          bg-[var(--bg)]/10
          backdrop-blur-2xl
          border
          border-white/15
          p-8
          shadow-2xl
          "
        >

          <h2 className="text-3xl font-bold">
            Performance
          </h2>

          <p className="text-[var(--muted)] mt-2">
            Channel Overview
          </p>

          <div className="space-y-7 mt-8">

            <div>

              <div className="flex justify-between mb-2">

                <span>Total Views</span>

                <span className="font-bold text-purple-300">
                  {stats?.totalViews}
                </span>

              </div>

              <div className="w-full h-3 rounded-full bg-[var(--bg)]/10">

                <div
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400"
                  style={{ width: "85%" }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>Total Likes</span>

                <span className="font-bold text-orange-300">
                  {stats?.totalLikes}
                </span>

              </div>

              <div className="w-full h-3 rounded-full bg-[var(--bg)]/10">

                <div
                  className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{ width: "72%" }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>Subscribers</span>

                <span className="font-bold text-green-300">
                  {stats?.totalSubscribers}
                </span>

              </div>

              <div className="w-full h-3 rounded-full bg-[var(--bg)]/10">

                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                  style={{ width: "65%" }}
                />

              </div>

            </div>

            <button
              className="
              w-full
              mt-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-purple-600
              font-bold
              hover:scale-105
              duration-300
              "
            >
              View Full Analytics
            </button>

          </div>

        </div>

      </div>
            {/* ================= Bottom Section ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-7 mt-10">

        {/* Recent Uploads */}

        <div
          className="
          xl:col-span-3
          rounded-[32px]
          bg-[var(--bg)]/10
          backdrop-blur-2xl
          border
          border-white/15
          p-7
          shadow-2xl
          "
        >

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Recent Uploads
              </h2>

              <p className="text-[var(--muted)] mt-2">
                Your latest published videos
              </p>

            </div>

            <button
              className="
              px-5
              py-2
              rounded-xl
              bg-[var(--bg)]/10
              hover:bg-[var(--bg)]/20
              duration-300
              "
            >
              View All
            </button>

          </div>

          <div className="space-y-5">

            {videos.length > 0 ? (

              videos.slice(0,5).map((video)=>(

                <div
                  key={video._id}
                  className="
                  flex
                  items-center
                  justify-between
                  bg-[var(--bg)]/5
                  rounded-2xl
                  p-4
                  hover:bg-[var(--bg)]/10
                  duration-300
                  "
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="
                      w-28
                      h-16
                      rounded-xl
                      object-cover
                      "
                    />

                    <div>

                      <h3 className="font-semibold text-lg">
                        {video.title}
                      </h3>

                      <p className="text-[var(--muted)] text-sm mt-1">
                        {video.views} Views
                      </p>

                    </div>

                  </div>

                  <button
                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-purple-600
                    hover:bg-purple-500
                    duration-300
                    "
                  >
                    Edit
                  </button>

                </div>

              ))

            ) : (

              <div className="text-center py-16 text-[var(--muted)]">

                <h3 className="text-5xl">
                  📹
                </h3>

                <p className="mt-4">
                  No Videos Uploaded Yet
                </p>

              </div>

            )}

          </div>

        </div>





        {/* Top Performing Video */}

        <div
          className="
          xl:col-span-2
          rounded-[32px]
          bg-[var(--bg)]/10
          backdrop-blur-2xl
          border
          border-white/15
          p-7
          shadow-2xl
          "
        >

          <h2 className="text-3xl font-bold">
            Top Performer
          </h2>

          <p className="text-[var(--muted)] mt-2">
            Best video this month
          </p>

          <div
            className="
            mt-8
            rounded-3xl
            overflow-hidden
            "
          >

            <img
              src={
                videos.length
                  ? videos[0].thumbnail
                  : "https://placehold.co/700x400"
              }
              alt=""
              className="w-full h-56 object-cover"
            />

          </div>

          <h2 className="text-2xl font-bold mt-6">

            {videos.length
              ? videos[0].title
              : "No Video"}

          </h2>

          <div className="grid grid-cols-3 gap-4 mt-8">

            <div
              className="
              rounded-2xl
              bg-[var(--bg)]/10
              p-4
              text-center
              "
            >

              <h3 className="text-xl font-bold">

                {videos.length
                  ? videos[0].views
                  : 0}

              </h3>

              <p className="text-[var(--muted)] text-sm mt-1">
                Views
              </p>

            </div>

            <div
              className="
              rounded-2xl
              bg-[var(--bg)]/10
              p-4
              text-center
              "
            >

              <h3 className="text-xl font-bold">

                {stats?.totalLikes}

              </h3>

              <p className="text-[var(--muted)] text-sm mt-1">
                Likes
              </p>

            </div>

            <div
              className="
              rounded-2xl
              bg-[var(--bg)]/10
              p-4
              text-center
              "
            >

              <h3 className="text-xl font-bold">

                {stats?.totalSubscribers}

              </h3>

              <p className="text-[var(--muted)] text-sm mt-1">
                Subs
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}
export default Dashboard;