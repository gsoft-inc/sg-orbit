import { embedIconButton } from "../../button";
import { CreatedIconProps } from "../../icons";
import { ReactElement } from "react";
import { augmentElement } from "../../shared";

type UseInputIconProps = Omit<CreatedIconProps, "className" | "children">;

export function useInputIcon(icon: ReactElement, props: UseInputIconProps = {}) {
    return icon && augmentElement(icon, {
        className: "o-ui-input-icon",
        ...props
    });
}

export function useInputButton(button: ReactElement, isActive: boolean, props: Record<string, any> = {}) {
    return button && isActive && embedIconButton(button, {
        ...props,
        className: "o-ui-input-button",
        variant: "tertiary"
    });
}
