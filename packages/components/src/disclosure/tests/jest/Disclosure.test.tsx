import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Disclosure } from "@components/disclosure";
import { Keys } from "@components/shared";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@jest-utils";

// ***** Behaviors *****

test("spacebar keypress toggles content visibility", async () => {
    const { getByTestId, findByTestId } = renderWithTheme(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    const header = await findByTestId("header");
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
    const { getByTestId, findByTestId } = renderWithTheme(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    const header = await findByTestId("header");

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
    const { getByTestId } = renderWithTheme(
        <Disclosure id="foo" data-testid="disclosure">
            <Button>Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    await waitFor(() => expect(getByTestId("disclosure")).toHaveAttribute("id", "foo"));
});

test("when an id is provided, a disclosure aria-controls attribute match the content element id", async () => {
    const { findByTestId } = renderWithTheme(
        <Disclosure id="foo">
            <Button data-testid="header">Header</Button>
            <Content data-testid="content">Content</Content>
        </Disclosure>
    );

    const header = await findByTestId("header");
    const content = await findByTestId("content");

    expect(content).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
});

test("when an id is auto generated, a disclosure aria-controls attribute match the content element id", async () => {
    const { findByTestId } = renderWithTheme(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content data-testid="content">Content</Content>
        </Disclosure>
    );

    const header = await findByTestId("header");
    const content = await findByTestId("content");

    expect(content).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
});

// ***** Api *****

test("call onOpenChange when expand", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
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

    const { getByTestId } = renderWithTheme(
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
