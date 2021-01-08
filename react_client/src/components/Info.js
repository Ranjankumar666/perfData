import React from "react";
import styles from "./styles.module.css";

const Info = (props) => {

    return (
        <div className={styles.info}>
            <h2>Other Info</h2>
            <div className={styles.infoCol}>
                {/* <h2>Computer Name & Type</h2> */}
                <div className="">
                    <p><span>Host Name: </span> {props.hostName}</p>
                    <p><span>OS: </span> {props.type}</p>
                    <p><span>Mac Address: </span>{props.mac}</p>
                </div>
            </div>
            <div className={styles.infoCol}>
                {/* <h2>Computer Session</h2> */}
                <div className="">
                    <p><span>Online: </span> {Math.floor(props.uptime/60)} min</p>
                </div>
            </div>
            <div className={styles.infoCol}>
                {/* <h2>CPU info</h2> */}
                <div className="">
                    <p><span>Name: </span> {props.cpuDetails[0].model}</p>
                    <p><span>Average Speed: </span> {
                        Math.floor(props.cpuDetails
                            .map((c) => c.speed)
                            .reduce((a, c) => a + c) / props.cpuCores)} Mhz</p>
                    <p><span>Cores: </span> {props.cpuCores}</p>
                </div>
            </div>
        </div>
    )
}

export default Info;