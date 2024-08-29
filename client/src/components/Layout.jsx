import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { userRoute } from "../utils/APIRoutes";
import { toast } from "react-hot-toast";
import MainContainer from "./MainContainer";
import authImage from "../assets/authenticating.svg";

function Layout() {
  const navigate = useNavigate();

  const { handleSetUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userToken = sessionStorage.getItem("userToken");

      const response = await axios.get(userRoute, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      // check if theres error before getting the user placement
      if (!response.data || !response.data._id) {
        throw new Error("User ID not found");
      }

      const userPlacementResponse = await axios.get(
        `${userRoute}/getMyRank/${response.data._id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      const userPlacement = userPlacementResponse.data;

      handleSetUser(response.data, userPlacement);

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);

      sessionStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <MainContainer>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full gap-12">
          <img src={authImage} alt="image" className="w-28" />

          <div className="flex items-center gap-3 ">
            <span className="loading loading-spinner loading-md"></span>
            <p className="text-lg">Authenticating</p>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </MainContainer>
  );
}

export default Layout;
