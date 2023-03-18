import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Welcome from "../components/Welcome";

import "../css/index.css";
import "../css/main.css";

let profilePicture =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

export default function Root() {
  return (
    <>
      <Navbar />
      {/* Div to Center All Child Elements */}
      <div className="flex flex-col lg:flex-row my-6 profilewrapper py-10 mx-8">
        {/* Column that Contains Profile Image */}
        <div className="flex flex-col items-center lg:items-start lg:pl-10">
          <img
            className="rounded-full w-32 h-32 lg:w-48 lg:h-48"
            src={profilePicture}
            alt="Profile"
          />
        </div>
        {/* Column that Contains Profile Information */}
        <div className="flex flex-col items-center lg:items-start lg:pl-10">
          {/* Row Containing Username */}
          <div className="flex flex-row items-center mb-4">
            <h1 className="text-2xl font-bold mr-4">Username</h1>
            <button className="ml-2 text-sm font-bold text-white bg-blue-500 rounded-full px-4 py-1">
              Edit Profile
            </button>
          </div>
          {/* Row Containing Number of Posts, Followers and Following */}
          <div className="flex flex-row items-center mb-4">
            <h1 className="text-sm font-bold mr-6"># Posts</h1>
            <h1 className="text-sm font-bold mr-6"># Followers</h1>
            <h1 className="text-sm font-bold mr-6"># Following</h1>
          </div>
          {/* Row Containing Full Name and Bio */}
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-sm font-bold">Full Name</h1>
            <h1 className="text-sm">Bio</h1>
          </div>
        </div>
      </div>
      {/* TODO - RM - Area for post picutres on the profile */}
      <div className="flex flex-col items-center">
        <Post />
      </div>
    </>
  );
}
