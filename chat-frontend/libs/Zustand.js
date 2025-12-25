import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import api from "./Axios";
import { encryptMessage, decryptMessage } from "./crypto";

const BUBBLETHEME = [
  { name: "Default", primary: "bg-blue-600", text: "text-white" },
  { name: "Teal", primary: "bg-teal-500", text: "text-white" },
  { name: "Red", primary: "bg-red-600", text: "text-white" },
  { name: "White", primary: "bg-white", text: "text-black" },
  { name: "Pink", primary: "bg-pink-500", text: "text-white" },
];

export const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        isMessageTabOpen: false,
        registeredUsers: [],
        currentUser: null,
        isLogin: false,
        loading: false,
        error: null,
        isMessagesLoading: false,
        selectedUser: null,
        messages: [],
        isAuthLoading: false,
        socket: null,
        onlineUsers: [],
        isLogout: false,
        green:"#1A5D1A",
        peach:"#FAE392",

        bubbleTheme: BUBBLETHEME[0],
        availableThemes: BUBBLETHEME,

        setBubbleTheme: (themeName) => {
          const theme = BUBBLETHEME.find((t) => t.name === themeName);
          if (theme) {
            set({ bubbleTheme: theme });
          }
        },

        setIsMessageTabOpen: (val) => {
          set({ isMessageTabOpen: val });
        },

        // store socket without re-render
        setSocket: (socket) => {
          useStore.setState({ socket }, false);
        },

        setOnlineUsers: (users) => set({ onlineUsers: users }),

        addMessage: (newMessage) => {
          const { messages } = get();
          set({ messages: [...messages, newMessage] });
        },

        logout: async () => {
          const { socket } = get();
          if (socket) socket.close();

          set({
            currentUser: null,
            isLogin: false,
            socket: null,
            onlineUsers: [],
            registeredUsers: [],
            messages: [],
            selectedUser: null,
          });

          await api.post("/user/logout");
          set({ isLogout: true });
        },

        checkAuthStatus: async () => {
          set({ isAuthLoading: true });

          try {
            const res = await api.get("/user/me");

            if (res.data) {
              const userData = res.data;
              const userId = userData._id || userData.id;

              if (!userId) throw new Error("Invalid user data received.");

              set({
                currentUser: { ...userData, _id: userId },
                isLogin: true,
                isAuthLoading: false,
              });
            }
          } catch (error) {
            set({ currentUser: null, isLogin: false, isAuthLoading: false });
          }
             finally {
            // 🚨 CRITICAL FIX: This code runs regardless of success or failure.
            // It ensures the spinner is always turned OFF.
            set({ isAuthLoading: false }); 
        }
        },

        setSelectedUser: (user) => set({ selectedUser: user }),

        sendMessages: async (messageData) => {
          const { messages, selectedUser } = get();

          try {
            const encryptedMessage = encryptMessage(messageData.message);

            const payload = {
              receiverId: selectedUser._id,
              message: encryptedMessage,
            };

            const res = await api.post("/messages/sendMessages", payload);

            set({ messages: [...messages, res.data.data] });
          } catch (error) {
            console.log("Error sending message:", error);
          }
        },

        fetchMessages: async () => {
          const { selectedUser } = get();
          if (!selectedUser) return;

          set({ isMessagesLoading: true });

          try {
            const res = await api.get(
              `/messages/getMessages/${selectedUser._id}`
            );

            set({ messages: res.data, isMessagesLoading: false });
          } catch (error) {
            console.log("Error fetching messages:", error);
            set({ isMessagesLoading: false });
          }
        },

        fetchUsers: async () => {
          set({ loading: true, error: null });

          try {
            const res = await api.get("/user/users");
            set({ registeredUsers: res.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
        },

        setCurrentUser: (user) => set({ currentUser: user }),
        setLogin: (status) => set({ isLogin: status }),
      }),

      {
        name: "chat-storage",

        // Only persist bubbleTheme (not sensitive data)
        partialize: (state) => ({
          theme:state.theme,
          bubbleTheme: state.bubbleTheme,
        }),
      }
    )
  )
);
