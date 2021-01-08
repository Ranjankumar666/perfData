const os = require("os");
const io = require("socket.io-client");

const socket = io("http://localhost:8181");

socket.on("connect", async () => {
    console.log("Connection Made with the server");
    const netInterface = os.networkInterfaces();
    // console.log(netInterface);
    let macAddress;

    for (const key in netInterface) {
        if (!netInterface[key][0].internal === false) {
            macAddress = netInterface[key][0].mac;

            if(macAddress === "00:00:00:00:00:00"){
                macAddress = Math.random().toString(36).substr(2, 15)
            }

            break;
        }
    }


    socket.emit("ClientAuth", "536849092");

    const initial = async () => {
        const data = await performanceData();
        data.mac = macAddress;
        data.hostname = os.hostname();
        socket.emit("InitialPerfData", data);
    }

    initial();

    const perfInterval = setInterval(async () => {
        const data = await performanceData();
        data.mac = macAddress;
        
        socket.emit("PerfData", data);
    }, 1000)

    socket.on("disconnect", () => {
        clearInterval(perfInterval);
    })
})


async function performanceData() {
    return new Promise(async (res, rej) => {
        const type = os.type();
        const uptime = os.uptime();
        // const load = os.loadavg();
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;
        const cpuDetails = os.cpus();
        const cpuCores = cpuDetails.length;
        const cpuLoad = await getCpuLoad();
        const hostName = os.hostname();

        return res({
            type, uptime, usedMem, freeMem, totalMem, cpuDetails, cpuLoad, cpuCores,
            hostName
        })
    })

}


function cpuAverage(cpus = os.cpus()) {
    const totalCPUS = cpus.length;
    let idleTime = 0;
    let totalTime = 0;

    cpus.forEach((cpu) => {
        totalTime += Object.values(cpu.times).reduce((a, v) => a + v);
        idleTime += cpu.times.idle;
    })

    return { total: totalTime / totalCPUS, idle: idleTime / totalCPUS };
}

function getCpuLoad() {

    return new Promise(async (res, rej) => {
        const start = cpuAverage();
        const result = new Promise((res, rej) => {
            setTimeout(() => {
                const end = cpuAverage();
                const idleDiff = end.idle - start.idle;
                const totalDiff = end.total - start.total;
                res(100 - Math.floor(100 * idleDiff / totalDiff))
            }, 100);
        })

        return res(result);
    })

}

module.exports = performanceData;

