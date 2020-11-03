import { EmbeddedIcon } from "../../icons";
import { embedIconButton } from "../../button";

export function useInputIcon(icon, props = {}) {
    return icon && (
        <EmbeddedIcon
            {...props}
            className="o-ui-input-icon"
        >
            {icon}
        </EmbeddedIcon>
    );
}

export function useInputButton(button, isActive, props = {}) {
    return button && isActive && embedIconButton(button, {
        ...props,
        variant: "ghost",
        shape: "circular",
        condensed: true,
        className: "o-ui-input-button"
    });
}


