import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaMailBulk, FaLocationArrow } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullFormData = {
      ...formData,
      access_key: import.meta.env.VITE_ACCESS_KEY,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", fullFormData);
      toast.success("Successfully Sent Email");
      navigate("/");
    } catch (error) {
      console.log("Error in handleSubmit: ", error.message);
      toast.error("Error Sending Email");
    }
  };

  return (
    <div className="container mx-auto py-4 grid grid-cols-2 justify-center items-center gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">Contact Us</h1>
        <p className="text-[var(--gray)]">
          Please fill out the form, and our team will get back to you as soon as
          possible.
        </p>
        <p className="flex gap-4 items-center">
          <FaPhone className="text-[var(--blue)]" />
          905-304-1234
        </p>
        <p className="flex gap-4 items-center">
          <FaMailBulk className="text-[var(--blue)]" />
          mignardi.e@gmail.com
        </p>
        <p className="flex gap-4 items-center">
          <FaLocationArrow className="text-[var(--blue)]" />
          123 Upper James St. - Hamilton ON.
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-[var(--teal)] border-2 rounded-lg p-4 gap-4"
        >
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            placeholder="First Last"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="message">Message</label>
          <textarea
            className="input resize-none"
            type="text"
            name="message"
            id="message"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="btn bg-[var(--teal)] rounded-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
