import { Alert } from "@react-components/alert";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Behaviors *****

test("when autoFocusButton value is \"primary\", autofocus the primary button on render", async () => {
    const { getByText } = render(
        <Alert autoFocusButton="primary" primaryButtonLabel="Primary" secondaryButtonLabel="Secondary" cancelButtonLabel="Cancel">
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(getByText("Primary").parentElement).toHaveFocus());
});

test("when autoFocusButton value is \"secondary\", autofocus the secondary button on render", async () => {
    const { getByText } = render(
        <Alert autoFocusButton="secondary" primaryButtonLabel="Primary" secondaryButtonLabel="Secondary" cancelButtonLabel="Cancel">
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(getByText("Secondary").parentElement).toHaveFocus());
});

test("when autoFocusButton value is \"cancel\", autofocus the cancel button on render", async () => {
    const { getByText } = render(
        <Alert autoFocusButton="cancel" primaryButtonLabel="Primary" secondaryButtonLabel="Secondary" cancelButtonLabel="Cancel">
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(getByText("Cancel").parentElement).toHaveFocus());
});

test("when autoFocusButton value is not defined, autofocus the primary button", async () => {
    const { getByText } = render(
        <Alert primaryButtonLabel="Primary" secondaryButtonLabel="Secondary" cancelButtonLabel="Cancel">
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(getByText("Primary").parentElement).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Alert ref={ref} primaryButtonLabel="Primary">
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("SECTION"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Alert
            primaryButtonLabel="Primary"
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("SECTION"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Alert ref={handler} primaryButtonLabel="Primary">
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
