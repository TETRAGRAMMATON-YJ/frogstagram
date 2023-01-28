// React Component Function to Represent a Single Instagram Post in the Feed

import React, { useState, useEffect } from "react";

import postimg from "../Frog.jpg";

// Import FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import hollow comment icon
import { faComment } from "@fortawesome/free-regular-svg-icons";

// Import hollow send icon
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

// Import hollow bookmark icon
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// Import Like Button Component
import LikeButton from "./LikeButton";

// Import Save Button Component
import SaveButton from "./SaveButton";

export default function Post() {
  // Username of the User Who Posted the Post
  const [username, setUsername] = useState("");

  // caption of the Post
  const [caption, setCaption] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => setUsername(data.results[0].login.username));
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setCaption(data.content));
  }, []);

  return (
    <div className="wrapper mt-4 mb-4">
      <div className="post">
        {/* Horizontal bar containing circular picture and username */}
        <div className="flex items-center pb-4">
          <img
            className="w-10 h-10 rounded-full"
            src="https://picsum.photos/200"
            alt="User"
          />
          <p className="pl-2">{username}</p>
        </div>

        {/* Image for the Post, Which Should have Excess Cropped */}
        <img class="aspect-square pb-2" src={postimg} alt="Post" />
        {/* Horizontal bar containing like, comment, send, and save (save should be aligned on the right) icons */}
        <div className="flex items-center">
          <LikeButton />
          <div class="pr-3">
            <FontAwesomeIcon icon={faComment} style={{ height: "3vh" }} />
          </div>
          <div class="pr-3">
            <FontAwesomeIcon icon={faPaperPlane} style={{ height: "3vh" }} />
          </div>
          {/* Right-aligned save icon */}
          <SaveButton />
        </div>
        {/* Display of Like Count */}
        <p className="text-gray-500">1,000 likes</p>
        {/* Paragraph containing the caption */}
        <p>
          <strong>{username}</strong> {caption}
        </p>
        {/* "View all comments" button */}
        <p className="text-gray-500 pt-1 pb-1">View all 1,000 comments</p>
        {/* Preview of two comments */}
        <p>
          <strong>user1</strong> This is a comment.
        </p>
        <p>
          <strong>user2</strong> This is another comment.
        </p>
        {/* "Add a Comment" section that shows your profile picture */}
        <div className="flex items-center pt-2">
          <img
            className="w-10 h-10 rounded-full"
            src="https://picsum.photos/200"
            alt="User"
          />
          <p className="pl-2">Add a comment...</p>
        </div>
        <p></p>
      </div>
    </div>
  );
}
