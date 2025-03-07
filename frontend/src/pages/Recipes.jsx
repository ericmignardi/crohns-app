import React, { useEffect } from "react";
import { useRecipeStore } from "../store/useRecipeStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";

const Recipes = () => {
  const { recipes, isRecipesLoading, read } = useRecipeStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    read();
  }, [read]);

  if (isRecipesLoading) return <div>Loading...</div>;

  return (
    <main className="container mx-auto p-4">
      {authUser ? (
        <>
          <div className="flex justify-end items-center">
            <Link to="/create">
              <button className="btn bg-[var(--teal)] mb-4 rounded-full">
                Create
              </button>
            </Link>
          </div>
        </>
      ) : null}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  );
};

export default Recipes;
