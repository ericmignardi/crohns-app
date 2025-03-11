import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username Required");
    if (!formData.password.trim()) return toast.error("Password Required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        await login(formData);
        setFormData({
          username: "",
          password: "",
        });
        toast.success("Login Successful");
      } catch (error) {
        toast.error("Login Unsuccessful");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl">Login</h1>
      <form
        className="flex flex-col border-[var(--teal)] border-2 rounded-lg p-4 gap-4 bg-base-300"
        onSubmit={handleSubmit}
      >
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn rounded-full bg-[var(--teal)]"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Submit"}
        </button>
        <p className="text-sm text-center">
          Not registered?{" "}
          <Link to="/register" className="text-[var(--blue)] link link-hover">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
