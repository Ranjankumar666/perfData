const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
    mac: {
        required: true,
        type: String
    },
    type: String,
    uptime: Number,
    usedMem: Number,
    freeMem: Number,
    totalMem: Number,
    cpuDetails: Object,
    cpuLoad: String,
    cpuCores: Number
})

const clientModel = model("machine", clientSchema);

module.exports = clientModel;
