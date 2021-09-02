import { ComponentProps, forwardRef } from "react";
import { CrossIcon } from "../../icons";
import { IconButton, SharedIconButtonProps } from "./IconButton";
import { OmitInternalProps, slot } from "../../shared";

// TODO: remove Omit once the Button color prop have been removed.
export type InnerCrossButtonProps = Omit<SharedIconButtonProps, "color" | "fluid" | "loading" | "onChange" | "shape" | "type" | "variant">;

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
