import { useEffect, useRef } from 'react';
import { useStore } from './Zustand';
import io from 'socket.io-client';

const BASE_URL = "http://localhost:5000";

export const useSocket = () => {
  const { currentUser, setSocket, setOnlineUsers, addMessage } = useStore();
  const socketRef = useRef(null);

  useEffect(() => {
    if (currentUser && !socketRef.current) {
      
      const newSocket = io(BASE_URL, {
        query: { userId: currentUser._id },
        withCredentials: true,
      });

      socketRef.current = newSocket;
      setSocket(newSocket); // stored non-reactively

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("newMessage", (msg) => {
        addMessage(msg); // UI updates instantly
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, [currentUser]);
};
