import { embedIconButton } from "../../button";
import { Spinner } from "../../spinner";
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

export function useInputSpinner(loading: boolean) {
    return loading && <Spinner className="o-ui-input-spinner" role="presentation" size="md" />;
}
