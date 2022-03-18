/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Popover, PopoverTrigger } from "@components/popover";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();
    
    const renderOnServer = () =>
        renderToString(
            <PopoverTrigger dismissable>
                <Button>Trigger</Button>
                <Popover>
                    <Heading>Space News</Heading>
                    <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
                </Popover>
            </PopoverTrigger>
        );

    expect(renderOnServer).not.toThrow();
});
