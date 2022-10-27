import { Avatar } from "@components/avatar";
import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { IconList, LightbulbIcon, NotificationIcon } from "@components/icons";
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

export const OnlyItems = () =>
    <Menu aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Menu>;

export const GeneratedKeys = () =>
    <Menu aria-label="Planets">
        <Item>Earth</Item>
        <Item>Mars</Item>
        <Item>Saturn</Item>
    </Menu>;

export const Sections = () =>
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
    </Menu>;

export const Dividers = () =>
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
    </Menu>;

export const MixedSectionsItemsAndDividers = () =>
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
    </Menu>;

export const SelectedKeys = () =>
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
    </Inline>;

export const ItemWithStartIcon = () =>
    <Menu aria-label="Planets">
        <Item key="earth">
            <NotificationIcon />
            <Text>Earth</Text>
        </Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">
            <IconList>
                <LightbulbIcon />
                <NotificationIcon />
            </IconList>
            <Text>Mars</Text>
        </Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </Menu>;

export const ItemWithStartIconAndDescription = () =>
    <Menu aria-label="Planets">
        <Item key="earth">
            <NotificationIcon />
            <Text>Earth</Text>
            <Text slot="description">Home Sweet Home</Text>
        </Item>
        <Item key="jupiter">
            <NotificationIcon />
            <Text>Jupiter</Text>
            <Text slot="description">Jupiter did it!</Text>
        </Item>
        <Item key="mars">
            <LightbulbIcon />
            <Text>Mars</Text>
            <Text slot="description">Elon and Grimes are coming.</Text>
        </Item>
    </Menu>;

export const ItemWithEndIcon = () =>
    <Menu aria-label="Planets">
        <Item key="earth">
            <Text>Earth</Text>
            <NotificationIcon slot="end-icon" />
        </Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">
            <Text>Mars</Text>
            <IconList slot="end-icon">
                <LightbulbIcon />
                <NotificationIcon />
            </IconList>
        </Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </Menu>;

export const ItemWithAvatar = () =>
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
    </Menu>;

export const itemWithAvatarAndDescription = () =>
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
    </Menu>;

export const ItemWithDescription = () =>
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
    </Menu>;

export const ItemOverflow = () =>
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
    </Inline>;

export const ItemWithDescriptionOverflow = () =>
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
    </Inline>;

export const ItemWithDescriptionOverflowWhenFluid = () =>
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
    </Inline>;

export const Fluid = () =>
    <Menu fluid aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Menu>;

export const ValidationState = () =>
    <Stack>
        <Inline>
            <Menu validationState="invalid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">
                    <LightbulbIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
            <Menu validationState="valid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">
                    <LightbulbIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
        </Inline>
        <Inline>
            <Menu validationState="invalid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item focus key="mars">
                    <LightbulbIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
            <Menu validationState="valid" selectedKeys={["mars"]} selectionMode="single" aria-label="Planets">
                <Item key="earth">
                    <LightbulbIcon />
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="jupiter">Jupiter</Item>
                <Item focus key="mars">
                    <LightbulbIcon />
                    <Text>Mars</Text>
                    <Text slot="description">See you in 2026</Text>
                </Item>
            </Menu>
        </Inline>
    </Stack>;

export const States = () =>
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
    </Stack>;

export const DynamicItems = () =>
    <Menu aria-label="Planets">
        {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
            <Item key={x.toLowerCase()}>{x}</Item>
        ))}
    </Menu>;

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

export const CustomItemComponent = () =>
    <Menu aria-label="Planets">
        <RedItem key="earth">Earth</RedItem>
        <RedItem key="jupiter">Jupiter</RedItem>
        <RedItem key="mars">Mars</RedItem>
    </Menu>;

export const AdaptWidthToLargestItem = () =>
    <Menu aria-label="Planets">
        <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
        <Item>Jupiter</Item>
        <Item>Mars</Item>
    </Menu>;

export const CustomMenuWidth = () =>
    <Menu width={16} aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Menu>;

export const ConditionalRendering = () =>
    <Menu aria-label="Planets">
        {false && <Item key="earth">Earth</Item>}
        <Item>Jupiter</Item>
        <Item>Mars</Item>
    </Menu>;

export const ScrollingWithTooManyItems = () =>
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
    </Menu>;

export const ScrollingWithSections = () =>
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
    </Menu>;

export const ScrollingWithDividers = () =>
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
    </Menu>;

export const ScrollingWithDescriptions = () =>
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
    </Menu>;

export const scrollingMixMatch = () =>
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
    </Menu>;

export const ScrollingWithCustomStyleHeight = () =>
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
    </Menu>;

export const Zoom = () =>
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
    </Stack>;

export const Styling = () =>
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
    </Inline>;

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

OnlyItems.storyName = "only items";
GeneratedKeys.storyName = "generated keys";
Sections.storyName = "sections";
Dividers.storyName = "dividers";
MixedSectionsItemsAndDividers.storyName = "mixed sections, items and dividers";
SelectedKeys.storyName = "selected keys";
ItemWithStartIcon.storyName = "item with start icon";
ItemWithStartIconAndDescription.storyName = "item with start icon and description";
ItemWithEndIcon.storyName = "item with end icon";
ItemWithAvatar.storyName = "item with avatar";
itemWithAvatarAndDescription.storyName = "item with avatar and description";
ItemWithDescription.storyName = "item with description";
ItemOverflow.storyName = "item overflow";
ItemWithDescriptionOverflow.storyName = "item with description overflow";
ItemWithDescriptionOverflowWhenFluid.storyName = "item with description overflow when fluid";
Fluid.storyName = "fluid";
ValidationState.storyName = "validation state";
States.storyName = "states";
DynamicItems.storyName = "dynamic items";
CustomItemComponent.storyName = "custom item component";
AdaptWidthToLargestItem.storyName = "adapt width to largest item";
CustomMenuWidth.storyName = "custom menu width";
ConditionalRendering.storyName = "conditional rendering";
ScrollingWithTooManyItems.storyName = "scrolling with too many items";
ScrollingWithSections.storyName = "scrolling with sections";
ScrollingWithDividers.storyName = "scrolling with dividers";
ScrollingWithDescriptions.storyName = "scrolling with descriptions";
scrollingMixMatch.storyName = "scrolling mix & match";
ScrollingWithCustomStyleHeight.storyName = "scrolling with custom style height";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
