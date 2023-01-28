// React component to represent the like button.
// The component begins with the heart icon in the hollow state.
// When the user clicks the button, the heart icon changes to the solid state.

import React, { useState } from "react";

// Import FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import hollow heart icon
import { faHeart } from "@fortawesome/free-regular-svg-icons";

// Import solid heart icon
import { faHeart as fasHeartSolid } from "@fortawesome/free-solid-svg-icons";

export default function LikeButton() {
  // Declare a new state variable, which we'll call "isLiked"
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="pr-3">
      <FontAwesomeIcon
        icon={isLiked ? fasHeartSolid : faHeart}
        style={{ height: "3vh" }}
        onClick={() => setIsLiked(!isLiked)}
      />
    </div>
  );
}
