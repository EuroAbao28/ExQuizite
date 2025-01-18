import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SubHeaderButton from "../components/SubHeaderButton";
import { useUserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { userRoute } from "../utils/APIRoutes";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import award from "../assets/award.png";
import award2 from "../assets/award2.png";
import award3 from "../assets/award3.png";
import classNames from "classnames";
import GetRankTag from "../utils/getRankName";
import getRankBadge from "../utils/getRankBadge";

function Leaderboard() {
  const navigate = useNavigate();
  const { user: currentUser } = useUserContext();
  const [allUsers, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  const handleGetAllUser = async () => {
    if (!isLoading) setIsLoading(true);

    try {
      const userToken = sessionStorage.getItem("userToken");

      const response = await axios.get(
        `${userRoute}/getAllUser?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // console.log(response.data);
      setAllUser(response.data.users);
      setTotalUsers(response.data.totalUsers);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      navigate("/");
    }
  };

  const handleChangePage = (direction) => {
    if (direction === "next" && page * limit < totalUsers) {
      setPage((prev) => prev + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const getRank = (rank) => {
    if (rank === 1) {
      return (
        <div className="w-6">
          <img src={award} alt="award icon" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-6">
          <img src={award2} alt="award icon" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-6">
          <img src={award3} alt="award icon" />
        </div>
      );
    } else return <p className="text-center">{rank}</p>;
  };

  useEffect(() => {
    handleGetAllUser();
  }, [page]);

  return (
    <div className="flex flex-col h-svh">
      <Header />
      <div className="mt-10 ">
        <SubHeaderButton>Leaderboard</SubHeaderButton>
      </div>
      {isLoading ? (
        <div className="  mt-24 flex gap-4 justify-center">
           <span className="loading loading-spinner loading-sm"></span>
           <p className="text-lg">Loading.</p>
            </div>
      ) : ( <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex mt-6 overflow-auto">
          <table className="table max-sm:table-xs">
            <thead className="sticky top-0 z-10 bg-orange-50">
              <tr>
                <th>
                  <p className="text-center">{totalUsers}</p>
                </th>
                <th>Username</th>
                <th>Quiz Taken</th>
                <th>Avg Time</th>
                <th>Accuracy</th>
                <th>Exp Points</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={classNames(
                    "hover:bg-green-500/20 hover:text-green-800",
                    {
                      "bg-orange-500/10 hover:bg-orange-500/20 hover:text-orange-800":
                        currentUser._id === user._id,
                    }
                  )}>
                  <td>{getRank((page - 1) * limit + index + 1)}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 aspect-square mask mask-squircle ">
                        <img
                          src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${
                            user.username + user.firstname
                          }`}
                          alt="User Avatar"
                        />
                      </div>

                      <div>
                        <h3> {user.username}</h3>
                        {getRankBadge(GetRankTag(user.exp), "text-xs")}
                      </div>
                    </div>
                  </td>
                  <td>{user.total_questionTaken}</td>
                  <td>
                    {user.total_questionTaken
                      ? (
                          user.total_consumedTime / user.total_questionTaken
                        ).toFixed(2) + "s"
                      : 0}
                  </td>
                  <td>
                    {user.total_questionTaken
                      ? (
                          (user.total_correctAnswers /
                            user.total_questionTaken) *
                          100
                        ).toFixed(2) + "%"
                      : 0}
                  </td>
                  <td>{user.exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="z-10 flex items-center justify-center gap-6 py-10 max-sm:pt-8 bg-orange-50">
          <button
            onClick={() => handleChangePage("prev")}
            className="flex items-center gap-2 px-4 py-2 text-white transition-all bg-green-500 rounded-lg active:scale-95">
            <LuChevronLeft className="text-lg" />
            <p>Prev</p>
          </button>

          <p className="font-bold text-green-800 "> {page}</p>

          <button
            onClick={() => handleChangePage("next")}
            className="flex items-center gap-2 px-4 py-2 text-white transition-all bg-green-500 rounded-lg active:scale-95">
            <p>Next</p>
            <LuChevronRight className="text-lg" />
          </button>
        </div>
      </div>)}
    </div>
  );
}

export default Leaderboard;
