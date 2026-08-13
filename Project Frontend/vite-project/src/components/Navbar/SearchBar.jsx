import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../../api/userApi";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // ================= USER SEARCH =================

  useEffect(() => {
    const searchUserAccounts = async () => {
      const query = search.trim();

      // Empty search
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        console.log("SEARCHING USER:", query);

        const response = await searchUsers(query);

        console.log("SEARCH API RESPONSE:", response);

        setSearchResults(response?.data || []);
      } catch (error) {
        console.error(
          "USER SEARCH ERROR:",
          error?.response?.data || error
        );

        setSearchResults([]);
      }
    };

    const timer = setTimeout(() => {
      searchUserAccounts();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ================= SUBMIT =================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/search?query=${encodeURIComponent(search.trim())}`
    );
  };

  // ================= USER CLICK =================

  const handleUserClick = (searchedUser) => {
    if (!searchedUser?.username) return;

    console.log(
      "OPENING USER PROFILE:",
      searchedUser.username
    );

    setSearch("");
    setSearchResults([]);

    navigate(`/c/${searchedUser.username}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        relative
        flex
        w-full
        max-w-xl
        items-center
        rounded-full
        border
        border-gray-300
        bg-[var(--bg)]
        shadow-sm
        transition
        focus-within:border-orange-500
        focus-within:ring-2
        focus-within:ring-orange-200
      "
    >

      {/* ================= SEARCH INPUT ================= */}

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search users..."
        className="
          flex-1
          bg-transparent
          px-5
          py-2.5
          text-sm
          outline-none
        "
      />

      {/* ================= SEARCH BUTTON ================= */}

      <button
        type="submit"
        className="
          flex
          h-11
          w-12
          shrink-0
          items-center
          justify-center
          rounded-r-full
          border-l
          border-[var(--border)]
          text-[var(--muted)]
          transition
          hover:bg-orange-500
          hover:text-white
        "
      >
        <Search size={20} />
      </button>

      {/* ================= USER SEARCH RESULTS ================= */}

      {searchResults.length > 0 && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-[9999]
            mt-2
            max-h-80
            overflow-y-auto
            rounded-2xl
            border
            border-white/10
            bg-slate-900
            shadow-2xl
          "
        >
          {searchResults.map((searchedUser) => (
            <button
              key={searchedUser._id}
              type="button"
              onClick={() =>
                handleUserClick(searchedUser)
              }
              className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-3
                text-left
                transition
                hover:bg-white/10
              "
            >

              {/* Avatar */}

              <img
                src={
                  searchedUser.avatar ||
                  "/default-avatar.png"
                }
                alt={
                  searchedUser.username ||
                  "User"
                }
                className="
                  h-10
                  w-10
                  shrink-0
                  rounded-full
                  object-cover
                "
              />

              {/* User Details */}

              <div className="min-w-0">

                <p className="
                  truncate
                  font-semibold
                  text-white
                ">
                  {searchedUser.fullName ||
                    searchedUser.username}
                </p>

                <p className="
                  truncate
                  text-sm
                  text-[var(--muted)]
                ">
                  @{searchedUser.username}
                </p>

              </div>

            </button>
          ))}
        </div>
      )}

      {/* ================= NO RESULT ================= */}

      {search.trim() &&
        searchResults.length === 0 && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              z-[9999]
              mt-2
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              px-5
              py-4
              text-sm
               text-[var(--muted)]
              shadow-2xl
            "
          >
            No users found
          </div>
        )}

    </form>
  );
};

export default SearchBar;