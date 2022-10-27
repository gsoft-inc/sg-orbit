import { CheckCircleIcon, IconList } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Lozenge } from "@components/lozenge";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Lozenge",
    component: Lozenge
};

export const Default = () =>
    <Inline alignY="end">
        <Lozenge size="sm">New</Lozenge>
        <Lozenge>New</Lozenge>
    </Inline>;

export const Variants = () =>
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
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning" size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive" size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative" size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative" size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    </Inline>;

export const Icon = () =>
    <Stack>
        <Inline alignY="end">
            <Lozenge size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
        <Div>
            <Lozenge>
                <IconList>
                    <CheckCircleIcon /><CheckCircleIcon />
                </IconList>
                <Text>New</Text>
            </Lozenge>
        </Div>
    </Stack>;

export const HighlightAndVariant = () =>
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
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge highlight>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning" highlight size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="warning" highlight>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive" highlight size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="positive" highlight>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative" highlight size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="negative" highlight>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative" highlight size="sm">
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
            <Lozenge variant="informative" highlight>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    </Stack>;

export const InheritParentProperties = () =>
    <Inline alignY="end">
        <Lozenge textTransform="uppercase">New</Lozenge>
        <Lozenge color="red" highlight>
            <CheckCircleIcon />
            <Text>New</Text>
        </Lozenge>
    </Inline>;

export const Fluid = () =>
    <Div width="500px">
        <Inline>
            <Lozenge fluid>New</Lozenge>
            <Lozenge fluid>
                <CheckCircleIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    </Div>;

export const Zoom = () =>
    <Inline>
        <Div className="zoom-in">
            <Lozenge>New</Lozenge>
        </Div>
        <Div className="zoom-out">
            <Lozenge>New</Lozenge>
        </Div>
    </Inline>;

export const Styling = () =>
    <Inline>
        <Lozenge border="warning-7">New</Lozenge>
        <Lozenge className="border-red">New</Lozenge>
        <Lozenge
            style={{
                border: "1px solid red"
            }}
        >New</Lozenge>
    </Inline>;

Default.storyName = "default";
Variants.storyName = "variants";
Icon.storyName = "icon";
HighlightAndVariant.storyName = "highlight and variant";
InheritParentProperties.storyName = "inherit parent properties";
Fluid.storyName = "fluid";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
