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
    instructions: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
  });

  const { create } = useRecipeStore();
  const navigate = useNavigate();

  function validateForm() {
    if (!formData.name.trim()) return toast.error("Name Field Required");
    if (!formData.description.trim())
      return toast.error("Description Field Required");
    if (!formData.preparation_time.trim())
      return toast.error("Preparation Time Field Required");
    if (!formData.cooking_time.trim())
      return toast.error("Cooking Time Field Required");
    if (!formData.type.trim()) return toast.error("Type Field Required");
    if (!formData.image.trim()) return toast.error("Image Field Required");
    if (!formData.instructions.trim())
      return toast.error("Instructions Field Required");
    if (
      formData.ingredients.some(
        (ingredient) =>
          !ingredient.name || !ingredient.quantity || !ingredient.unit
      )
    )
      return toast.error("All ingredients must be complete");
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

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  return (
    <main className="container mx-auto p-4">
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
          <label htmlFor="instructions">Instructions</label>
          <textarea
            className="input"
            name="instructions"
            id="instructions"
            placeholder="Instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="4"
          />
          <h3>Ingredients</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="input input-bordered input-sm w-full"
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                className="input input-bordered input-sm w-24"
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                className="input input-bordered input-sm w-24"
                type="text"
                name="unit"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="btn bg-red-500 text-[var(--dark)]"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="btn bg-[var(--blue)] rounded-full"
          >
            Add Ingredient
          </button>
          <button type="submit" className="btn bg-[var(--teal)] rounded-full">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default Create;
