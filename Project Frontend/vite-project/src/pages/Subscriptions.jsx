import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Sparkles,
  UserCheck,
} from "lucide-react";

import { getCurrentUser } from "../api/userApi";
import { getSubscribedChannels } from "../api/subscriptionApi";
import { toggleSubscription } from "../api/subscriptionApi";

const Subscriptions = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

 const fetchSubscriptions = async () => {
  try {
    const user = await getCurrentUser();

    console.log("Current User:", user);

    const subscriberId =
      user?.data?._id || user?._id;

    console.log("Subscriber ID:", subscriberId);

    const response = await getSubscribedChannels(
      subscriberId
    );

    console.log("Subscription API Response:", response);

    setChannels(response?.data || []);

  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleUnsubscribe = async (channelId) => {
    try {
      await toggleSubscription(channelId);

      setChannels((prev) =>
        prev.filter(
          (item) => item.channel._id !== channelId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredChannels = useMemo(() => {
    if (!search.trim()) return channels;

    return channels.filter((item) => {
      const channel = item.channel;

      return (
        channel?.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        channel?.username
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [channels, search]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-[6px] border-orange-500 border-t-transparent"></div>

          <h2 className="mt-6 text-2xl font-bold text-slate-800">
            Loading Subscriptions...
          </h2>

          <p className="mt-2 text-slate-500">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--bg)]/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[var(--bg)]/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* LEFT */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[var(--bg)]/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                <Sparkles size={16} />
                SteamNest Community
              </div>

              <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                Your
                <span className="block">
                  Subscriptions
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-orange-100">
                Stay connected with your favourite creators. Browse every
                subscribed channel in one beautiful place and never miss new
                uploads.
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-5">
                <div className="rounded-3xl border border-white/20 bg-[var(--bg)]/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2">
                  <Users
                    size={34}
                    className="mb-4 text-white"
                  />
                  <h2 className="text-3xl font-black text-white">
                    {channels.length}
                  </h2>
                  <p className="mt-1 text-orange-100">
                    Subscribed Channels
                  </p>
                </div>

                <div className="rounded-3xl border border-white/20 bg-[var(--bg)]/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2">
                  <UserCheck
                    size={34}
                    className="mb-4 text-white"
                  />
                  <h2 className="text-3xl font-black text-white">
                    Active
                  </h2>
                  <p className="mt-1 text-orange-100">
                    Following Creators
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="rounded-[32px] border border-white/20 bg-[var(--bg)]/10 p-8 shadow-2xl backdrop-blur-2xl">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Search Channels
                </h2>

                <div className="relative">
                  <Search
                    size={22}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search subscribed channels..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl border border-white/30 bg-[var(--bg)] py-4 pl-14 pr-5 text-slate-700 shadow-xl outline-none transition-all duration-300 focus:scale-[1.02] focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
                  />
                </div>

                <div className="mt-8 rounded-3xl bg-[var(--bg)]/10 p-6 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-widest text-orange-100">
                    Total Following
                  </p>
                  <h2 className="mt-2 text-5xl font-black text-white">
                    {filteredChannels.length}
                  </h2>
                  <p className="mt-2 text-orange-100">
                    Channels Found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHANNELS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black text-[var(--text)]">
              Following Creators
            </h2>
            <p className="mt-2 text-slate-500">
              Stay updated with your favourite creators.
            </p>
          </div>

          <div className="rounded-2xl bg-orange-100 px-5 py-3">
            <p className="text-sm font-semibold text-orange-600">
              {filteredChannels.length} Channels
            </p>
          </div>
        </div>

        {filteredChannels.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredChannels.map((item) => {
              const channel = item.channel;

              return (
                <div
                  key={channel._id}
                  className="group overflow-hidden rounded-[30px] border border-slate-200 bg-[var(--bg)] shadow-md transition-all duration-500 hover:-translate-y-3 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-200/50"
                >
                  {/* Cover */}
                  <div className="h-28 bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600"></div>

                  {/* Avatar */}
                  <div className="-mt-12 flex justify-center">
                    <img
                      src={channel?.avatar}
                      alt={channel?.fullName}
                      className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-7 pt-5 text-center">
                    <h2 className="text-2xl font-black text-slate-800">
                      {channel?.fullName}
                    </h2>
                    <p className="mt-1 text-slate-500">
                      @{channel?.username}
                    </p>

                    <div className="mt-6 flex justify-center">
                      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        ✔ Subscribed
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleUnsubscribe(channel._id)
                      }
                      className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      Unsubscribe
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-[var(--bg)] px-8 py-20 text-center shadow-xl">
            <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-orange-100 to-purple-100">
              <Users
                size={52}
                className="text-orange-500"
              />
            </div>

            <h2 className="text-4xl font-black text-slate-800">
              No Subscriptions Yet
            </h2>

            <p className="mt-4 max-w-lg text-lg leading-8 text-slate-500">
              You haven't subscribed to any creators yet.
              Start exploring amazing content and subscribe to your
              favourite channels to see them here.
            </p>

            <button
              onClick={() => (window.location.href = "/explore")}
              className="mt-10 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 px-10 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-orange-300"
            >
              Explore Creators
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Subscriptions;
