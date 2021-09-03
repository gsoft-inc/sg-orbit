import { TextLink } from "@react-components/link";
import { as } from "@react-components/shared";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const RouterLink = forwardRef<HTMLDivElement, { to: string }>((props, ref) => {
    return <div ref={ref}></div>;
});

test("support ref", async () => {
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
