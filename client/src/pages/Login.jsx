import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userRoute } from "../utils/APIRoutes";
import { toast } from "react-hot-toast";
import MainContainer from "../components/MainContainer";

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`${userRoute}/login`, userData);

      sessionStorage.setItem("userToken", response.data.token);
      toast.success(response.data.message);

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <MainContainer>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="sm:w-2/3 ">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="logo" className="w-8 aspect-square" />
            <h1 className="text-3xl font-bold text-green-800">ExQuizite</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-6 text-green-800 rounded-lg bg-green-500/10 focus:outline-green-800"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-4 text-green-800 rounded-lg bg-green-500/10 focus:outline-green-800"
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full gap-3 py-3 mt-4 font-semibold text-white transition-all bg-orange-400 rounded-lg active:scale-95 focus:outline-orange-800">
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-md"></span>
                <p>Loading</p>
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-6 text-center opacity-70">
            Doesn't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer">
              Sign up
            </span>
          </p>
        </form>
      </div>
    </MainContainer>
  );
}

export default Login;
