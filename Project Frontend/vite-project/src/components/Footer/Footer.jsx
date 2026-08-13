import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              SteamNest
            </h2>

            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Discover, upload and share amazing videos with the world.
              Built using the MERN Stack.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/home" className="hover:text-orange-500">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/explore" className="hover:text-orange-500">
                  Explore
                </Link>
              </li>

              <li>
                <Link to="/upload" className="hover:text-orange-500">
                  Upload
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Account
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/login" className="hover:text-orange-500">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" className="hover:text-orange-500">
                  Signup
                </Link>
              </li>

              <li>
                <Link to="/profile" className="hover:text-orange-500">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <p>Email: support@steamnest.com</p>

            <p className="mt-2">
              Made with ❤️ using React, Node.js, Express & MongoDB.
            </p>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm text-[var(--muted)]">
            © 2026 SteamNest. All Rights Reserved.
             Built with ❤️ by Shifa Rani.
          </p>

          <div className="flex gap-6">
            <Link to="/" className="hover:text-orange-500">
              Privacy
            </Link>

            <Link to="/" className="hover:text-orange-500">
              Terms
            </Link>

            <Link to="/" className="hover:text-orange-500">
              Support
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;