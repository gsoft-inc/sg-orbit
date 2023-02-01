import { Badge, BadgeProps } from "@components/badge";
import { Div } from "@components/html";
import { EmailIcon } from "@components/icons";
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
            <Div backgroundColor="alias-accent-light" borderRadius="var(--o-ui-br-circular)" width={6} height={6} />
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
            <EmailIcon size="lg" />
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
