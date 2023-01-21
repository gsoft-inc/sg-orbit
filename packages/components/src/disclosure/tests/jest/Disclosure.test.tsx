import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Disclosure } from "@components/disclosure";
import { Keys } from "@components/shared";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@test-utils";

// ***** Behaviors *****

test("spacebar keypress toggles content visibility", async () => {
    renderWithTheme(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    const header = await screen.findByTestId("header");
    expect(header).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(screen.getByTestId("header"), { key: Keys.space });

    expect(header).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(screen.getByTestId("header"), { key: Keys.space });

    expect(header).toHaveAttribute("aria-expanded", "false");
});

test("enter keypress toggles content visibility", async () => {
    renderWithTheme(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    const header = await screen.findByTestId("header");

    expect(header).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(screen.getByTestId("header"), { key: Keys.enter });

    expect(header).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(screen.getByTestId("header"), { key: Keys.enter });

    expect(header).toHaveAttribute("aria-expanded", "false");
});

// ***** Aria *****

test("when an id is provided, the disclosure id attribute match the provided id", async () => {
    renderWithTheme(
        <Disclosure id="foo" data-testid="disclosure">
            <Button>Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    await waitFor(() => expect(screen.getByTestId("disclosure")).toHaveAttribute("id", "foo"));
});

test("when an id is provided, a disclosure aria-controls attribute match the content element id", async () => {
    renderWithTheme(
        <Disclosure id="foo">
            <Button data-testid="header">Header</Button>
            <Content data-testid="content">Content</Content>
        </Disclosure>
    );

    const header = await screen.findByTestId("header");
    const content = await screen.findByTestId("content");

    expect(content).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
});

test("when an id is auto generated, a disclosure aria-controls attribute match the content element id", async () => {
    renderWithTheme(
        <Disclosure>
            <Button data-testid="header">Header</Button>
            <Content data-testid="content">Content</Content>
        </Disclosure>
    );

    const header = await screen.findByTestId("header");
    const content = await screen.findByTestId("content");

    expect(content).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
});

// ***** Api *****

test("call onOpenChange when expand", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Disclosure onOpenChange={handler}>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    fireEvent.click(screen.getByTestId("header"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when close", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Disclosure defaultOpen onOpenChange={handler}>
            <Button data-testid="header">Header</Button>
            <Content>Content</Content>
        </Disclosure>
    );

    fireEvent.click(screen.getByTestId("header"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
