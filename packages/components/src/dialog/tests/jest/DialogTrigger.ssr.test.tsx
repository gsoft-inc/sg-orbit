/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Dialog, DialogTrigger } from "@components/dialog";
import { Heading } from "@components/typography";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <DialogTrigger dismissable>
                <Button>Trigger</Button>
                <Dialog>
                    <Heading>Iconic Arecibo Observatory collapses</Heading>
                    <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
                </Dialog>
            </DialogTrigger>
        );

    expect(renderOnServer).not.toThrow();
});
