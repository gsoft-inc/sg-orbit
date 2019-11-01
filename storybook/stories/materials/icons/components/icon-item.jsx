import { IconHeader } from "./";
import { a, useSpring } from "react-spring";
import { isNil } from "lodash";
import { useRef, useState } from "react";
import styles from "./icon-item.module.css";

export function IconItem({ stdSize, iconName }) {
    const name = iconName.split(/(?=[A-Z])/)
        .filter(x => x !== "Icon")
        .join(" ")
        .toLowerCase();
    const Icon = stdSize;
    const iconElement = iconName;
    const textAreaRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const animCopy = useSpring({
        opacity: copySuccess ? 0 : 1,
        transform: copySuccess ? "translate3d(0,20px,0)" : "translate3d(0,0,0)"
    });

    function copyCodeToClipboard () {
        textAreaRef.current.select();
        document.execCommand("copy");
        setCopySuccess(true);
    }

    return (
        <div className={styles.iconItem}>
            <div className="pb3">{name}</div>
            <div className={styles.iconGrid}>
                <IconHeader />
                <div className="h7 w7 ba b--dotted justify-center items-center flex relative">
                    <div className="h6 w6 bg-cloud-100"></div>
                </div>
                <div className="ba b--dotted justify-center items-center flex relative hide-child">
                    <If condition={!isNil(stdSize)} >
                        <div className="absolute h7 w7"><Icon className="h7 w7" /></div>
                        <div className="bg-cloud-300 h7 w7 justify-center items-center pointer flex relative child pa1" onClick={copyCodeToClipboard}><a.span style={animCopy} className="white f7">copy</a.span></div>
                        <form className={styles.textarea}>
                            <textarea ref={textAreaRef}
                                value={iconElement}
                            />
                        </form>
                    </If>
                </div>
            </div>
        </div>
    );
}
