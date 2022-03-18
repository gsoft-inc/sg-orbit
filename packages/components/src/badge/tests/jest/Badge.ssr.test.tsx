/**
 * @jest-environment node
 */
import { Badge, BadgeProps } from "@components/badge";
import { Div } from "@components/html";
import { Text } from "@components/typography";
import { forwardRef } from "react";
import { renderToString } from "react-dom/server";

const SquareBadge = forwardRef<HTMLElement, BadgeProps>(({ children, ...rest }, ref) => {
    return (
        <Badge
            {...rest}
            ref={ref}
        >
            {children}
            <Div width="45px" height="45px" />
        </Badge>
    );
});

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <SquareBadge>
                <Text>100</Text>
            </SquareBadge>
        );

    expect(renderOnServer).not.toThrow();
});

