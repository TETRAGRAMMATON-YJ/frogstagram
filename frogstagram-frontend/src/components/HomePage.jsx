import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Welcome from "../components/Welcome";

import "../tailwind.css"; // Import Tailwind CSS

export default function Root() {
  return (
    <>
      <Navbar />
      {/* Div to Center All Child Elements */}
      <div className="flex flex-col items-center">
        <Welcome />
        <Post />
      </div>
    </>
  );
}
