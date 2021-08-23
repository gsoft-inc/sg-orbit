import { Alert, AlertTrigger } from "@react-components/alert";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Ref, createRef } from "react";
import { act } from "@testing-library/react-hooks";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("do not dismiss on outside click", async () => {
    const { getByTestId } = render(
        <AlertTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Alert data-testid="alert" primaryButtonLabel="Primary">
                <Heading>Autopilot</Heading>
                <Content>Are you use sure you want to engage autopilot?</Content>
            </Alert>
        </AlertTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("alert")).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("alert")).toBeInTheDocument());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <AlertTrigger defaultOpen ref={ref}>
            <Button>Trigger</Button>
            <Alert primaryButtonLabel="Primary">
                <Heading>Autopilot</Heading>
                <Content>Are you use sure you want to engage autopilot?</Content>
            </Alert>
        </AlertTrigger>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <AlertTrigger
            defaultOpen
            ref={node => {
                refNode = node;
            }}
        >
            <Button>Trigger</Button>
            <Alert primaryButtonLabel="Primary">
                <Heading>Autopilot</Heading>
                <Content>Are you use sure you want to engage autopilot?</Content>
            </Alert>
        </AlertTrigger>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <AlertTrigger defaultOpen ref={handler}>
            <Button>Trigger</Button>
            <Alert primaryButtonLabel="Primary">
                <Heading>Autopilot</Heading>
                <Content>Are you use sure you want to engage autopilot?</Content>
            </Alert>
        </AlertTrigger>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
