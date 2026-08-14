const tabs = [
  "posts",
  "videos",
  "comments",
  "likes",
  "images",
];

const ActivityTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-6 w-full overflow-x-auto pb-2">
      <div className="flex w-max gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium capitalize transition-all duration-300 ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow-lg"
                : "border border-white/10 bg-white/10 text-white hover:bg-orange-100 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityTabs;