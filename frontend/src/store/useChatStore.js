import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isCreatingMessage: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users/read");
      set({ users: response.data });
      toast.success("Successfully Read Users");
    } catch (error) {
      console.log("Error in getUsers: ", error.message);
      toast.error("Error Reading Users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (receiverId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${receiverId}`);
      set({ messages: response.data });
      toast.success("Successfully Read Messages");
    } catch (error) {
      console.log("Error in getMessages: ", error.message);
      toast.error("Error Reading Messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  createMessage: async (message) => {
    const { selectedUser, messages } = get();
    set({ isCreatingMessage: true });
    try {
      const response = await axiosInstance.post(
        `/messages/${selectedUser.id}`,
        message
      );
      set({ messages: [...messages, response.data] });
      toast.success("Successfully Created Message");
    } catch (error) {
      console.log("Error in createMessage: ", error.message);
      toast.error("Error Creating Message");
    } finally {
      set({ isCreatingMessage: false });
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser.id;
      if (!isMessageSentFromSelectedUser) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
