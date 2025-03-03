import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLogginIn: false,
  isVerifyingAuth: true,
  register: async (formData) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      set({ authUser: response.data });
      toast.success("Successfully Registered User");
    } catch (error) {
      console.log("Error in register: ", error.message);
      toast.error("Unable To Register");
    } finally {
      set({ isRegistering: false });
    }
  },
  login: async (formData) => {
    set({ isLogginIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      set({ authUser: response.data });
      toast.success("Successfully Logged In");
    } catch (error) {
      console.log("Error in login: ", error.message);
      toast.error("Unable To Login");
    } finally {
      set({ isLogginIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Successfully Logged Out");
    } catch (error) {
      console.log("Error in logout: ", error.message);
      toast.error("Unable To Logout");
    }
  },
  verify: async () => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      set({ authUser: response.data });
      toast.success("Successfully Verified Auth");
    } catch (error) {
      set({ authUser: null });
      console.log("Error in verify: ", error.message);
      toast.error("Unable To Verify Auth");
    } finally {
      set({ isVerifyingAuth: false });
    }
  },
}));
