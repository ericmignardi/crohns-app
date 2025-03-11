import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isRegistering: false,
  isLogginIn: false,
  isVerifyingAuth: true,
  isUpdatingProfile: false,
  socket: null,
  onlineUsers: [],
  register: async (formData) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      set({ authUser: response.data });
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
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
      get().connectSocket();
      toast.success("Successfully Verified Auth");
    } catch (error) {
      set({ authUser: null });
      console.log("Error in verify: ", error.message);
      toast.error("Unable To Verify Auth");
    } finally {
      set({ isVerifyingAuth: false });
    }
  },
  update: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update", formData);
      set({ authUser: response.data });
      toast.success("Successfully Updated Profile");
    } catch (error) {
      console.log("Error in update: ", error.message);
      toast.error("Unable To Update Profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
