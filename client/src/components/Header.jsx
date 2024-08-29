import React from "react";
import logo from "../assets/logo.png";

function Header({ children }) {
  return (
    <header className="flex items-center justify-between h-16 border-b border-orange-800/30">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-8 aspect-square" />
        <h1 className="text-2xl font-bold text-green-800">ExQuizite</h1>
      </div>

      {children}
    </header>
  );
}

export default Header;
