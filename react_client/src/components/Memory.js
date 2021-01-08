import React from "react";
import styles from "./styles.module.css";
import drawCircle from "../utils/canvasLoadAnimation";

const Memory = (props) => {

    const canvas = React.useRef();

    return (
        <div className={styles.memory}>
            <h2>Memory Usage</h2>
            <canvas ref={canvas}>
                {drawCircle(canvas.current, props.memory, `${props.memory} GB`, -25)}
            </canvas>
            
            <div className={styles.memoryDetails}>
                <p><span>Free Memory:</span> {props.freeMem}</p>
                <p><span>Used Memory:</span> {props.memory}</p>
                <p><span>Total Memory:</span> {props.totalMem}</p>
            </div>
        </div>
    )
}

export default Memory;