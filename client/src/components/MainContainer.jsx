import React from "react";

function MainContainer({ children }) {
  return (
    <div className="w-screen text-orange-800 bg-orange-50 h-svh">
      <div className="max-w-[40rem] flex flex-col mx-auto px-4  min-[680px]:px-0 h-full">
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
