import React from "react";
import Cpu from "./Cpu";
import Memory from "./Memory";
import Info from "./Info";
import styles from "./Widget.module.css";

const Widget = (props) => {
    // type, uptime, usedMem, freeMem, totalMem, cpuDetails, cpuLoad, cpuCores

    const toGB = (data) => (data / Math.pow(2, 30)).toFixed(2)

    let details = <h2>No data yet!</h2>;

    if (props) {
        details = (
            <div className={styles.widget}>
                <Cpu load={props.cpuLoad} />

                <Memory memory={toGB(props.usedMem)}
                    freeMem={toGB(props.freeMem)}
                    totalMem={toGB(props.totalMem)} />

                <Info {...props} />
            </div >)
    }
    return details;
}

export default Widget;