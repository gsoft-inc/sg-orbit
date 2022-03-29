/**
 * @jest-environment node
 */
import { Badge, BadgeProps } from "@components/badge";
import { Div } from "@components/html";
import { Text } from "@components/typography";
import { forwardRef } from "react";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

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

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <SquareBadge>
                <Text>100</Text>
            </SquareBadge>
        );

    expect(renderOnServer).not.toThrow();
});

