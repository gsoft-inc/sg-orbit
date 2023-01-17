/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Modal, ModalTrigger } from "@components/modal";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <ModalTrigger defaultOpen>
                <Button>Trigger</Button>
                <Modal>
                    <Heading>Iconic Arecibo Observatory collapses</Heading>
                    <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
                </Modal>
            </ModalTrigger>
        );

    expect(renderOnServer).not.toThrow();
});
