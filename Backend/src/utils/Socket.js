import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io'; 

// ----------------------------------------------------
// The Address Book: Maps logged-in UserID to their unique SocketID
const userSocketMap = {}; 

// Helper function to find the receiver's live connection
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
// ----------------------------------------------------

// This function takes your Express app and wraps it to start the server
export const initializeSocket = (app) => {
    
    const httpServer = createServer(app);
    
    // Attach Socket.io to the server instance
    const io = new SocketIOServer(httpServer, { 
        cors: {
            // MUST match the URL of your React frontend
            origin: "http://localhost:5173", 
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    // ----------------------------------------------------
    // 🚀 CONNECTION HANDLING LOGIC
    // ----------------------------------------------------
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        const userId = socket.handshake.query.userId;
        
        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        // Broadcast the list of all currently online user IDs
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            
            if (userId) {
                delete userSocketMap[userId];
            }

            // Update the online user list for everyone
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    // We export the io instance separately for use in controllers
    global.io = io; // We use a global variable to make 'io' accessible everywhere
    
    return httpServer;
};