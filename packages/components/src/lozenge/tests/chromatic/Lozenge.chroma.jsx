import { PlaceholderMajorIcon, IconList } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Lozenge } from "@components/lozenge";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Lozenge",
    component: Lozenge
};

export const Default = () => (
    <Inline alignY="end">
        <Lozenge size="sm">New</Lozenge>
        <Lozenge>New</Lozenge>
    </Inline>
);

Default.storyName = "default";

export const Variants = () => (
    <Inline alignY="end">
        <Lozenge size="sm">New</Lozenge>
        <Lozenge >New</Lozenge>
        <Lozenge variant="warning" size="sm">New</Lozenge>
        <Lozenge variant="warning">New</Lozenge>
        <Lozenge variant="positive" size="sm">New</Lozenge>
        <Lozenge variant="positive">New</Lozenge>
        <Lozenge variant="negative" size="sm">New</Lozenge>
        <Lozenge variant="negative">New</Lozenge>
        <Lozenge variant="informative" size="sm">New</Lozenge>
        <Lozenge variant="informative">New</Lozenge>

        <Inline alignY="end">
            <Lozenge size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning" size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive" size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative" size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative" size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    </Inline>
);

Variants.storyName = "variants";

export const Icon = () => (
    <Stack>
        <Inline alignY="end">
            <Lozenge size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
        <Div>
            <Lozenge>
                <IconList>
                    <PlaceholderMajorIcon /><PlaceholderMajorIcon />
                </IconList>
                <Text>New</Text>
            </Lozenge>
        </Div>
    </Stack>
);

Icon.storyName = "icon";

export const HighlightAndVariant = () => (
    <Stack>
        <Inline alignY="end">
            <Lozenge highlight size="sm">New</Lozenge>
            <Lozenge highlight>New</Lozenge>
            <Lozenge variant="warning" highlight size="sm">New</Lozenge>
            <Lozenge variant="warning" highlight>New</Lozenge>
            <Lozenge variant="positive" highlight size="sm">New</Lozenge>
            <Lozenge variant="positive" highlight>New</Lozenge>
            <Lozenge variant="negative" highlight size="sm">New</Lozenge>
            <Lozenge variant="negative" highlight>New</Lozenge>
            <Lozenge highlight variant="informative" size="sm">New</Lozenge>
            <Lozenge highlight variant="informative">New</Lozenge>
        </Inline>
        <Inline alignY="end">
            <Lozenge highlight size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge highlight>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning" highlight size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning" highlight>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive" highlight size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive" highlight>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative" highlight size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative" highlight>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative" highlight size="sm">
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative" highlight>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    </Stack>
);

HighlightAndVariant.storyName = "highlight and variant";

export const InheritParentProperties = () => (
    <Inline alignY="end">
        <Lozenge textTransform="uppercase">New</Lozenge>
        <Lozenge color="red" highlight>
            <PlaceholderMajorIcon />
            <Text>New</Text>
        </Lozenge>
    </Inline>
);

InheritParentProperties.storyName = "inherit parent properties";

export const Fluid = () => (
    <Div width="500px">
        <Inline>
            <Lozenge fluid>New</Lozenge>
            <Lozenge fluid>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    </Div>
);

Fluid.storyName = "fluid";

export const Zoom = () => (
    <Inline>
        <Div className="zoom-in">
            <Lozenge>New</Lozenge>
        </Div>
        <Div className="zoom-out">
            <Lozenge>New</Lozenge>
        </Div>
    </Inline>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Inline>
        <Lozenge border="warning-7">New</Lozenge>
        <Lozenge className="border-red">New</Lozenge>
        <Lozenge
            style={{
                border: "1px solid red"
            }}
        >New</Lozenge>
    </Inline>
);

Styling.storyName = "styling";
