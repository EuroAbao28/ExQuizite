import React from "react";
import classNames from "classnames";

const getRankBadge = (rank, fontSize) => {
  const badgeClasses = classNames(
    "px-2 italic font-semibold  capitalize shadow-custom-shadow rounded-md w-fit",
    fontSize,
    {
      "outline outline-2 outline-red-500 animate-badgeAnimation":
        rank === "immortal",
      "bg-red-500 text-stone-900 outline outline-2 outline-red-800":
        rank === "supreme",
      "bg-red-800 text-yellow-500 outline outline-2 outline-yellow-500":
        rank === "eternal",
      "bg-red-700 text-red-300 outline outline-2 outline-red-300":
        rank === "mythic",
      "bg-rose-800 text-white": rank === "legend",
      "bg-pink-700 text-white": rank === "grandmaster",
      "bg-purple-700 text-white": rank === "master",
      "bg-indigo-700 text-white": rank === "expert",
      "bg-sky-700 text-white": rank === "advanced",
      "bg-teal-700 text-white": rank === "apprentice",
      "bg-green-700 text-white": rank === "novice",
      "bg-yellow-700 text-white": rank === "newbie",
    }
  );

  return <p className={badgeClasses}>{rank}</p>;
};

export default getRankBadge;
