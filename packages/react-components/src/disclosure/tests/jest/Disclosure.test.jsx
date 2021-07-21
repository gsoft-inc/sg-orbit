import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Disclosure } from "@react-components/disclosure";
import { Keys } from "@react-components/shared";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

// ***** Behaviors *****

test("spacebar keypress toggles content visibility", async () => {
    const { getByTestId } = render(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    const header = await waitFor(() => getByTestId("header"));

    expect(header).toHaveAttribute("aria-expanded", "false");

    act(() => {
        fireEvent.keyDown(getByTestId("header"), { key: Keys.space });
    });

    expect(header).toHaveAttribute("aria-expanded", "true");

    act(() => {
        fireEvent.keyDown(getByTestId("header"), { key: Keys.space });
    });

    expect(header).toHaveAttribute("aria-expanded", "false");
});

test("enter keypress toggles content visibility", async () => {
    const { getByTestId } = render(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    const header = await waitFor(() => getByTestId("header"));

    expect(header).toHaveAttribute("aria-expanded", "false");

    act(() => {
        fireEvent.keyDown(getByTestId("header"), { key: Keys.enter });
    });

    expect(header).toHaveAttribute("aria-expanded", "true");

    act(() => {
        fireEvent.keyDown(getByTestId("header"), { key: Keys.enter });
    });

    expect(header).toHaveAttribute("aria-expanded", "false");
});

// ***** Aria *****

test("when an id is provided, the disclosure id attribute match the provided id", async () => {
    const { getByTestId } = render(
        <Disclosure id="foo" data-testid="disclosure">
            <Button>Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    await waitFor(() => expect(getByTestId("disclosure")).toHaveAttribute("id", "foo"));
});

test("when an id is provided, a disclosure aria-controls attribute match the content element id", async () => {
    const { getByTestId } = render(
        <Disclosure id="foo">
            <Button data-testid="header">Header</Button>
            <Content data-testid="content">Content</Content>
        </Disclosure>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(content).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
});

test("when an id is auto generated, a disclosure aria-controls attribute match the content element id", async () => {
    const { getByTestId } = render(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content data-testid="content">Content</Content>
        </Disclosure>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(content).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
});

// ***** Api *****

test("call onOpenChange when expand", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Disclosure onOpenChange={handler}>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    act(() => {
        fireEvent.click(getByTestId("header"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when close", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Disclosure defaultOpen onOpenChange={handler}>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    act(() => {
        fireEvent.click(getByTestId("header"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});



