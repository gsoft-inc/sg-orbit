import { Badge } from "@components/badge";
import { Div } from "@components/html";
import { EmailMajorIcon } from "@components/icons";

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
            <Div backgroundColor="alias-accent-light" borderRadius="100px" width={6} height={6} />
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
            <EmailMajorIcon size="lg" />
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
