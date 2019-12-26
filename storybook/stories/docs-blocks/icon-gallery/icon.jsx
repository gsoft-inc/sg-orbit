import styles from "./icon.module.css";

import { CheckmarkIcon } from "./assets";
import { a, useTransition } from "react-spring";
import { isNil } from "lodash";
import { useEffect, useRef, useState } from "react";

function renderIconComponent(Component, cssClasses) {
    const classes = isNil(cssClasses) ? "sbdocs sbdocs-ig-icon" : `${cssClasses} sbdocs sbdocs-ig-icon`;

    return <Component className={classes} />;
}

export function Icon({ name, icon, cssClasses, getCopyValue }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const textAreaRef = useRef(null);
    const copyValue = getCopyValue(name, icon);

    useEffect(() => {
        let timeoutId = null;

        if (copySuccess) {
            timeoutId = setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        }

        return () => clearTimeout(timeoutId);
    }, [copySuccess]);

    const copyAnimation = useTransition(copySuccess, null, {
        from: {
            opacity: 0,
            transform: "translate3d(0,-20px,0)"
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0,0px,0)"
        },
        leave: {
            opacity: 0,
            transform: "translate3d(0,0px,0)"
        }
    });

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand("copy");

        setCopySuccess(true);
    };

    return (
        <div className={`${styles.iconPlaceholder} sbdocs sbdocs-ig-icon-placeholder`}>
            <div className={`${styles.iconContainer} sbdocs sbdocs-ig-icon-container`}>
                {renderIconComponent(icon, cssClasses)}
            </div>
            <div className={`${styles.copyContainer} sbdocs sbdocs-ig-copy-container`} onClick={copyToClipboard}>
                {copyAnimation.map(({ item, props, key }) => {
                    if (item) {
                        return (
                            <a.div style={props} className={`${styles.copySucceeded} sbdocs sbdocs-ig-copy-succeeded`} key={key}>
                                <CheckmarkIcon className={`${styles.copyCheckmark} sbdocs sbdocs-ig-copy-checkmark`} />
                            </a.div>
                        );
                    }

                    return <a.div style={props} className={`${styles.copyAction} sbdocs sbdocs-ig-copy-action`} key={key}>Copy</a.div>;
                })}
            </div>
            <form className={styles.textarea}>
                <textarea
                    readOnly
                    ref={textAreaRef}
                    value={copyValue}
                />
            </form>
        </div>
    );
}

Icon.defaultProps = {
    getCopyValue: (name, icon) => {
        console.log(icon);

        return icon.displayName || icon.name || name;
    }
};
