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
            <Link focus href="#" element={element} />
        )
        .add("external", () =>
            <Link external href="https://www.space.com/spacex-delays-south-korea-military-satellite-launch.html" element={element} />
        );


}
