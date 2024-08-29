import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { userRoute } from "../utils/APIRoutes";
import MainContainer from "../components/MainContainer";

function Signup() {
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
      const response = await axios.post(`${userRoute}/signup`, userData);

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
          <div className="flex gap-4 mt-6 max-sm:flex-col">
            <input
              type="text"
              name="username"
              placeholder="Username"
              pattern="^\S*$"
              title="No spaces allowed"
              minLength={3}
              maxLength={12}
              onChange={handleChange}
              className="w-full px-4 py-3 text-green-800 rounded-lg bg-green-500/10 focus:outline-green-800"
            />
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              pattern="[A-Za-z]*"
              title="Letters only"
              minLength={3}
              maxLength={10}
              onChange={handleChange}
              className="w-full px-4 py-3 text-green-800 rounded-lg bg-green-500/10 focus:outline-green-800"
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={4}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-4 text-green-800 rounded-lg bg-green-500/10 focus:outline-green-800"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            minLength={4}
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
              "Sign Up"
            )}
          </button>

          <p className="mt-6 text-center opacity-70">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer">
              Login
            </span>
          </p>
        </form>
      </div>
    </MainContainer>
  );
}

export default Signup;
