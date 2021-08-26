import { Button } from "../../../button";
import { TextLink } from "../../../link";
import { as } from "../../src";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

test("as link support ref", async () => {
    const ref = createRef<HTMLAnchorElement>();
    const LinkButton = as(Button, "a");

    render(
        <LinkButton ref={ref}>
            Content
        </LinkButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    expect(ref.current.tagName).toBe("A");
});

test("as button support ref", async () => {
    const ref = createRef<HTMLButtonElement>();
    const ButtonLink = as(TextLink, "button");

    render(
        <ButtonLink ref={ref}>
            Content
        </ButtonLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

const RouterLink = forwardRef<HTMLDivElement, { to: string }>((props, ref) => {
    console.log(props);

    return <div ref={ref}></div>;
});

test("as routerLink support ref", async () => {
    const ref = createRef<any>();
    const ButtonLink = as(TextLink, RouterLink);

    render(
        <ButtonLink to="aa" ref={ref}>
            Content
        </ButtonLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
