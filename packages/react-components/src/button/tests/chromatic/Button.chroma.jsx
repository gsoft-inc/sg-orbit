import { Button } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { SignoutIcon } from "@react-components/icons";
import { Text } from "@react-components/text";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createButtonTestSuite(<Button variant="solid" />, stories("/solid"));

createButtonTestSuite(<Button variant="outline" />, stories("/outline"));

createButtonTestSuite(<Button variant="ghost" />, stories("/ghost"));

stories("/link")
    .add("default", () =>
        <Inline align="end">
            <Button variant="link" size="sm">Button</Button>
            <Button variant="link">Button</Button>
            <Button variant="link" size="lg">Button</Button>
        </Inline>
    )
    .add("icon", () =>
        <Stack>
            <Inline align="end">
                <Button variant="link" size="sm">
                    <SignoutIcon />
                    <Text>Button</Text>
                </Button>
                <Button variant="link">
                    <SignoutIcon />
                    <Text>Button</Text>
                </Button>
                <Button variant="link" size="lg">
                    <SignoutIcon />
                    <Text>Button</Text>
                </Button>
            </Inline>
        </Stack>
    )
    .add("primary", () =>
        <Stack>
            <Inline align="end">
                <Button variant="link" color="primary" size="sm">Button</Button>
                <Button variant="link" color="primary">Button</Button>
                <Button variant="link" color="primary" size="lg">Button</Button>
            </Inline>
        </Stack>
    )
    .add("secondary", () =>
        <Stack>
            <Inline align="end">
                <Button variant="link" color="secondary" size="sm">Button</Button>
                <Button variant="link" color="secondary">Button</Button>
                <Button variant="link" color="secondary" size="lg">Button</Button>
            </Inline>
        </Stack>
    )
    .add("danger", () =>
        <Stack>
            <Inline align="end">
                <Button variant="link" color="danger" size="sm">Button</Button>
                <Button variant="link" color="danger">Button</Button>
                <Button variant="link" color="danger" size="lg">Button</Button>
            </Inline>
        </Stack>
    )
    .add("states", () =>
        <Stack>
            <Inline align="end">
                <Button variant="link" active size="sm">Button</Button>
                <Button variant="link" active>Button</Button>
                <Button variant="link" active size="lg">Button</Button>
            </Inline>
            <Inline align="end">
                <Button variant="link" focus size="sm">Button</Button>
                <Button variant="link" focus>Button</Button>
                <Button variant="link" focus size="lg">Button</Button>
            </Inline>
            <Inline align="end">
                <Button variant="link" hover size="sm">Button</Button>
                <Button variant="link" hover>Button</Button>
                <Button variant="link" hover size="lg">Button</Button>
            </Inline>
            <Inline align="end">
                <Button variant="link" focus hover size="sm">Button</Button>
                <Button variant="link" focus hover>Button</Button>
                <Button variant="link" focus hover size="lg">Button</Button>
            </Inline>
            <Inline align="end">
                <Button variant="link" disabled size="sm">Button</Button>
                <Button variant="link" disabled>Button</Button>
                <Button variant="link" disabled size="lg">Button</Button>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <Button variant="link" className="bg-red">Button</Button>
            <Button variant="link" style={{ backgroundColor: "red" }}>Button</Button>
        </Inline>
    )
    .add("as anchor", () =>
        <Button variant="link" as="a" href="https://www.sharegate.com" target="_blank">Button</Button>
    );

stories()
    .add("styling", () =>
        <Inline>
            <Button className="bg-red">Button</Button>
            <Button style={{ backgroundColor: "red" }}>Button</Button>
        </Inline>
    )
    .add("autofocus", () =>
        <Button autoFocus>Button</Button>
    )
    .add("when disabled do not autofocus", () =>
        <Button disabled autoFocus>Button</Button>
    )
    .add("autofocus with delay", () =>
        <Button autoFocus autoFocusDelay={50}>Button</Button>
    );



