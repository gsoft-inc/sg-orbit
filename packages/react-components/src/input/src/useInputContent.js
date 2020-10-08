import { EmbeddedCrossButton } from "../../button";
import { EmbeddedIcon } from "../../icons";

export function useInputIcon(icon, props) {
    return icon && (
        <EmbeddedIcon
            {...props}
            className="o-ui-input-icon"
        >
            {icon}
        </EmbeddedIcon>
    );
}

export function useInputClearButton(isVisible, props) {
    return isVisible && (
        <EmbeddedCrossButton
            {...props}
            className="o-ui-input-clear-button"
            aria-label="Clear"
        />
    );
}


