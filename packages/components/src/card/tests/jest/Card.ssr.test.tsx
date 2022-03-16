/**
 * @jest-environment node
 */
import { Card } from "@components/card";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Card>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        );
    expect(renderOnServer).not.toThrow();
});
