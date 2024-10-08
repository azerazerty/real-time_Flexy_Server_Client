import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";
const URL = "http://localhost:3000";

const socket = io(URL, {
  autoConnect: false,
});

export default socket;
