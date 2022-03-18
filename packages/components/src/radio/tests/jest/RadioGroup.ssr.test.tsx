/**
 * @jest-environment node
 */
import { Radio, RadioGroup } from "@components/radio";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
            </RadioGroup>
        );

    expect(renderOnServer).not.toThrow();
});
