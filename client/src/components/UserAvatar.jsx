import React from "react";
import { useUserContext } from "../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";
import getRankBadge from "../utils/getRankBadge";

function UserAvatar({ imageWidth = "50px" }) {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const imageStyle = { width: imageWidth };

  return (
    <div
      onClick={() => navigate("/profile")}
      className="flex items-center gap-3 cursor-pointer">
      <div className="flex flex-col items-end">
        <h3 className="text-sm font-semibold sm:text-lg">{user.username}</h3>
        {getRankBadge(user.rank, "text-sm")}
      </div>
      {user.username && (
        <img
          src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${
            user.username + user.firstname
          }`}
          alt="User Avatar"
          style={imageStyle}
          className="object-cover p-1 rounded-full aspect-square outline outline-3 outline-orange-800"
        />
      )}
    </div>
  );
}

export default UserAvatar;
