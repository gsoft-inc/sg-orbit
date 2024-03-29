import { Badge, BadgeProps } from "@components/badge";
import { Div } from "@components/html";
import { EmailMajorIcon } from "@components/icons";
import { PropsWithChildren } from "react";

type BadgeUtilsProps = PropsWithChildren<Omit<BadgeProps, "children">>;

export function SquareBadge({ children, ...rest }: BadgeUtilsProps) {
    return (
        <Badge {...rest}>
            {children}
            <Div backgroundColor="alias-accent-light" width={6} height={6} />
        </Badge>
    );
}

export function CircleBadge({ children, ...rest }: BadgeUtilsProps) {
    return (
        <Badge
            {...rest}
            overlap="circle"
        >
            {children}
            <Div backgroundColor="alias-accent-light" borderRadius="100px" width={6} height={6} />
        </Badge>
    );
}

export function IconBadge({ children, ...rest }: BadgeUtilsProps) {
    return (
        <Badge
            {...rest}
            overlap="icon"
        >
            {children}
            <EmailMajorIcon />
        </Badge>
    );
}

export function TextBadge({ children, ...rest }: BadgeUtilsProps) {
    return (
        <Badge {...rest}>
            {children}
            Notifications
        </Badge>
    );
}
