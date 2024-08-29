import React, { useState } from "react";
import Header from "../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import bulb from "../assets/bulb_green.png";
import checked from "../assets/checked.png";
import time from "../assets/time.png";
import accuracy from "../assets/accuracy.png";
import SubHeaderButton from "../components/SubHeaderButton";
import { RiLogoutCircleLine } from "react-icons/ri";
import toast from "react-hot-toast";
import getRankBadge from "../utils/getRankBadge";

function Profile() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");

    toast.success("See you next time! 👋");

    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="mt-10">
        <SubHeaderButton>My Profile</SubHeaderButton>
      </div>

      <div className="flex items-start justify-center gap-4 p-4 mt-6 bg-orange-500/70 rounded-xl sm:gap-8 sm:mt-12">
        <div className="w-[5rem] sm:w-[8rem] ">
          <img
            src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${
              user.username + user.firstname
            }`}
            alt="User Avatar"
            className="object-cover p-1 rounded-lg max-sm:mt-2 aspect-square outline outline-4 outline-white"
          />
        </div>

        <div className="flex-1 ">
          <div className="relative text-2xl font-semibold sm:text-4xl group">
            <p className="text-base font-semibold text-white/80">
              {user.firstname}
            </p>
            <h1 className="-mt-2 text-white"> {user.username}</h1>
          </div>

          <div className="flex items-center gap-2 mt-1">
            {getRankBadge(user.rank, "text-lg")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-8 font-semibold text-green-800">
        <TbLayoutDashboardFilled className="text-lg" />
        <h1>Overall Statistics</h1>
      </div>

      <div className="grid gap-4 mt-2 sm:grid-cols-2">
        <div className="flex items-center gap-2 py-4 text-green-800 bg-green-400 px-7 rounded-xl">
          <img src={bulb} alt="icon" className="w-12 " />
          <div className="">
            <h1 className="text-2xl font-bold ">{user.total_questionTaken}</h1>
            <p className="-mt-2 text-green-800/80 text-nowrap">Quiz Taken</p>
          </div>
        </div>

        <div className="flex items-center gap-2 py-4 text-green-800 bg-green-400 px-7 rounded-xl">
          <img src={checked} alt="icon" className="w-12 " />
          <div className="">
            <h1 className="text-2xl font-bold ">
              {user.total_correctAnswers} / {user.total_incorrectAnswers}
            </h1>
            <p className="-mt-2 text-green-800/80 text-nowrap">
              Correct & Incorrect
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 py-4 text-green-800 bg-green-400 px-7 rounded-xl">
          <img src={time} alt="icon" className="w-12 " />
          <div className="">
            <h1 className="text-2xl font-bold ">
              {user.total_questionTaken
                ? (user.total_consumedTime / user.total_questionTaken).toFixed(
                    2
                  ) + " secs"
                : 0}
            </h1>
            <p className="-mt-2 text-green-800/80 text-nowrap">Average Time</p>
          </div>
        </div>

        <div className="flex items-center gap-2 py-4 text-green-800 bg-green-400 px-7 rounded-xl">
          <img src={accuracy} alt="icon" className="w-12 " />
          <div className="">
            <h1 className="text-2xl font-bold ">
              {user.total_questionTaken
                ? (
                    (user.total_correctAnswers / user.total_questionTaken) *
                    100
                  ).toFixed(2) + "%"
                : 0}
            </h1>
            <p className="-mt-2 text-green-800/80 text-nowrap">
              Overall Accuracy
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 ">
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all bg-red-400 rounded-lg active:scale-95">
          <RiLogoutCircleLine className="scale-x-[-1]" />
          Logout
        </button>
      </div>

      {isModalOpen && (
        <>
          {/* backdrop */}
          <div className="absolute inset-0 z-10 flex items-center justify-center animate-opacityShow bg-black/20 backdrop-blur-sm"></div>

          {/* modal div */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="p-4 shadow rounded-xl animate-modalShow bg-orange-50 w-[20rem]">
              <header className="pb-2 text-lg font-semibold text-center border-b border-orange-800/30">
                Are you sure?
              </header>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 font-semibold text-white transition-all bg-green-400 rounded-lg active:scale-95">
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 font-semibold text-white transition-all bg-red-400 rounded-lg active:scale-95">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
