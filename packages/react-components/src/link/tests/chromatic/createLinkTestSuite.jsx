import { Inline } from "@react-components/layout";
import { cloneElement } from "react";

function Link({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createLinkTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Link href="#" element={element} />
        )
        .add("states", () =>
            <Inline wrap>
                <Link active href="#" element={element} />
                <Link focus href="#" element={element} />
                <Link hover href="#" element={element} />
                <Link focus hover href="#" element={element} />
                <Link disabled href="#" element={element} />
            </Inline>
        )
        .add("external", () =>
            <Link external href="https://www.space.com/spacex-delays-south-korea-military-satellite-launch.html" element={element} />
        );


}
