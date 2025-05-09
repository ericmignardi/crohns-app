import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Recipes from "./pages/Recipes.jsx";
import Create from "./pages/Create.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Chat from "./pages/Chat.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";

const App = () => {
  const { authUser, verify, isVerifyingAuth, onlineUsers } = useAuthStore();

  console.log(onlineUsers);

  useEffect(() => {
    verify();
  }, [verify]);

  if (!authUser && isVerifyingAuth) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/create" element={authUser ? <Create /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={authUser ? <Chat /> : <Login />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Login />} />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
