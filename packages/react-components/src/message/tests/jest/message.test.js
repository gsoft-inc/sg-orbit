import { Message } from "@react-components/message";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";

function createMessage(props = {}) {
    return (
        <Message {...props}>
            <p>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</p>
        </Message>
    );
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createMessage({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createMessage({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});
