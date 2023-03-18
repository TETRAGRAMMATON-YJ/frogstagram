import "../css/index.css";

export default function Welcome() {
  return (
    <>
      <div className="wrapper mt-5">
        <h1 className="title navtext">Welcome to Frogstagram!</h1>
        <p>The world's #1 frog-centric social media platform</p>
        {/* Upload file button that makes a post request to the URL "http://127.0.0.1:8000/predict/image" */}
        <form
          action="http://127.0.0.1:8000/predict/image"
          method="post"
          enctype="multipart/form-data"
        >
          <input type="file" name="file" />
          <input type="submit" value="Upload" />
        </form>
      </div>
    </>
  );
}
