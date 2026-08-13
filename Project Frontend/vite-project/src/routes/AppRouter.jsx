import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// Protected Pages
import Home from "../pages/Home";
import Explore from "../pages/Explore";

import Profile from "../pages/Profile";
import WatchPage from "../pages/WatchPage";
import UploadPage from "../pages/UploadPage";
// Other
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";

import EditVideo from "../pages/EditVideo";

import Playlists from "../pages/playlists";
import PlaylistDetails from "../pages/PlaylistDetails";

import WatchHistory from "../pages/WatchHistory";
import Subscriptions from "../pages/Subscriptions";

import Settings from "../pages/Settings";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadPage />} />
        {/* Main Layout Routes */}
       {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/watch/:videoId" element={<WatchPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
            <Route
            path="/c/:username"
            element={<Profile />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-video/:videoId" element={<EditVideo />} />
          <Route path="/playlists" element={<Playlists />} />

            <Route
              path="/playlists/:playlistId"
              element={<PlaylistDetails />}
            />
            <Route 
              path="/history" 
              element={<WatchHistory />} 
            />
             <Route 
              path="/subscriptions" 
              element={<Subscriptions />} 
            />
            <Route 
            path="/settings" 
            element={<Settings />} 
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;