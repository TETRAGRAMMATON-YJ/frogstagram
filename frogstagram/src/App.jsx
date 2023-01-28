import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Welcome from "./components/Welcome";

export default function App() {
  return (
    <>
      <Navbar />
      {/* Div to Center All Child Elements */}
      <div className="flex flex-col items-center">
        <Welcome />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
}
