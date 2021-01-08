const express = require("express");
const net = require("net");
const cluster = require("cluster");
const farmhash = require("farmhash");
const os = require("os");
const socketio = require("socket.io");
const socketMain = require("./socketMain");
const redisAdapter = require("socket.io-redis");

const num_processors = os.cpus().length;
const port = 8181;


if (cluster.isMaster) {
    let workers = [];

    const spawn = (index) => {
        workers[index] = cluster.fork();

        workers[index].on("exit", () => {
            spawn(index);
        })
    }

    for (let i = 0; i < num_processors; i++) {
        spawn(i);
    }
    // pauseOnConnect: true pause the data processing from client until a worker
    // has been assigned by the Master core
    const server = net.createServer({ pauseOnConnect: true }, (connection) => {
        // Always assigning the same worker based on the clients' ipAddress
        const ipAddress = connection.address().address;
        const workerIndex = farmhash.fingerprint32(ipAddress) % num_processors;

        const worker = workers[workerIndex];
        worker.send("Master_Connection", connection);

    });
    server.listen(port, () => {
        console.log("TCP Master Node started");
    });

} else {
    const app = express();

    const server = app.listen(0, "localhost");
    const io = socketio(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true
        }
    });

    io.adapter(redisAdapter({
        host: "localhost",
        port: 6379
    }))

    io.on("connection", (socket) => {
        socketMain(io, socket);
        console.log(`Connnected to worker: ${cluster.worker.id}`)
    })

    process.on("message", (message, connection) => {
        if (message !== 'Master_Connection') {
            return;
        }

        server.emit("connection", connection);
        // Resume data Processing from client , was paused in line 31
        connection.resume();
    })
}