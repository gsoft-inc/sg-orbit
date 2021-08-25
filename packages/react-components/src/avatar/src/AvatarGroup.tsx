import { AvatarText } from "./Avatar";
import { Box } from "../../box";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { Group } from "../../group";
import { InternalProps, augmentElement, cssModule, isNil, mergeClasses, mergeProps, normalizeSize } from "../../shared";
import { Tooltip, TooltipTrigger } from "../../tooltip";

const DefaultElement = "div";

export interface InnerAvatarGroupProps extends InternalProps, ComponentProps<typeof DefaultElement>{
    /**
     * The avatars of the group can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    /**
     * React children.
     */
    children: ReactNode;
}

interface RemainingAvatarsProps {
    avatars: ReactElement[];
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

function RemainingAvatars({ avatars, size, ...rest }: RemainingAvatarsProps) {
    return (
        <TooltipTrigger>
            <Box
                {...mergeProps(
                    rest,
                    {
                        className: mergeClasses(
                            "o-ui-avatar-group-remainings",
                            cssModule(
                                "o-ui-avatar",
                                normalizeSize(size)
                            )
                        )
                    } as const
                )}
            >
                <AvatarText size={size}>
                    {`+${avatars.length}`}
                </AvatarText>
            </Box>
            <Tooltip>
                <ul className="o-ui-avatar-group-remainings-list">
                    {avatars.filter((x: ReactElement) => !isNil(x?.props?.name)).map((x: ReactElement) => {
                        const name = x?.props?.name;

                        return (
                            <li className="o-ui-avatar-group-remainings-list-item" key={name}>
                                {augmentElement(x, {
                                    size: "sm",
                                    className: "o-ui-avatar-group-remainings-list-item-avatar"
                                })}
                                <span>{name}</span>
                            </li>
                        );
                    })}
                </ul>
            </Tooltip>
        </TooltipTrigger>
    );
}

const AvailableSlots = 4;

export function InnerAvatarGroup({
    size,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerAvatarGroupProps) {
    const avatars = Children.toArray(children);

    const isExceeding = avatars.length > AvailableSlots;

    const shownAvatars = isExceeding ? avatars.slice(0, AvailableSlots - 1) : avatars;
    const remainingAvatars = isExceeding ? avatars.slice(AvailableSlots - 1) : null;

    const avatarsMarkup = shownAvatars.map((x: ReactElement) => {
        const name = x?.props?.name;

        return (
            <TooltipTrigger key={name}>
                {augmentElement(x, {
                    size
                })}
                <Tooltip>{name}</Tooltip>
            </TooltipTrigger>
        );
    });

    const remainingAvatarsMarkup = remainingAvatars && (
        <RemainingAvatars
            avatars={remainingAvatars as ReactElement[]}
            size={size}
        />
    );

    return (
        <Group
            {...mergeProps(
                rest,
                {
                    gap: 1,
                    className: "o-ui-avatar-group",
                    as,
                    ref: forwardedRef
                } as const
            )}
        >
            {avatarsMarkup}
            {remainingAvatarsMarkup}
        </Group>
    );
}

export const AvatarGroup = forwardRef<any, Omit<InnerAvatarGroupProps, "forwardedRef">>((props, ref) => (
    <InnerAvatarGroup {...props} forwardedRef={ref} />
));

export type AvatarGroupProps = ComponentProps<typeof AvatarGroup>;

AvatarGroup.displayName = "AvatarGroup";
