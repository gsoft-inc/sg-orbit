/**
 * @jest-environment node
 */

import { renderToString } from "react-dom/server";
import { useId } from "@components/shared";
import React from "react";

function Test() {
    const id = useId();

    return <span id={id}>test</span>;
}

describe("useId SSR", () => {
    it("should not generate an id on the server", () => {
        const renderOnServer = () => renderToString(<Test />);

        expect(renderOnServer).not.toThrow();

        const markup = renderOnServer();

        expect(markup.indexOf("id=\"")).toBe(-1);
    });
});
