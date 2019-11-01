import { IconHeader } from "./";
import { a, useSpring } from "react-spring";
import { isNil } from "lodash";
import { useRef, useState } from "react";
import styles from "./icon-item.module.css";

function getNames(component) {
    if (isNil(component) || isNil(component.type)) {
        return null;
    }

    const componentName = component.type.name;
    const iconName = componentName
        .split(/(?=[A-Z])/)
        .filter(x => x !== "Icon")
        .join(" ")
        .toLowerCase();

    return { name: iconName, iconName: componentName };
}

export function IconItem({ stdSize }) {
    const { name, iconName } = getNames();
    const iconElement = iconName;
    const textAreaRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState("");

    const animation = useSpring({
        opacity: copySuccess ? 0 : 1
    });

    function copyCodeToClipboard () {
        textAreaRef.current.select();
        document.execCommand("copy");
        setCopySuccess("Copied!");
    }

    const Icon = stdSize;

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
                        <a.span styles={animation}>tsra</a.span>
                        <div className="bg-cloud-300 h7 w7 justify-center items-center pointer flex relative child pa1" onClick={copyCodeToClipboard}><span className="white f7">copy</span></div>
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
