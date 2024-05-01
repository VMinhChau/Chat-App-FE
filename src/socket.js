import io from "socket.io-client"; // Add this

let socket;

const connectSocket = () => {
  // socket = new WebSocket("ws://127.0.0.1:8000/api/v1/websocket/");
  // socket = io({
  //     // transports: ["websocket"],
  //     path: "http://localhost:8000/api/v1/chat/"
  //    });
  // const ws = new WebSocket(`ws://localhost:8000/api/v1/websocket${chatId}/${userId}`);
  // ws.addEventListener("open", event => {
  //   ws.send("Connection established")
  //   console.log("Connected established");
  // });
}

export { socket, connectSocket };
