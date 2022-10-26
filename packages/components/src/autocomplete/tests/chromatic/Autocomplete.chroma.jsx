import { Autocomplete } from "@components/autocomplete";
import { Div } from "@components/html";
import { GroupIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Item } from "@components/collection";

export default {
    title: "Chromatic/Autocomplete",
    component: Autocomplete,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const Default = () => <Stack>
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
</Stack>;

export const Placeholder = () => <Stack>
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
</Stack>;

export const DefaultValue = () => <Stack>
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
</Stack>;

export const DefaultValueNotMatching = () => <Autocomplete defaultValue="Toto" placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const TriggerIcon = () => <Stack>
    <Autocomplete icon={<GroupIcon />} placeholder="Select a planet" aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Autocomplete>
    <Autocomplete defaultValue="Mars" icon={<GroupIcon />} placeholder="Select a planet" aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Autocomplete>
    <Autocomplete disabled icon={<GroupIcon />} placeholder="Select a planet" aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Autocomplete>
    <Div>
        <Autocomplete fluid icon={<GroupIcon />} placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    </Div>
    <Div width="10%">
        <Autocomplete fluid icon={<GroupIcon />} placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    </Div>
</Stack>;

export const CanClearValue = () => <Autocomplete defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const Validation = () => <Inline>
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
</Inline>;

export const OverflowingValue = () => <Autocomplete defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry." placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const TriggerStates = () => <Stack>
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
</Stack>;

export const NoResults = () => <Stack gap={13}>
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
</Stack>;

export const CustomTriggerWidth = () => <Autocomplete width={16} placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const CustomMenuWidth = () => <Autocomplete overlayProps={{ width: "500px" }} defaultOpen placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const DirectionBottom = () => <Autocomplete direction="bottom" defaultOpen placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const DirectionTop = () => <Autocomplete direction="top" defaultOpen placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const AlignStart = () => <Autocomplete align="start" overlayProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

AlignStart.decorators = [Story => <div style={{ paddingLeft: "200px" }}><Story /></div>];

export const AlignEnd = () => <Autocomplete align="end" overlayProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
    <Item key="earth">Earth</Item>
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

AlignEnd.decorators = [Story => <div style={{ paddingLeft: "400px" }}><Story /></div>];

export const ConditionnalRendering = () => <Autocomplete placeholder="Select a planet" aria-label="Planets">
    {false && <Item key="earth">Earth</Item>}
    <Item key="mars">Mars</Item>
    <Item key="saturn">Saturn</Item>
</Autocomplete>;

export const Zoom = () => <Stack>
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
</Stack>;

export const Styling = () => <Inline>
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
</Inline>;

Default.storyName = "default";
Placeholder.storyName = "placeholder";
DefaultValue.storyName = "default value";
DefaultValueNotMatching.storyName = "default value not matching any item";
TriggerIcon.storyName = "trigger icon";
CanClearValue.storyName = "can clear value";
Validation.storyName = "validation";
OverflowingValue.storyName = "overflowing value";
TriggerStates.storyName = "trigger states";
NoResults.storyName = "no results";
CustomTriggerWidth.storyName = "custom trigger width";
CustomMenuWidth.storyName = "custom menu width";
DirectionBottom.storyName = "direction bottom";
DirectionTop.storyName = "direction top";
AlignStart.storyName = "align start";
AlignEnd.storyName = "align end";
ConditionnalRendering.storyName = "conditional rendering";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
