import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiPlay } from "react-icons/fi";
import { getWatchHistory } from "../api/userApi";


const WatchHistory = () => {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchHistory = async () => {
    try {

      const res = await getWatchHistory();

      console.log("Watch History:", res);

      setHistory(
  res?.data || []
);

    } catch (error) {

      console.log(
        "Watch history error:",
        error
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchHistory();
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white text-xl">
          Loading history... ⏳
        </p>
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-5 py-10">


      <div className="max-w-6xl mx-auto">


        {/* Heading */}

        <div className="flex items-center gap-3 mb-8">

          <div className="p-3 rounded-full bg-orange-500/20">
            <FiClock 
              className="text-orange-400"
              size={28}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Watch History 🕒
            </h1>

            <p className="text-slate-400">
              Videos you watched recently
            </p>
          </div>

        </div>




        {
          history.length === 0 ? (

            <div className="text-center py-20">

              <div className="text-6xl mb-4">
                🥺📺
              </div>

              <h2 className="text-2xl text-white font-semibold">
                No watch history yet
              </h2>

              <p className="text-slate-400 mt-2">
                Start watching videos and they will appear here ✨
              </p>

            </div>


          ) : (


            <div className="grid gap-5">


              {
                history.map((video)=>(
                  
                  <Link
                    key={video._id}
                    to={`/watch/${video._id}`}
                    className="
                    group
                    flex flex-col md:flex-row
                    gap-5
                    bg-[var(--bg)]/5
                    backdrop-blur-md
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    hover:bg-[var(--bg)]/10
                    transition
                    "
                  >


                    {/* Thumbnail */}

                    <div className="relative md:w-64">

                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="
                        w-full
                        h-40
                        object-cover
                        rounded-xl
                        "
                      />


                      <div className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        opacity-0
                        group-hover:opacity-100
                        transition
                        bg-black/40
                        rounded-xl
                      ">

                        <FiPlay
                          className="text-white"
                          size={35}
                        />

                      </div>


                    </div>



                    {/* Details */}


                    <div className="flex-1">


                      <h2 className="
                      text-xl
                      font-bold
                      text-white
                      group-hover:text-orange-400
                      transition
                      ">
                        {video.title}
                      </h2>


                      <p className="text-slate-400 mt-2 line-clamp-2">
                        {video.description}
                      </p>


                      <div className="flex gap-4 mt-4 text-sm text-slate-400">

                        <span>
                          👁 {video.views || 0} views
                        </span>

                        <span>
                          📅 
                          {
                            new Date(video.createdAt)
                            .toLocaleDateString()
                          }
                        </span>

                      </div>


                    </div>


                  </Link>


                ))
              }


            </div>


          )
        }


      </div>

    </div>

  );

};


export default WatchHistory;