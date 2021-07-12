import { Alert } from "@react-components/alert";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Alert ref={ref}>
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("SECTION"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Alert
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
        <Alert ref={handler}>
            <Heading>Autopilot</Heading>
            <Content>Are you use sure you want to engage autopilot?</Content>
        </Alert>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
