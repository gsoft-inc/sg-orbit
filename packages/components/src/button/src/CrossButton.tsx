import { AbstractIconButtonProps, IconButton, InnerIconButton } from "./IconButton";
import { ComponentProps, forwardRef } from "react";
import { CrossIcon } from "../../icons";
import { OmitInternalProps, slot } from "../../shared";

export type InnerCrossButtonProps = Omit<AbstractIconButtonProps<"button">, "fluid" | "loading" | "onChange" | "type" | "variant">;

export function InnerCrossButton({ forwardedRef, ...rest }: InnerCrossButtonProps) {
    return (
        <IconButton
            {...rest}
            ref={forwardedRef}
            variant="ghost"
        >
            <CrossIcon />
        </IconButton>
    );
}

InnerCrossButton.defaultElement = InnerIconButton.defaultElement;

export const CrossButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerCrossButtonProps>>((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
)));

export type CrossButtonProps = ComponentProps<typeof CrossButton>;
