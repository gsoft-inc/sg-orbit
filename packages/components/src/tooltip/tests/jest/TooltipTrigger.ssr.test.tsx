/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Tooltip, TooltipTrigger } from "@components/tooltip";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <TooltipTrigger>
                <Button disabled>Trigger</Button>
                <Tooltip>Content</Tooltip>
            </TooltipTrigger>
        );

    expect(renderOnServer).not.toThrow();
});