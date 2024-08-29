import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryButton({ title, desciption, icon, path }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/ingame?category=${path}`)}
      className="flex items-start w-full gap-3 p-4 transition-all cursor-pointer select-none rounded-xl focus:bg-orange-500/30 focus:outline-orange-500 bg-orange-500/20 hover:bg-orange-500/30 active:scale-95">
      <img
        src={icon}
        alt="icon"
        className="w-20 p-2 shadow-inner bg-white/50 rounded-xl aspect-square"
      />
      <div className="text-start">
        <h3 className="text-lg font-bold leading-6 sm:text-base ">{title}</h3>
        <p className="mt-1 text-base leading-4 sm:mt-0 sm:text-sm text-orange-800/80">
          {desciption}
        </p>
      </div>
    </button>
  );
}

export default CategoryButton;
