import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useRecipeStore } from "../store/useRecipeStore.js";
import { FaTrash, FaEdit } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const { authUser } = useAuthStore();
  const { deleteById, update } = useRecipeStore();

  const [isModalOpen, setIsModalOpen] = useState(null);
  const [formData, setFormData] = useState({
    name: recipe.name || "",
    description: recipe.description || "",
    preparation_time: recipe.preparation_time || "",
    cooking_time: recipe.cooking_time || "",
    type: recipe.type || "",
    image: recipe.image || "",
    instructions: recipe.instructions || "",
    ingredients: recipe.ingredients || "",
  });

  useEffect(() => {
    setFormData({
      name: recipe.name || "",
      description: recipe.description || "",
      preparation_time: recipe.preparation_time || "",
      cooking_time: recipe.cooking_time || "",
      type: recipe.type || "",
      image: recipe.image || "",
      instructions: recipe.instructions || "",
      ingredients: recipe.ingredients || "",
    });
  }, [recipe]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteById(recipe.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await update(recipe.id, formData);
    setIsModalOpen(null);
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
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [name]: value,
    };
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm h-96">
      <figure>
        <img
          src={
            recipe.image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={recipe.name + "'s Image"}
        />
      </figure>
      <div className="card-body bg-base-300 rounded-b-[1rem]">
        <h2 className="card-title">{recipe.name}</h2>
        <p className="text-[var(--gray)]">{recipe.description}</p>
        <div className="card-actions justify-end">
          {authUser && authUser.id === recipe.user_id && (
            <>
              <button
                className="btn btn-outline btn-primary text-[var(--dark)]"
                onClick={() => setIsModalOpen("update")}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-outline btn-error text-[var(--dark)]"
                onClick={handleDelete}
              >
                <FaTrash />
              </button>
            </>
          )}
          <button
            className="btn btn-outline"
            onClick={() => setIsModalOpen("details")}
          >
            Details
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen === "details" && (
        <dialog id="my_modal_1" className="modal modal-open">
          <div className="modal-box max-w-3xl bg-base-300 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center gap-4 mb-4">
              <h3 className="font-bold text-2xl text-[var(--light)]">
                {recipe.name}
              </h3>
              <div className="flex gap-3">
                <div className="badge badge-sm badge-primary">
                  Prep: {recipe.preparation_time}
                </div>
                <div className="badge badge-sm badge-accent">
                  Cook: {recipe.cooking_time}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-primary mb-2">
                Ingredients
              </h4>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="text-sm text-[var(--gray)]"
                  >
                    {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-accent mb-2">Steps</h4>
              <ul className="list-decimal pl-5">
                {recipe.instructions.split("\n").map((instruction, index) => (
                  <li key={index} className="text-sm text-[var(--gray)]">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-action mt-6 flex justify-end">
              <button
                className="btn btn-primary text-white rounded-full px-6 py-2"
                onClick={() => setIsModalOpen(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Update Recipe Modal */}
      {isModalOpen === "update" && (
        <dialog id="my_modal_2" className="modal modal-open">
          <div className="modal-box bg-base-300">
            <form
              onSubmit={handleUpdate}
              className="flex flex-col border-primary border-2 rounded-lg p-4 gap-4"
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
                    placeholder="Name"
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
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-primary text-[var(--light)] rounded-full"
              >
                Submit
              </button>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RecipeCard;
