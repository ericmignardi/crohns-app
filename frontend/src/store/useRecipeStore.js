import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useRecipeStore = create((set) => ({
  recipes: [],
  isRecipesLoading: false,
  create: async (formData) => {
    set({ isRecipesLoading: true });
    try {
      const response = await axiosInstance.post("/recipes", formData);
      set((state) => ({ recipes: [...state.recipes, response.data] }));
      toast.success("Successfully Created Recipe");
    } catch (error) {
      console.log("Error in create: ", error.message);
      toast.error("Error Creating Recipe");
    } finally {
      set({ isRecipesLoading: false });
    }
  },
  read: async () => {
    set({ isRecipesLoading: true });
    try {
      const response = await axiosInstance.get("/recipes");
      set({ recipes: response.data });
      toast.success("Successfully Read Recipes");
    } catch (error) {
      console.log("Error in read: ", error.message);
      toast.error("Error Reading Recipes");
    } finally {
      set({ isRecipesLoading: false });
    }
  },
  readById: async (id) => {
    set({ isRecipesLoading: true });
    try {
      const response = await axiosInstance.get(`/recipes/${id}`);
      set({ recipes: response.data });
      toast.success("Successfully Read Recipe");
    } catch (error) {
      console.log("Error in readById: ", error.message);
      toast.error("Error Reading Recipe");
    } finally {
      set({ isRecipesLoading: false });
    }
  },
  update: async (id, formData) => {
    set({ isRecipesLoading: true });
    try {
      const response = await axiosInstance.put(`/recipes/${id}`, formData);
      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === id ? response.data : recipe
        ),
      }));
      toast.success("Successfully Updated Recipe");
    } catch (error) {
      console.log("Error in update: ", error.message);
      toast.error("Error Updating Recipe");
    } finally {
      set({ isRecipesLoading: false });
    }
  },
  deleteById: async (id) => {
    set({ isRecipesLoading: true });
    try {
      await axiosInstance.delete(`/recipes/${id}`);
      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
      }));
      toast.success("Successfully Deleted Recipe");
    } catch (error) {
      console.log("Error in delete: ", error.message);
      toast.error("Error Deleting Recipe");
    } finally {
      set({ isRecipesLoading: false });
    }
  },
}));
