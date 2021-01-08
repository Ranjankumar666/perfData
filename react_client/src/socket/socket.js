import io from "socket.io-client";

const socket = io("http://localhost:8181");

socket.on("connect", () => {
    console.log(socket)
})

socket.emit("ClientAuth", "8950033784");


export default socket;