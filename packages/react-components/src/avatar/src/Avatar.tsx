import "./Avatar.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { cssModule, forwardRef, isNil, mergeProps, normalizeSize, slot } from "../../shared";

interface InnerAvatarProps {
    /**
     * The name of the person in the avatar.
     */
    name?: string;
    /**
     * The url of the avatar image.
     */
    src: string;
    /**
     * An avatar can vary in size.
     */
    size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children?: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

function getInitials(name: string) {
    const cleanName = name.replace(/\s+/g, " ").trim();

    const [firstName, lastName] = cleanName.split(" ");

    return !isNil(firstName) && !isNil(lastName)
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`
        : firstName.charAt(0);
}

export function InnerAvatar({
    name,
    src,
    size,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerAvatarProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-avatar",
                        normalizeSize(size)
                    ),
                    title: name,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Avatar = slot("avatar", forwardRef<InnerAvatarProps>((props, ref) => (
    <InnerAvatar {...props} forwardedRef={ref} />
)));

export type AvatarProps = ComponentProps<typeof Avatar>;

Avatar.displayName = "Avatar";

