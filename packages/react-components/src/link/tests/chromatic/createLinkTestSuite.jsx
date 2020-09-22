import { ArrowIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Link({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createLinkTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Inline align="end">
                <Link size="sm" href="#" element={element}>Flight details</Link>
                <Link href="#" element={element}>Flight details</Link>
                <Link size="lg" href="#" element={element}>Flight details</Link>
            </Inline>
        )
        .add("icon", () =>
            <Inline align="end">
                <Link size="sm" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
                <Link href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
                <Link size="lg" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
            </Inline>
        )
        .add("external", () =>
            <Inline align="end">
                <Link external size="sm" href="#" element={element}>Flight details</Link>
                <Link external href="#" element={element}>Flight details</Link>
                <Link external size="lg" href="#" element={element}>Flight details</Link>
            </Inline>
        )
        .add("primary", () =>
            <Inline align="end">
                <Link color="primary" size="sm" element={element}>Flight details</Link>
                <Link color="primary" element={element}>Flight details</Link>
                <Link color="primary" size="lg" element={element}>Flight details</Link>
            </Inline>
        )
        .add("secondary", () =>
            <Inline align="end">
                <Link color="secondary" size="sm" element={element}>Flight details</Link>
                <Link color="secondary" element={element}>Flight details</Link>
                <Link color="secondary" size="lg" element={element}>Flight details</Link>
            </Inline>
        )
        .add("danger", () =>
            <Inline align="end">
                <Link color="danger" size="sm" element={element}>Flight details</Link>
                <Link color="danger" element={element}>Flight details</Link>
                <Link color="danger" size="lg" element={element}>Flight details</Link>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Link active size="sm" element={element}>Flight details</Link>
                    <Link active element={element}>Flight details</Link>
                    <Link active size="lg" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link focus size="sm" element={element}>Flight details</Link>
                    <Link focus element={element}>Flight details</Link>
                    <Link focus size="lg" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link hover size="sm" element={element}>Flight details</Link>
                    <Link hover element={element}>Flight details</Link>
                    <Link hover size="lg" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link focus hover size="sm" element={element}>Flight details</Link>
                    <Link focus hover element={element}>Flight details</Link>
                    <Link focus hover size="lg" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link visited size="sm" element={element}>Flight details</Link>
                    <Link visited element={element}>Flight details</Link>
                    <Link visited size="lg" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link disabled size="sm" element={element}>Flight details</Link>
                    <Link disabled element={element}>Flight details</Link>
                    <Link disabled size="lg" element={element}>Flight details</Link>
                </Inline>
            </Stack>
        );
}
