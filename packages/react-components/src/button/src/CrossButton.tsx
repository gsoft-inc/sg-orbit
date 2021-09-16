import { AbstractIconButtonProps, IconButton } from "./IconButton";
import { ComponentProps, forwardRef } from "react";
import { CrossIcon } from "../../icons";
import { OmitInternalProps, slot } from "../../shared";

export type InnerCrossButtonProps = Omit<AbstractIconButtonProps<"button">, "fluid" | "loading" | "onChange" | "shape" | "type" | "variant">;

export function InnerCrossButton({ forwardedRef, ...rest }: InnerCrossButtonProps) {
    return (
        <IconButton
            {...rest}
            ref={forwardedRef}
            shape="circular"
            variant="ghost"
        >
            <CrossIcon />
        </IconButton>
    );
}

export const CrossButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerCrossButtonProps>>((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
)));

export type CrossButtonProps = ComponentProps<typeof CrossButton>;
