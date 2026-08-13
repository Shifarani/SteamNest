import VideoCard from "../VideoCard/VideoCard";


const VideoGrid = ({ videos }) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {videos?.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}

      </div>

    </section>
  );
};

export default VideoGrid;