const Machine = require("./models/machineSchema");
const mongoose = require("mongoose");


const url = "mongodb+srv://Ranjan:za0mQByEWbepyC1M@cluster0.yj3i3.mongodb.net/perfData?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

}).catch(err => {
    console.log(err.message);
})


function socketMain(io, socket) {
    let macAddress;
    socket.on("ClientAuth", (key) => {

        if (key === "536849092") {
            socket.join("clients");

        } else if (key === '8950033784') {
            socket.join("ui");
            console.log("React client joined");
        } else {
            socket.disconnect();
        }
    })

    socket.on("InitialPerfData", (data) => {
        // console.log(data);
        macAddress = data.mac;
        Machine.findOne({ mac: data.mac })
            .then((machines) => {
                if (machines) {
                    console.log("present");
                    return;
                }


                const newMachine = new Machine({
                    ...data
                })
                return newMachine.save()
            })
            .catch((err) => {
                console.log(err.message)
            })

    })
    socket.on("PerfData", (data) => {
        // console.log(data);
        // Emit data to all ui clients
        // can use here:
        // socket.to() & io.to()
        io.to("ui").emit("PerfDataForUI", data)
    })
}

module.exports = socketMain;