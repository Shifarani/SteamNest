import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// Ye wahi jagah hai jahan current page render hoga
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">

    {/* React Router isi jagah current page ko inject karega. */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;