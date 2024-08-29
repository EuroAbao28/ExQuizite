import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function SubHeaderButton({ children }) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-4 ">
      <div
        onClick={() => navigate("/")}
        className="p-2 transition-all rounded-full cursor-pointer hover:bg-orange-800/5 active:scale-95">
        <IoMdArrowRoundBack className="text-2xl" />
      </div>
      <h1 className="text-2xl font-bold capitalize">{children}</h1>
    </header>
  );
}

export default SubHeaderButton;
