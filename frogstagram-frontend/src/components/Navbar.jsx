import "../css/index.css";
import logo from "../frog.png";

// Top navbar component
export default function Navbar() {
  return (
    <div className="flex shadow-sm">
      <div className="container mx-auto">
        <div
          className="flex flex-col lg:flex-row items-center justify-between px-6 py-3"
          style={{ backgroundColor: "#E4EEE2" }}
        >
          {/* Frogstagram Logo */}
          <img className="pr-2 w-14 h-12" src={logo} alt="Frogstagram" />
          <a
            // Position absolute, horizontally centered "Frogstagram"
            className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg lg:text-xl text-gray-800 navtext"
          >
            FROGSTAGRAM
          </a>
          <div className="flex items-center text-gray-600 lg:text-lg">
            <a href="/" className="px-4 navtext navhover" to="/explore">
              Explore
            </a>
            <a href="/profile" className="px-4 navtext navhover" to="/profile">
              Profile
            </a>
            <a href="/" className="px-4 navtext navhover" to="/settings">
              Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
