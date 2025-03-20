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

  if (isRecipesLoading) return <div>Loading recipes...</div>;

  return (
    <main className="container mx-auto p-4 flex flex-col justify-center items-center gap-4 min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
      {authUser && (
        <div className="flex justify-center items-center">
          <Link to="/create">
            <button className="btn btn-primary text-[var(--light)] mb-4 rounded-full">
              Create
            </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Recipes;
