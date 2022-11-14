import { EmbeddedIcon, EmbeddedIconProps } from "../../icons";
import { ReactElement, ReactNode } from "react";
import { embedIconButton } from "../../button";
import { Spinner } from "../../spinner";

type UseInputIconProps = Omit<EmbeddedIconProps, "className" | "children">;

export function useInputIcon(icon: ReactNode, props: UseInputIconProps = {}) {
    return icon && (
        <EmbeddedIcon
            {...props}
            className="o-ui-input-icon"
        >
            {icon}
        </EmbeddedIcon>
    );
}

export function useInputButton(button: ReactElement, isActive: boolean, props: Record<string, any> = {}) {
    return button && isActive && embedIconButton(button, {
        ...props,
        className: "o-ui-input-button",
        condensed: true,
        variant: "tertiary"
    });
}

export function useInputSpinner(loading: boolean) {
    return loading && <Spinner className="o-ui-input-spinner" role="presentation" size="md" />;
}
