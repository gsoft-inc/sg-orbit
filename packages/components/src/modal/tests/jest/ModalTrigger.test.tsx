import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Modal, ModalTrigger } from "@components/modal";
import { createRef } from "react";
import { renderWithTheme, waitFor } from "@test-utils";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <ModalTrigger defaultOpen ref={ref}>
            <Button>Trigger</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Modal>
        </ModalTrigger>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <ModalTrigger
            defaultOpen
            ref={node => {
                refNode = node;
            }}
        >
            <Button>Trigger</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Modal>
        </ModalTrigger>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ModalTrigger defaultOpen ref={handler}>
            <Button>Trigger</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Modal>
        </ModalTrigger>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
