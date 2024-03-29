import io from "socket.io-client"; // Add this

let socket;

// const connectSocket = (user_id) => {
//   socket = io("http://locahost:3001", {
//     query: `user_id=${user_id}`,
//   });
// } // Add this -- our server will run on port 4000, so we connect to it from here
// console.log(connectSocket);

// export {socket, connectSocket};
