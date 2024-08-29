import React from "react";

function getRankName(rank) {
  let rankName;

  if (rank >= 10000) {
    rankName = "immortal";
  } else if (rank >= 9000) {
    rankName = "supreme";
  } else if (rank >= 8000) {
    rankName = "eternal";
  } else if (rank >= 7000) {
    rankName = "mythic";
  } else if (rank >= 6000) {
    rankName = "legend";
  } else if (rank >= 5000) {
    rankName = "grandmaster";
  } else if (rank >= 4000) {
    rankName = "master";
  } else if (rank >= 3000) {
    rankName = "expert";
  } else if (rank >= 2000) {
    rankName = "advanced";
  } else if (rank >= 1000) {
    rankName = "apprentice";
  } else if (rank >= 500) {
    rankName = "novice";
  } else {
    rankName = "newbie";
  }

  return rankName;
}

export default getRankName;
