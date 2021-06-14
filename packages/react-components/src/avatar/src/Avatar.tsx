import "./Avatar.css";

import { AsyncImage } from "../../image";
import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { Text } from "../../text";
import { augmentElement, cssModule, forwardRef, isNil, mergeProps, normalizeSize, slot } from "../../shared";

export interface InnerAvatarProps {
    /**
     * The name of the person in the avatar.
     */
    name: string;
    /**
     * The url of the avatar image.
     */
    src?: string;
    /**
     * The allowed number of retry to load a remote avatar.
     */
    retryCount?: number;
    /**
     * An avatar can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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

function AvatarImage({
    name,
    src,
    retryCount,
    children
}: Partial<InnerAvatarProps>) {
    if (!isNil(children)) {
        // @ts-ignore
        return augmentElement(Children.only(children), {
            className: "o-ui-avatar-image",
            alt: name
        });
    }

    return (
        <AsyncImage
            src={src}
            alt={name}
            retryCount={retryCount}
        >
            <AvatarInitials name={name} />
        </AsyncImage>
    );
}

const InitialsColorsForName = [
    "#99B433",
    "#6BA5E7",
    "#E773BD",
    "#00A300",
    "#1E7145",
    "#FF0097",
    "#7E3878",
    "#603CBA",
    "#5E4B8B",
    "#00ABA9",
    "#2D89EF",
    "#2B5797",
    "#DA532C",
    "#B91D47"
];

function AvatarInitials({ name, size }: Partial<InnerAvatarProps>) {
    const initials = useMemo(() => {
        const cleanName = name.replace(/\s+/g, " ").trim();

        const [firstName, lastName] = cleanName.split(" ");

        return !isNil(firstName) && !isNil(lastName)
            ? `${firstName.charAt(0)}${lastName.charAt(0)}`
            : firstName.charAt(0);
    }, [name]);

    const color = useMemo(() => {
        let hashCode = 0;

        for (let i = name.length - 1; i >= 0; i--) {
            const character = name.charCodeAt(i);
            const shift = i % 8;

            hashCode ^= (character << shift) + (character >> (8 - shift));
        }

        return InitialsColorsForName[hashCode % InitialsColorsForName.length];
    }, [name]);

    return (
        <Text
            size={size}
            className="o-ui-avatar-initials"
            style={{
                backgroundColor: color
            }}
            role="img"
            aria-label={name}
            as="span"
        >
            {initials}
        </Text>
    );
}

export function InnerAvatar({
    name,
    src,
    retryCount,
    size,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerAvatarProps) {
    const content = !isNil(src) || !isNil(children)
        ? (
            <AvatarImage
                name={name}
                src={src}
                retryCount={retryCount}
            >
                {children}
            </AvatarImage>
        ) : (
            <AvatarInitials
                name={name}
                size={size}
            />
        );

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
            {content}
        </Box>
    );
}

export const Avatar = slot("avatar", forwardRef<InnerAvatarProps>((props, ref) => (
    <InnerAvatar {...props} forwardedRef={ref} />
)));

export type AvatarProps = ComponentProps<typeof Avatar>;

Avatar.displayName = "Avatar";

