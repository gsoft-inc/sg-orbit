import { Button } from "@react-components/button";
import { Div } from "@react-components/html";
import { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";
import { useFocusScope, useRovingFocus } from "@react-components/shared";
import userEvent from "@testing-library/user-event";

function RovingFocus({ children }: { children?: ReactNode }) {
    const [focusScope, setFocusRef] = useFocusScope();

    useRovingFocus(focusScope);

    return (
        <Div ref={setFocusRef}>
            {children}
        </Div>
    );
}

function DynamicRovingFocus({ renderDynamicElement, children }: { renderDynamicElement?: boolean; children?: ReactNode }) {
    return (
        <RovingFocus>
            {children}
            {renderDynamicElement && <Button data-testid="element-3">3</Button>}
        </RovingFocus>
    );
}

test("first element is tabbable", async () => {
    const { getByTestId } = render(
        <RovingFocus>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </RovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "-1"));
});

test("a disabled element is not tabbable", async () => {
    const { getByTestId } = render(
        <RovingFocus>
            <Button disabled data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </RovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "0"));
});

test("when all elements are disabled, no element is tabbable", async () => {
    const { getByTestId } = render(
        <RovingFocus>
            <Button disabled data-testid="element-1">1</Button>
            <Button disabled data-testid="element-2">2</Button>
        </RovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("element-2")).not.toHaveAttribute("tabindex"));
});

test("focusing an element change the tabbable element", async () => {
    const { getByTestId } = render(
        <RovingFocus>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </RovingFocus>
    );

    userEvent.click(getByTestId("element-2"));

    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "-1"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "0"));
});

test("a dynamically added element should not be tabbable", async () => {
    const { rerender, getByTestId } = render(
        <DynamicRovingFocus>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    rerender(
        <DynamicRovingFocus renderDynamicElement>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "-1"));
    await waitFor(() => expect(getByTestId("element-3")).toHaveAttribute("tabindex", "-1"));
});

test("a dynamically added element should be tabbable when all the existing elements are disabled", async () => {
    const { rerender, getByTestId } = render(
        <DynamicRovingFocus>
            <Button disabled data-testid="element-1">1</Button>
            <Button disabled data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("element-2")).not.toHaveAttribute("tabindex"));

    rerender(
        <DynamicRovingFocus renderDynamicElement>
            <Button disabled data-testid="element-1">1</Button>
            <Button disabled data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("element-2")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("element-3")).toHaveAttribute("tabindex", "0"));
});

test("dynamically removing a non tabbable element keep the current tabbable element", async () => {
    const { rerender, getByTestId } = render(
        <DynamicRovingFocus renderDynamicElement>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-3")).toBeInTheDocument());
    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("element-3")).toHaveAttribute("tabindex", "-1"));

    rerender(
        <DynamicRovingFocus>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "-1"));
});

test("dynamically removing a tabbable element set the first non disabled element as tabbable", async () => {
    const { rerender, getByTestId } = render(
        <DynamicRovingFocus renderDynamicElement>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    userEvent.click(getByTestId("element-3"));

    await waitFor(() => expect(getByTestId("element-3")).toHaveAttribute("tabindex", "0"));

    rerender(
        <DynamicRovingFocus>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </DynamicRovingFocus>
    );

    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "-1"));
});
