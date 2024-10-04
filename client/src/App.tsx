import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<any>("");
  const [response, setResponse] = useState<any>("");

  useEffect((): any => {
    // Connect to the Socket.io server
    const newSocket = io("http://localhost:3000"); // Replace with your server's address
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on("response", (data) => {
      setResponse(data);
    });

    // Clean up the connection when the component unmounts
    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket) {
      // Emit a message event to the server
      socket.emit("message", message);
    }
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="App">
        <h1>React and Socket.io Client</h1>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send Message</button>

        {response && <p>Server Response: {response}</p>}
      </div>
    </>
  );
}

export default App;
