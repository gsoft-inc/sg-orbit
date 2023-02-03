import { Avatar } from "@components/avatar";
import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { IconList, LightbulbMajorIcon, NotificationMajorIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Item, Section } from "@components/collection";
import { Menu, MenuItem } from "@components/menu";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Menu",
    component: Menu,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const OnlyItems = () => (
    <Menu aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Menu>
);

OnlyItems.storyName = "only items";

export const GeneratedKeys = () => (
    <Menu aria-label="Planets">
        <Item>Earth</Item>
        <Item>Mars</Item>
        <Item>Saturn</Item>
    </Menu>
);

GeneratedKeys.storyName = "generated keys";

export const Sections = () => (
    <Menu aria-label="Planets">
        <Section title="Visited">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Section>
        <Section title="Not Visited">
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Section>
    </Menu>
);

Sections.storyName = "sections";

export const Dividers = () => (
    <Menu aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Divider />
        <Item key="saturn">Saturn</Item>
        <Item key="jupiter">Jupiter</Item>
        <Divider />
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="uranus">Uranus</Item>
    </Menu>
);

Dividers.storyName = "dividers";

export const MixedSectionsItemsAndDividers = () => (
    <Menu aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Divider />
        <Item key="saturn">Saturn</Item>
        <Section title="Not Visited">
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Section>
    </Menu>
);

MixedSectionsItemsAndDividers.storyName = "mixed sections, items and dividers";

