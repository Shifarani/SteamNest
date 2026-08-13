import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import VideoGrid from "../components/VideoCard/VideoGrid";


const Home = () => {


  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {


    const fetchVideos = async () => {


      try {


        const response = await axiosInstance.get("/videos");


        console.log(response.data);


        setVideos(response.data.data.docs);


      } catch (error) {


        console.error("Error fetching videos:", error);


      } finally {


        setLoading(false);


      }
    };


    fetchVideos();


  }, []);



  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }



  return (
    <div className="p-4">


      {/* Videos Section */}
      <VideoGrid videos={videos} />


    </div>
  );
};



export default Home;  