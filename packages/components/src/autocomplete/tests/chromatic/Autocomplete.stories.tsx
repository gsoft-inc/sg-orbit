import { Autocomplete } from "@components/autocomplete";
import { Div } from "@components/html";
import { GroupMajorIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Item } from "@components/collection";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Autocomplete",
    component: Autocomplete,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
} as ComponentMeta<typeof Autocomplete>;

type AutocompleteStory = ComponentStoryObj<typeof Autocomplete>;

export const Default: AutocompleteStory = {
    storyName: "default",
    render: () => (
        <Stack>
            <Autocomplete aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Autocomplete>
            <Autocomplete loading aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Autocomplete>
            <Autocomplete disabled aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Autocomplete>
            <Div>
                <Autocomplete fluid aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Autocomplete>
            </Div>
            <Div width="10%">
                <Autocomplete fluid aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Autocomplete>
            </Div>
            <Div>
                <Autocomplete loading fluid aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Autocomplete>
            </Div>
        </Stack>
    )
};

export const Placeholder: AutocompleteStory = {
    storyName: "placeholder",
    render: () => (
        <Stack>
            <Autocomplete placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Autocomplete>
            <Autocomplete loading placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Autocomplete>
            <Autocomplete disabled placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Autocomplete>
            <Div>
                <Autocomplete fluid placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Autocomplete>
            </Div>
            <Div width="10%">
                <Autocomplete fluid placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Autocomplete>
            </Div>
            <Div>
                <Autocomplete loading fluid placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Autocomplete>
            </Div>
        </Stack>
    )
};

export const DefaultValue: AutocompleteStory = {
    storyName: "default value",
    render: () => (
        <Stack>
            <Autocomplete defaultValue="Mars" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete loading defaultValue="Mars" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete disabled defaultValue="Mars" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Inline>
                <Autocomplete defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete value="Mars" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Inline>
            <Div>
                <Autocomplete fluid defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
            <Div width="10%">
                <Autocomplete fluid defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
            <Div>
                <Autocomplete loading fluid defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
        </Stack>
    )
};

export const DefaultValueNotMatching: AutocompleteStory = {
    storyName: "default value not matching any item",
    render: () => (
        <Autocomplete defaultValue="Toto" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};


export const TriggerIcon: AutocompleteStory = {
    storyName: "trigger icon",
    render: () => (
        <Stack>
            <Autocomplete icon={<GroupMajorIcon />} placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete defaultValue="Mars" icon={<GroupMajorIcon />} placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete disabled icon={<GroupMajorIcon />} placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Div>
                <Autocomplete fluid icon={<GroupMajorIcon />} placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
            <Div width="10%">
                <Autocomplete fluid icon={<GroupMajorIcon />} placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
        </Stack>
    )
};

export const CanClearValue: AutocompleteStory = {
    storyName: "can clear value",
    render: () => (
        <Autocomplete defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const Validation: AutocompleteStory = {
    storyName: "validation",
    render: () => (
        <Inline>
            <Autocomplete validationState="invalid" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete validationState="valid" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
        </Inline>
    )
};

export const OverflowingValue: AutocompleteStory = {
    storyName: "overflowing value",
    render: () => (
        <Autocomplete defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry." placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const TriggerStates: AutocompleteStory = {
    storyName: "trigger states",
    render: () => (
        <Stack>
            <Inline>
                <Autocomplete active placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete focus placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Inline>
            <Inline>
                <Autocomplete hover placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete readOnly placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Inline>
            <Inline>
                <Autocomplete disabled placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete disabled active placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete disabled focus placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Inline>
            <Inline>
                <Autocomplete disabled hover placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete disabled focus hover placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Inline>
        </Stack>
    )
};

export const NoResults: AutocompleteStory = {
    storyName: "no results",
    render: () => (
        <Stack gap={13}>
            <Inline>
                <Autocomplete defaultOpen placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete defaultOpen noResultsMessage="Custom no results message" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
                <Autocomplete defaultOpen noResultsMessage="Custom no results message, this is as custom as can be" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Inline>
            <Div>
                <Autocomplete fluid defaultOpen placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
            <Div width="10%">
                <Autocomplete fluid defaultOpen placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </Div>
        </Stack>
    )
};

export const CustomTriggerWidth: AutocompleteStory = {
    storyName: "custom trigger width",
    render: () => (
        <Autocomplete width={16} placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};


export const CustomMenuWidth: AutocompleteStory = {
    storyName: "custom menu width",
    render: () => (
        <Autocomplete overlayProps={{ width: "500px" }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};


export const DirectionBottom: AutocompleteStory = {
    storyName: "direction bottom",
    render: () => (
        <Autocomplete direction="bottom" defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const DirectionTop: AutocompleteStory = {
    storyName: "direction top",
    render: () => (
        <Autocomplete direction="top" defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const AlignStart: AutocompleteStory = {
    storyName: "align start",
    decorators: [Story => <div style={{ paddingLeft: "200px" }}><Story /></div>],
    render: () => (
        <Autocomplete align="start" overlayProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const AlignEnd: AutocompleteStory = {
    storyName: "align end",
    decorators: [Story => <div style={{ paddingLeft: "400px" }}><Story /></div>],
    render: () => (
        <Autocomplete align="end" overlayProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const ConditionnalRendering: AutocompleteStory = {
    storyName: "conditional rendering",
    render: () => (
        <Autocomplete placeholder="Select a planet" aria-label="Planets">
            {false && <Item key="earth">Earth</Item>}
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
};

export const Zoom: AutocompleteStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Autocomplete placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Autocomplete>
            </Div>
            <Div className="zoom-out">
                <Autocomplete placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Autocomplete>
            </Div>
        </Stack>
    )
};

export const Styling: AutocompleteStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <Autocomplete border="warning-7" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Autocomplete>
            <Autocomplete className="border-red" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Autocomplete>
            <Autocomplete style={{ border: "1px solid red" }} placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Autocomplete>
        </Inline>
    )
};
