import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GeneralKnowledge from "./pages/GeneralKnowledge";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import { UserProvider } from "./contexts/UserContextProvider";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <UserProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#22c55e",
              },
              style: {
                color: "#166534",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
              },
              style: {
                color: "#991b1b",
              },
            },
          }}
        />

        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/ingame" element={<GeneralKnowledge />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
