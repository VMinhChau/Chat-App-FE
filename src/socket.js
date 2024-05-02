import io from "socket.io-client";

let ws;

const connectSocket = (chat_id, user_id) => {
  // socket = new WebSocket("ws://127.0.0.1:8000/api/v1/websocket/");
  // socket = io({
  //     // transports: ["websocket"],
  //     path: "http://localhost:8000/api/v1/chat/"
  //    });
  ws = new WebSocket(`ws://localhost:8000/api/v1/websocket/privatechat/${chat_id}/${user_id}`);
}

export { ws, connectSocket };
