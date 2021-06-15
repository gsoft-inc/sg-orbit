import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { Group } from "../../group";
import { Text } from "../../text";
import { augmentElement, cssModule, forwardRef, mergeProps, normalizeSize } from "../../shared";

export interface InnerAvatarGroupProps {
    /**
     * The avatars of the group can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

interface RemainingAvatarsProps {
    count: number;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

function RemainingAvatars({ count, size, ...rest }: RemainingAvatarsProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-remaining-avatars",
                        normalizeSize(size)
                    )
                }
            )}
        >
            <Text size={size}>
                {`+${count}`}
            </Text>
        </Box>
    );
}

const AvailableSlots = 4;

export function InnerAvatarGroup({
    size,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerAvatarGroupProps) {
    const avatars = Children.toArray(children);

    const isExceeding = avatars.length > AvailableSlots;

    const shownAvatars = isExceeding ? avatars.slice(0, AvailableSlots - 1) : avatars;
    const remainingAvatars = isExceeding ? avatars.slice(AvailableSlots - 1) : null;

    const avatarsMarkup = shownAvatars.map((x: ReactElement) => {
        return augmentElement(x, {
            size
        });
    });

    const remainingAvatarsMarkup = remainingAvatars && (
        <RemainingAvatars
            count={remainingAvatars.length}
            size={size}
        />
    );

    return (
        <Group
            {...mergeProps<any>(
                rest,
                {
                    gap: 1,
                    className: "o-ui-avatar-group",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {avatarsMarkup}
            {remainingAvatarsMarkup}
        </Group>
    );
}

export const AvatarGroup = forwardRef<InnerAvatarGroupProps>((props, ref) => (
    <InnerAvatarGroup {...props} forwardedRef={ref} />
));

export type AvatarGroupProps = ComponentProps<typeof AvatarGroup>;

AvatarGroup.displayName = "AvatarGroup";
