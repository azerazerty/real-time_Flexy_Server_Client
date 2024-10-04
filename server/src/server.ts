import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

// Allow CORS for all origins
const corsOptions = {
  origin: "*", // Allows any origin
  methods: ["GET", "POST"],
  credentials: false, // Disable credentials since all origins are allowed
};

// Apply CORS middleware to Express
app.use(cors(corsOptions));

// Initialize Socket.io with unrestricted CORS settings
const io = new Server(httpServer, {
  cors: corsOptions,
});

// Middleware for serving static files (if any)
app.use(express.static("public"));

// Define a simple route
app.get("/", (req, res) => {
  res.send("<h1>Hello Socket.io with TypeScript and unrestricted CORS!</h1>");
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for a custom event from the client
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Emit an event back to the client
    socket.emit("response", "Message received successfully!");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
