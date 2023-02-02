/**
 * @jest-environment node
 */
import { Alert, AlertTrigger } from "@components/alert";
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <AlertTrigger>
                <Button>Trigger</Button>
                <Alert primaryButtonLabel="Primary">
                    <Heading>Autopilot</Heading>
                    <Content>Are you use sure you want to engage autopilot?</Content>
                </Alert>
            </AlertTrigger>
        );

    expect(renderOnServer).not.toThrow();
});

