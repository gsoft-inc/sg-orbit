import { createPortal } from "react-dom";

export function AbsoluteRedBox({ style, ...rest }) {
    const styles = {
        ...style,
        position: "absolute",
        top: "25%",
        left: "25%"
    };

    return createPortal(
        <div className="w7 h7 bg-red" style={styles} {...rest}></div>,
        window.document.body
    );
}
