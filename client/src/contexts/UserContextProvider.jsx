import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userRoute } from "../utils/APIRoutes";
import getRankName from "../utils/getRankName";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const getMyRankPlacement = async (id) => {
    try {
      const userToken = sessionStorage.getItem("userToken");

      const response = await axios.get(`${userRoute}/getMyRank/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetUser = (newUser, userPlacement) => {
    setUser({
      ...newUser,
      rank: getRankName(newUser.exp),
      placement: userPlacement,
    });
  };

  const updateStats = async (updatedData) => {
    const {
      total_questionTaken,
      total_correctAnswers,
      total_incorrectAnswers,
      exp,
      total_consumedTime,
    } = updatedData;

    try {
      const userToken = sessionStorage.getItem("userToken");

      const response = await axios.patch(
        `${userRoute}/${user._id}`,
        {
          total_questionTaken,
          total_correctAnswers,
          total_incorrectAnswers,
          exp,
          total_consumedTime,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Get the updated placement after stats update
      const placement = await getMyRankPlacement(user._id);

      setUser((prev) => ({
        ...prev,
        total_questionTaken: response.data.updatedUser.total_questionTaken,
        total_correctAnswers: response.data.updatedUser.total_correctAnswers,
        total_incorrectAnswers:
          response.data.updatedUser.total_incorrectAnswers,
        exp: response.data.updatedUser.exp,
        total_consumedTime,
        rank: getRankName(response.data.updatedUser.exp),
        placement: placement,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Oops! Failed to save progress");
    }
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <UserContext.Provider value={{ handleSetUser, user, updateStats }}>
      {children}
    </UserContext.Provider>
  );
};
