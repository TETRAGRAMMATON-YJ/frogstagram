import "../tailwind.css"; // Import Tailwind CSS
import logo from "../frog.png";
import LogoutButton from "./LogoutButton";
import UploadButton from "./UploadButton";

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
            className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg lg:text-xl navtext"
          >
            FROGSTAGRAM
          </a>
          <div className="flex items-center lg:text-lg">
            <UploadButton />
            <a href="/" className="px-4 navtext navhover" to="/explore">
              Explore
            </a>
            <a href="/profile" className="px-4 navtext navhover" to="/profile">
              Profile
            </a>
            <a href="/" className="px-4 navtext navhover" to="/settings">
              Settings
            </a>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
