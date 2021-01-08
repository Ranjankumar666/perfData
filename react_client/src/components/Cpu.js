// get cpu load
// get cpu name

import React from "react";
import styles from "./styles.module.css";
import drawCircle from "../utils/canvasLoadAnimation";

const Cpu = (props) => {

    const canvas = React.useRef();

    return (
        <div className={styles.cpu}>
            <h2>CPU Usage</h2>
            <canvas ref={canvas}>
                {drawCircle(canvas.current, props.load, `${props.load} %`)}
            </canvas>
        </div>
    )
}

export default Cpu;