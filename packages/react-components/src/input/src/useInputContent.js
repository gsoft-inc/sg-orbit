import { EmbeddedIcon } from "../../icons";
import { embedButton } from "../../button";

export function useInputIcon(icon, size) {
    return icon && (
        <EmbeddedIcon size={size} className="input-icon">{icon}</EmbeddedIcon>
    );
}

export function useInputButton(button, size) {
    return button && embedButton(button, {
        size,
        variant: "ghost",
        color: "secondary",
        shape: "circular",
        className: "button"
    });
}


