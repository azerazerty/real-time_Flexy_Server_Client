import { useState, useEffect } from "react";
// import "./App.css";
import { io } from "socket.io-client";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Chip, Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "MUI X", col2: "is awesome" },
  { id: 3, col1: "Material UI", col2: "is amazing" },
  { id: 4, col1: "MUI", col2: "" },
  { id: 5, col1: "Joy UI", col2: "is awesome" },
  { id: 6, col1: "MUI Base", col2: "is amazing" },
];
const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 150 },
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

function App() {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  const [message, setMessage] = useState<any>("");
  const [response, setResponse] = useState<any>("");

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect((): any => {
    // Connect to the Socket.io server
    const newSocket = io("http://localhost:3000"); // Replace with your server's address
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on("connect", onConnect);
    newSocket.on("reconnect", onConnect);
    newSocket.on("disconnect", onDisconnect);
    newSocket.on("error", onDisconnect);

    newSocket.on("response", (data) => {
      setResponse(data);
    });

    // Clean up the connection when the component unmounts
    return () => {
      newSocket.off("connect", onConnect);
      newSocket.off("reconnect", onConnect);
      newSocket.off("disconnect", onDisconnect);
      newSocket.off("error", onDisconnect);
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      // Emit a message event to the server
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Vite + React</h1>
        <div className="App">
          <h1>React and Socket.io Client</h1>
        </div>
        <span>Socket Status : </span>{" "}
        <Chip
          color={`${isConnected ? "success" : "error"}`}
          label={`${isConnected ? "Connected" : "Not Connected"}`}
          variant="outlined"
        />
        {response && <p>Server Response: {response}</p>}
        {/* 
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send Message</button> */}
        <Box
          component="form"
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            "& .MuiTextField-root": {
              m: 5,
              width: "50ch",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="message"
            label="Send Message"
            multiline
            maxRows={4}
            variant="filled"
          />
          <Fab onClick={sendMessage} color="primary" variant="extended">
            <NavigationIcon sx={{ mr: 1 }} />
            Send Message
          </Fab>
        </Box>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}

export default App;
