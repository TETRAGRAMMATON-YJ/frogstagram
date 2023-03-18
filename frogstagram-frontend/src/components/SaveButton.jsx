// React Component to represent the save button.
// The component begins with the bookmark icon in the hollow state.
// When the user clicks the button, the bookmark icon changes to the solid state.

import React, { useState } from "react";

// Import FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import hollow bookmark icon
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// Import solid bookmark icon
import { faBookmark as fasBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

export default function SaveButton() {
  // Declare a new state variable, which we'll call "isSaved"
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="ml-auto">
      <FontAwesomeIcon
        icon={isSaved ? fasBookmarkSolid : faBookmark}
        style={{ height: "3vh" }}
        onClick={() => setIsSaved(!isSaved)}
      />
    </div>
  );
}
