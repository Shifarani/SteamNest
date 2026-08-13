import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderOpen, Plus, Video, ArrowRight } from "lucide-react";
import { getUserPlaylists } from "../api/playlistApi";
import { useAuth } from "../context/AuthContext";


const Playlists = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, loading: authLoading } = useAuth();


  const fetchPlaylists = async () => {
    try {
      setLoading(true);

      const playlists = await getUserPlaylists(currentUser._id);
      setPlaylists(playlists || []);
    } catch (err) {
      console.error(err);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (!authLoading && currentUser?._id) {
    fetchPlaylists();
  } else if (!authLoading && !currentUser) {
    setLoading(false);
  }
}, [currentUser, authLoading]);

 

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
        {/* Loading UI */}
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full -top-40 -left-40"></div>

        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full bottom-0 right-0"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-extrabold flex items-center gap-3">

              <FolderOpen className="text-orange-400" size={36} />

              My Playlists

            </h1>

            <p className="text-gray-400 mt-2">
              Organize your favourite videos into beautiful playlists.
            </p>

          </div>

          <button
        onClick={() => {
            // TODO: Open Create Playlist Modal
        }}
        className="
            mt-6
            md:mt-0
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-orange-500
            to-purple-600
            hover:scale-105
            transition
            duration-300
            shadow-xl
        "
        >
        <Plus size={20} />
        New Playlist
        </button>

        </div>

        {playlists.length === 0 ? (

          <div
            className="
            h-[450px]
            flex
            flex-col
            justify-center
            items-center
            rounded-3xl
            border
            border-white/10
            bg-[var(--bg)]/10
            backdrop-blur-3xl
            "
          >

            <FolderOpen
              size={90}
              className="text-orange-400 mb-6"
            />

            <h2 className="text-3xl font-bold">
              No Playlists Yet
            </h2>

            <p className="text-gray-400 mt-3 max-w-md text-center">

              Create your first playlist and save your favourite
              videos to watch later.

            </p>

            <button
                onClick={() => {
                    // TODO: Open Create Playlist Modal
                }}
                className="
                    mt-8
                    px-7
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-orange-500
                    to-purple-600
                    hover:scale-105
                    transition
                "
                >
                Create Playlist
                </button>

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {playlists.map((playlist) => (

              <div
                key={playlist._id}
                onClick={() =>
                  navigate(`/playlists/${playlist._id}`)
                }
                className="
                  group
                  cursor-pointer
                  rounded-3xl
                  border
                  border-white/10
                  bg-[var(--bg)]/10
                  backdrop-blur-3xl
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-orange-400/40
                  hover:shadow-[0_25px_60px_rgba(249,115,22,.25)]
                "
              >

                {/* Cover */}

                <div
                  className="
                    h-48
                    bg-gradient-to-br
                    from-orange-500
                    via-orange-400
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    relative
                  "
                >
                    {playlist.videos?.[0]?.thumbnail ? (
                    <img
                        src={playlist.videos[0].thumbnail}
                        alt={playlist.name}
                        className="h-full w-full object-cover"
                    />
                    ) : (
                    <FolderOpen size={70} className="text-white/90" />
                    )}

                  
                  <div
                    className="
                      absolute
                      bottom-4
                      right-4
                      bg-black/40
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    "
                  >
                    {playlist.videos?.length || 0} Videos
                  </div>

                </div>

                {/* Content */}

                <div className="p-6">

                  <h2 className="text-2xl font-bold mb-3 line-clamp-1">

                    {playlist.name}

                  </h2>

                  <p className="text-gray-400 line-clamp-3">

                    {playlist.description ||
                      "No description added."}

                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-2 text-orange-400">

                      <Video size={18} />

                      <span>

                        {playlist.videos?.length || 0} Videos

                      </span>

                    </div>

                    <ArrowRight
                      className="
                        group-hover:translate-x-2
                        transition
                      "
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default Playlists;