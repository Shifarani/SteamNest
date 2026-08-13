const tabs = [
  "posts",
  "videos",
  "comments",
  "likes",
  "images",
];

const ActivityTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize
            ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow-lg"
                 : "bg-gray-200 !text-slate-900 hover:bg-orange-100"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ActivityTabs;