export const SelectedKeys = () => (
    <Inline>
        <Menu defaultSelectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
        <Menu defaultSelectedKeys={["mars", "neptune"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
    </Inline>
);

SelectedKeys.storyName = "selected keys";

export const ItemWithStartIcon = () => (
    <Menu aria-label="Planets">
        <Item key="earth">
            <NotificationMajorIcon />
            <Text>Earth</Text>
        </Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">
            <IconList>
                <LightbulbMajorIcon />
                <NotificationMajorIcon />
            </IconList>
            <Text>Mars</Text>
        </Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </Menu>
);

ItemWithStartIcon.storyName = "item with start icon";

export const ItemWithStartIconAndDescription = () => (
    <Menu aria-label="Planets">
        <Item key="earth">
            <NotificationMajorIcon />
            <Text>Earth</Text>
            <Text slot="description">Home Sweet Home</Text>
        </Item>
        <Item key="jupiter">
            <NotificationMajorIcon />
            <Text>Jupiter</Text>
            <Text slot="description">Jupiter did it!</Text>
        </Item>
        <Item key="mars">
            <LightbulbMajorIcon />
            <Text>Mars</Text>
            <Text slot="description">Elon and Grimes are coming.</Text>
        </Item>
    </Menu>
);

ItemWithStartIconAndDescription.storyName = "item with start icon and description";

export const ItemWithEndIcon = () => (
    <Menu aria-label="Planets">
        <Item key="earth">
            <Text>Earth</Text>
            <NotificationMajorIcon slot="end-icon" />
        </Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">
            <Text>Mars</Text>
            <IconList slot="end-icon">
                <LightbulbMajorIcon />
                <NotificationMajorIcon />
            </IconList>
        </Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </Menu>
);

ItemWithEndIcon.storyName = "item with end icon";

export const ItemWithAvatar = () => (
    <Menu aria-label="Planets">
        <Item key="earth">
            <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="Earth" />
            <Text>Earth</Text>
        </Item>
        <Item key="jupiter">
            <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="Jupiter" />
            <Text>Jupiter</Text>
        </Item>
        <Item key="mars">
            <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="Mars" />
            <Text>Mars</Text>
        </Item>
    </Menu>
);

ItemWithAvatar.storyName = "item with avatar";

export const ItemWithAvatarAndDescription = () => (
    <Menu aria-label="Planets">
        <Item key="earth">
            <Avatar name="Earth" />
            <Text>Earth</Text>
            <Text slot="description">Home Sweet Home</Text>
        </Item>
        <Item key="jupiter">
            <Avatar name="Jupiter" />
            <Text>Jupiter</Text>
            <Text slot="description">Jupiter did it!</Text>
        </Item>
        <Item key="mars">
            <Avatar name="Mars" />
            <Text>Mars</Text>
            <Text slot="description">Elon and Grimes are coming.</Text>
        </Item>
    </Menu>
);

ItemWithAvatarAndDescription.storyName = "item with avatar and description";

export const ItemWithDescription = () => (
    <Menu aria-label="Planets">
        <Item key="earth">
            <Text>Earth</Text>
            <Text slot="description">Home sweet home!</Text>
        </Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">
            <Text>Mars</Text>
            <Text slot="description">See you in 2026</Text>
        </Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </Menu>
);

ItemWithDescription.storyName = "item with description";

export const ItemOverflow = () => (
    <Inline>
        <Menu width={12} aria-label="Planets">
            <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Menu>
        <Menu defaultSelectedKeys={["0"]} selectionMode="single" width={12} aria-label="Planets">
            <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Menu>
    </Inline>
);

ItemOverflow.storyName = "item overflow";

export const ItemWithDescriptionOverflow = () => (
    <Inline>
        <Menu aria-label="Planets">
            <Item key="earth">
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <Text slot="description">Home sweet home!</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">
                <Avatar name="Mars" />
                <Text>Mars</Text>
                <Text slot="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </Item>
            <Item key="mercury">
                <Text>Mercury</Text>
                <Text slot="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
        <Menu defaultSelectedKeys={["earth", "mars", "mercury"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <Text slot="description">Home sweet home!</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">
                <Avatar name="Mars" />
                <Text>Mars</Text>
                <Text slot="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </Item>
            <Item key="mercury">
                <Text>Mercury</Text>
                <Text slot="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
    </Inline>
);

ItemWithDescriptionOverflow.storyName = "item with description overflow";

export const ItemWithDescriptionOverflowWhenFluid = () => (
    <Inline>
        <Menu fluid width={15} aria-label="Planets">
            <Item key="earth">
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <Text slot="description">Home sweet home!</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">
                <Text>Mars</Text>
                <Text slot="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
        <Menu defaultSelectedKeys={["earth", "mars"]} selectionMode="multiple" fluid width={15} aria-label="Planets">
            <Item key="earth">
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <Text slot="description">Home sweet home!</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">
                <Text>Mars</Text>
                <Text slot="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
    </Inline>
);

ItemWithDescriptionOverflowWhenFluid.storyName = "item with description overflow when fluid";

export const Fluid = () => (
    <Menu fluid aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Menu>
);

Fluid.storyName = "fluid";

export const ValidationState = () => (
    <Stack>
        <Inline>
            <Menu validationState="invalid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbMajorIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">
                    <LightbulbMajorIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
            <Menu validationState="valid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbMajorIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">
                    <LightbulbMajorIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
        </Inline>
        <Inline>
            <Menu validationState="invalid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbMajorIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item focus key="mars">
                    <LightbulbMajorIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
            <Menu validationState="valid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbMajorIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item focus key="mars">
                    <LightbulbMajorIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
        </Inline>
    </Stack>
);

ValidationState.storyName = "validation state";

export const States = () => (
    <Stack>
        <Inline>
            <Menu selectedKeys={["earth"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
            <Menu selectedKeys={["earth", "mars"]} selectionMode="multiple" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </Inline>
        <Inline>
            <Menu aria-label="Planets">
                <Item active key="earth">Earth</Item>
                <Item focus key="jupiter">Jupiter</Item>
                <Item hover key="mars">Mars</Item>
                <Item focus hover key="mercury">Mercury</Item>
                <Item disabled key="neptune">Neptune</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
            <Menu aria-label="Planets">
                <Item disabled key="neptune">Neptune</Item>
                <Item disabled active key="earth">Earth</Item>
                <Item disabled focus key="jupiter">Jupiter</Item>
                <Item disabled hover key="mars">Mars</Item>
                <Item disabled focus hover key="mercury">Mercury</Item>
            </Menu>
            <Menu selectionMode="single" aria-label="Planets">
                <Item active key="earth">Earth</Item>
                <Item focus key="jupiter">Jupiter</Item>
                <Item hover key="mars">Mars</Item>
                <Item focus hover key="mercury">Mercury</Item>
                <Item disabled key="neptune">Neptune</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
            <Menu selectionMode="single" aria-label="Planets">
                <Item disabled key="neptune">Neptune</Item>
                <Item disabled active key="earth">Earth</Item>
                <Item disabled focus key="jupiter">Jupiter</Item>
                <Item disabled hover key="mars">Mars</Item>
                <Item disabled focus hover key="mercury">Mercury</Item>
            </Menu>
        </Inline>
    </Stack>
);

States.storyName = "states";

export const DynamicItems = () => (
    <Menu aria-label="Planets">
        {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
            <Item key={x.toLowerCase()}>{x}</Item>
        ))}
    </Menu>
);

DynamicItems.storyName = "dynamic items";

const RedItem = ({ children, ...rest }) => {
    return (
        <MenuItem
            {...rest}
            color="red"
        >
            {children}
        </MenuItem>
    );
};

export const CustomItemComponent = () => (
    <Menu aria-label="Planets">
        <RedItem key="earth">Earth</RedItem>
        <RedItem key="jupiter">Jupiter</RedItem>
        <RedItem key="mars">Mars</RedItem>
    </Menu>
);

CustomItemComponent.storyName = "custom item component";

export const AdaptWidthToLargestItem = () => (
    <Menu aria-label="Planets">
        <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
        <Item>Jupiter</Item>
        <Item>Mars</Item>
    </Menu>
);

AdaptWidthToLargestItem.storyName = "adapt width to largest item";

export const CustomMenuWidth = () => (
    <Menu width={16} aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Menu>
);

CustomMenuWidth.storyName = "custom menu width";

export const ConditionalRendering = () => (
    <Menu aria-label="Planets">
        {false && <Item key="earth">Earth</Item>}
        <Item>Jupiter</Item>
        <Item>Mars</Item>
    </Menu>
);

ConditionalRendering.storyName = "conditional rendering";

export const ScrollingWithTooManyItems = () => (
    <Menu selectionMode="single" aria-label="Planets">
        <Item key="ceres">Ceres</Item>
        <Item key="charon">Charon</Item>
        <Item key="earth">Earth</Item>
        <Item key="eris">Eris</Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="haumea">Haumea</Item>
        <Item key="makemake">Makemake</Item>
        <Item key="mars">Mars</Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="pluto">Pluto</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
        <Item key="venus">Venus</Item>
    </Menu>
);

ScrollingWithTooManyItems.storyName = "scrolling with too many items";

export const ScrollingWithSections = () => (
    <Menu selectionMode="single" aria-label="Planets">
        <Section title="Visited">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Section>
        <Section title="Not Visited">
            <Item key="ceres">Ceres</Item>
            <Item key="charon">Charon</Item>
            <Item key="eris">Eris</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="haumea">Haumea</Item>
            <Item key="makemake">Makemake</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
            <Item key="venus">Venus</Item>
        </Section>
    </Menu>
);

ScrollingWithSections.storyName = "scrolling with sections";

ScrollingWithSections.args = {
    a11y: {
        config: {
            rules: [
                { id: "aria-required-children", enabled: false },
                { id: "aria-required-parent", enabled: false }
            ]
        }
    }
};

export const ScrollingWithDividers = () => (
    <Menu selectionMode="single" aria-label="Planets">
        <Item key="ceres">Ceres</Item>
        <Item key="charon">Charon</Item>
        <Item key="earth">Earth</Item>
        <Item key="eris">Eris</Item>
        <Item key="jupiter">Jupiter</Item>
        <Divider />
        <Item key="haumea">Haumea</Item>
        <Item key="makemake">Makemake</Item>
        <Item key="mars">Mars</Item>
        <Divider />
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="pluto">Pluto</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
        <Item key="venus">Venus</Item>
    </Menu>
);

ScrollingWithDividers.storyName = "scrolling with dividers";

export const ScrollingWithDescriptions = () => (
    <Menu selectionMode="single" aria-label="Planets">
        <Item key="earth">
            <Text>Earth</Text>
            <Text slot="description">Home sweet home!</Text>
        </Item>
        <Item key="mars">
            <Text>Mars</Text>
            <Text slot="description">See you in 2026</Text>
        </Item>
        <Item key="jupiter">
            <Text>Jupiter</Text>
            <Text slot="description">A description!</Text>
        </Item>
        <Item key="makemake">
            <Text>Makemake</Text>
            <Text slot="description">A description!</Text>
        </Item>
        <Item key="mercury">
            <Text>Mercury</Text>
            <Text slot="description">A description!</Text>
        </Item>
        <Item key="neptune">
            <Text>Neptune</Text>
            <Text slot="description">A description!</Text>
        </Item>
        <Item key="saturn">
            <Text>Saturn</Text>
            <Text slot="description">A description!</Text>
        </Item>
        <Item key="uranus">
            <Text>Uranus</Text>
            <Text slot="description">A description!</Text>
        </Item>
        <Item key="venus">
            <Text>Venus</Text>
            <Text slot="description">A description!</Text>
        </Item>
    </Menu>
);

ScrollingWithDescriptions.storyName = "scrolling with descriptions";

export const ScrollingMixMatch = () => (
    <Menu selectionMode="single" aria-label="Planets">
        <Section title="Visited">
            <Item key="earth">
                <Text>Earth</Text>
                <Text slot="description">Home sweet home!</Text>
            </Item>
            <Item key="mars">
                <Text>Mars</Text>
                <Text slot="description">See you in 2026</Text>
            </Item>
            <Item key="saturn">Saturn</Item>
        </Section>
        <Section title="Not Visited">
            <Item key="ceres">Ceres</Item>
            <Item key="charon">Charon</Item>
            <Divider />
            <Item key="eris">Eris</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="haumea">Haumea</Item>
            <Item key="makemake">Makemake</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
            <Item key="venus">Venus</Item>
        </Section>
    </Menu>
);

ScrollingMixMatch.storyName = "scrolling mix & match";

export const ScrollingWithCustomStyleHeight = () => (
    <Menu selectionMode="single" height={12} aria-label="Planets">
        <Item key="ceres">Ceres</Item>
        <Item key="charon">Charon</Item>
        <Item key="earth">Earth</Item>
        <Item key="eris">Eris</Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="haumea">Haumea</Item>
        <Item key="makemake">Makemake</Item>
        <Item key="mars">Mars</Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="pluto">Pluto</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
        <Item key="venus">Venus</Item>
    </Menu>
);

ScrollingWithCustomStyleHeight.storyName = "scrolling with custom style height";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
            <Menu aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Menu>
        </Div>
        <Div className="zoom-out">
            <Menu aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Menu>
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Inline>
        <Menu border="warning-7" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item border="warning-7" key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
        <Menu className="border-red" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item className="border-red" key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
        <Menu style={{ border: "1px solid red" }} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item style={{ border: "1px solid red" }} key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </Inline>
);

Styling.storyName = "styling";
