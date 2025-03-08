import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.first_name.trim()) return toast.error("First Name Required");
    if (!formData.last_name.trim()) return toast.error("Last Name Required");
    if (!formData.email.trim()) return toast.error("Email Required");
    if (!formData.username.trim()) return toast.error("Username Required");
    if (!formData.password.trim()) return toast.error("Password Required");
    if (formData.password.trim().length < 6)
      return toast.error("Password Must Be At Least 6 Characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        await register(formData);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        });
        toast.success("Registration Successful");
      } catch (error) {
        toast.error("Registration Unsuccessful");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl">Register</h1>
      <form
        className="flex flex-col border-[var(--teal)] border-2 rounded-lg p-4 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="input"
          type="text"
          name="first_name"
          id="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
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
          disabled={isRegistering}
        >
          {isRegistering ? "Registering..." : "Submit"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--blue)] link link-hover">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
