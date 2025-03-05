import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useRecipeStore } from "../store/useRecipeStore.js";

const RecipeCard = ({ recipe }) => {
  const { authUser } = useAuthStore();
  const { deleteById, update } = useRecipeStore();

  const [isModalOpen, setIsModalOpen] = useState(null); // Track which modal is open
  const [formData, setFormData] = useState({
    name: recipe.name || "",
    description: recipe.description || "",
    preparation_time: recipe.preparation_time || "",
    cooking_time: recipe.cooking_time || "",
    type: recipe.type || "",
    image: recipe.image || "",
  });

  useEffect(() => {
    setFormData({
      name: recipe.name || "",
      description: recipe.description || "",
      preparation_time: recipe.preparation_time || "",
      cooking_time: recipe.cooking_time || "",
      type: recipe.type || "",
      image: recipe.image || "",
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

  // const handleIngredientChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedIngredients = [...formData.ingredients];
  //   updatedIngredients[index] = {
  //     ...updatedIngredients[index],
  //     [name]: value,
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     ingredients: updatedIngredients,
  //   }));
  // };

  return (
    <div className="card bg-base-100 w-96 shadow-sm h-96">
      <figure>
        <img
          src={
            recipe.image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.description}</p>
        <div className="card-actions justify-end">
          {authUser.id === recipe.user_id && (
            <button
              className="btn bg-info text-[var(--dark)]"
              onClick={() => setIsModalOpen("update")}
            >
              Update
            </button>
          )}
          {authUser.id === recipe.user_id && (
            <button
              className="btn bg-error text-[var(--dark)]"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button
            className="btn bg-[var(--teal)]"
            onClick={() => setIsModalOpen("details")}
          >
            Details
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen === "details" && (
        <dialog id="my_modal_1" className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center gap-2">
              <h3 className="font-bold text-lg">{recipe.name}</h3>
              <div className="flex gap-2">
                <div className="badge badge-sm bg-[var(--blue)]">
                  Prep: {recipe.preparation_time}
                </div>
                <div className="badge badge-sm bg-[var(--teal)]">
                  Cook: {recipe.cooking_time}
                </div>
              </div>
            </div>
            {/* <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span className="text-xs text-[var(--gray)]">
                    {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul> */}
            {/* <h4>Steps</h4>
            <ul></ul> */}
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setIsModalOpen(null)} // Close the details modal
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
          <div className="modal-box bg-[var(--dark)]">
            <form
              onSubmit={handleUpdate}
              className="flex flex-col border-[var(--teal)] border-2 rounded-lg p-4 gap-4"
            >
              {/* Recipe Name */}
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

              {/* Preparation Time */}
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

              {/* Cooking Time */}
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

              {/* Type */}
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

              {/* Image */}
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

              {/* Ingredients
              <h3>Ingredients</h3>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    className="input input-bordered input-sm w-full"
                    type="text"
                    name="name"
                    placeholder="Ingredient name"
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
              ))} */}

              <button
                type="submit"
                className="btn bg-[var(--teal)] rounded-full"
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
