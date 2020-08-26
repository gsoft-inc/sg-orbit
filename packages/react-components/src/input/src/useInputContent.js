import { EmbeddedIcon } from "../../icons";
import { embedButton } from "../../button";

export function useInputIcon(icon, props) {
    return icon && (
        <EmbeddedIcon {...props} className="input-icon">{icon}</EmbeddedIcon>
    );
}

export function useInputButton(button, props) {
    return button && embedButton(button, {
        ...props,
        variant: "ghost",
        color: "secondary",
        shape: "circular",
        className: "button"
    });
}


