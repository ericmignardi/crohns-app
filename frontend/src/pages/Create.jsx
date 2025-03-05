import React, { useState } from "react";
import { useRecipeStore } from "../store/useRecipeStore.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preparation_time: "",
    cooking_time: "",
    type: "",
    image: "",
  });

  const { create } = useRecipeStore();
  const navigate = useNavigate();

  function validateForm() {
    if (!formData.name.trim()) return toast.error("Name Field Required");
    if (!formData.description.trim()) return toast.error("Name Field Required");
    if (!formData.preparation_time.trim())
      return toast.error("Preparation Time Field Required");
    if (!formData.cooking_time.trim())
      return toast.error("Cooking Time Field Required");
    if (!formData.type.trim()) return toast.error("Type Field Required");
    if (!formData.image.trim()) return toast.error("Image Field Required");
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        await create(formData);
        navigate("/recipes");
      } catch (error) {
        toast.error("Failed to create recipe");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="container mx-auto py-4">
      <section>
        <h1>Create</h1>
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
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            className="input"
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="preparation_time">Preparation Time</label>
          <input
            className="input"
            type="text"
            name="preparation_time"
            id="preparation_time"
            placeholder="Preparation Time"
            value={formData.preparation_time}
            onChange={handleChange}
          />
          <label htmlFor="cooking_time">Cooking Time</label>
          <input
            className="input"
            type="text"
            name="cooking_time"
            id="cooking_time"
            placeholder="Cooking Time"
            value={formData.cooking_time}
            onChange={handleChange}
          />
          <label htmlFor="type">Type</label>
          <input
            className="input"
            type="text"
            name="type"
            id="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
          />
          <label htmlFor="image">Image</label>
          <input
            className="input"
            type="text"
            name="image"
            id="image"
            placeholder="Image"
            value={formData.image}
            onChange={handleChange}
          />
          <button type="submit" className="btn bg-[var(--teal)] rounded-full">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default Create;
