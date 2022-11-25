import { Badge } from "@components/badge";
import { Div } from "@components/html";
import { EmailIcon } from "@components/icons";

export function SquareBadge({ children, ...rest }) {
    return (
        <Badge {...rest}>
            {children}
            <Div backgroundColor="alias-accent-light" width={6} height={6} />
        </Badge>
    );
}

export function CircleBadge({ children, ...rest }) {
    return (
        <Badge
            {...rest}
            overlap="circle"
        >
            {children}
            <Div backgroundColor="alias-accent-light" borderRadius="circle" width={6} height={6} />
        </Badge>
    );
}

export function IconBadge({ children, ...rest }) {
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

export function TextBadge({ children, ...rest }) {
    return (
        <Badge {...rest}>
            {children}
            Notifications
        </Badge>
    );
}
