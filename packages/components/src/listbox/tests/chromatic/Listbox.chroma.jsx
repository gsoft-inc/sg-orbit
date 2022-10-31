import { Avatar } from "@components/avatar";
import { CheckCircleIcon, CrossIcon, IconList, LightbulbIcon, NotificationIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Item, Section } from "@components/collection";
import { Listbox, ListboxOption } from "@components/listbox";
import { Text } from "@components/typography";
import { useListboxContext } from "@components/listbox";

export default {
    title: "Chromatic/Listbox",
    component: Listbox,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const OnlyItems = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">Mars</Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </Listbox>;

export const GeneratedKeys = () =>
    <Listbox aria-label="Planets">
        <Item>Earth</Item>
        <Item>Jupiter</Item>
        <Item>Mars</Item>
    </Listbox>;

export const Sections = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const MixedSectionsAndItems = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
        <Section title="Not Visited">
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Section>
    </Listbox>;

export const SelectedKeys = () =>
    <Inline>
        <Listbox defaultSelectedKeys={["mars"]} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
        <Listbox defaultSelectedKeys={["mars", "neptune"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    </Inline>;

export const ItemWithStartIcon = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">
            <NotificationIcon />
            <Text>Earth</Text>
        </Item>
        <Item key="jupiter">
            <NotificationIcon />
            <Text>Jupiter</Text>
        </Item>
        <Item key="mars">
            <LightbulbIcon />
            <Text>Mars</Text>
        </Item>
        <Item key="mercury">
            <NotificationIcon />
            <Text>Mercury</Text>
        </Item>
        <Item key="neptune">
            <NotificationIcon />
            <Text>Neptune</Text>
        </Item>
        <Item key="saturn">
            <NotificationIcon />
            <Text>Saturn</Text>
        </Item>
        <Item key="uranus">
            <NotificationIcon />
            <Text>Uranus</Text>
        </Item>
    </Listbox>;

export const ItemWithStartIconAndDescription = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">
            <NotificationIcon />
            <Text>Earth</Text>
            <Text slot="description">Earth</Text>
        </Item>
        <Item key="jupiter">
            <NotificationIcon />
            <Text>Jupiter</Text>
            <Text slot="description">Jupiter</Text>
        </Item>
        <Item key="mars">
            <LightbulbIcon />
            <Text>Mars</Text>
            <Text slot="description">Mars</Text>
        </Item>
    </Listbox>;

export const ItemWithEndIcon = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ItemWithAvatar = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ItemWithAvatarAndDescription = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">
            <Avatar name="Earth" />
            <Text>Earth</Text>
            <Text slot="description">Earth</Text>
        </Item>
        <Item key="jupiter">
            <Avatar name="Jupiter" />
            <Text>Jupiter</Text>
            <Text slot="description">Jupiter</Text>
        </Item>
        <Item key="mars">
            <Avatar name="Mars" />
            <Text>Mars</Text>
            <Text slot="description">Mars</Text>
        </Item>
    </Listbox>;

export const ItemWithDescription = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ItemOverflow = () =>
    <Inline>
        <Listbox aria-label="Planets">
            <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Listbox>
        <Listbox defaultSelectedKeys={["0"]} aria-label="Planets">
            <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Listbox>
    </Inline>;

export const ItemWithDescriptionOverflow = () =>
    <Inline>
        <Listbox aria-label="Planets">
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
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
        <Listbox defaultSelectedKeys={["earth", "mars"]} selectionMode="multiple" aria-label="Planets">
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
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    </Inline>;

export const ItemWithDescriptionOverflowWhenFluid = () =>
    <Inline>
        <Listbox fluid width={15} aria-label="Planets">
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
        </Listbox>
        <Listbox defaultSelectedKeys={["earth", "mars"]} selectionMode="multiple" fluid width={15} aria-label="Planets">
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
        </Listbox>
    </Inline>;

export const Fluid = () =>
    <Listbox fluid aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Listbox>;

export const Validation = () =>
    <Stack>
        <Inline>
            <Listbox validationState="invalid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
            <Listbox validationState="valid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
        </Inline>
        <Inline>
            <Listbox validationState="invalid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
            <Listbox validationState="valid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
        </Inline>
    </Stack>;

export const States = () =>
    <Inline>
        <Listbox selectedKeys={["earth"]} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
        <Listbox selectedKeys={["earth", "mars"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
        <Listbox aria-label="Planets">
            <Item focus key="jupiter">Jupiter</Item>
            <Item hover key="mars">Mars</Item>
            <Item focus hover key="mercury">Mercury</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
        <Listbox aria-label="Planets">
            <Item disabled key="neptune">Neptune</Item>
            <Item disabled focus key="jupiter">Jupiter</Item>
            <Item disabled hover key="mars">Mars</Item>
            <Item disabled focus hover key="mercury">Mercury</Item>
        </Listbox>
    </Inline>;

export const ArrayMap = () =>
    <Listbox aria-label="Planets">
        {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
            <Item key={x.toLowerCase()}>{x}</Item>
        ))}
    </Listbox>;

const ActiveOption = ({ item, children, ...rest }) => {
    const { selectedKeys } = useListboxContext();
    const { key } = item;

    return (
        <ListboxOption
            {...rest}
            item={item}
        >
            {selectedKeys.includes(key) ? <CheckCircleIcon /> : <CrossIcon />}
            <Text>{children}</Text>
        </ListboxOption>
    );
};

export const CustomItemComponent = () =>
    <Listbox aria-label="Planets">
        <ActiveOption key="earth">Earth</ActiveOption>
        <ActiveOption key="jupiter">Jupiter</ActiveOption>
        <ActiveOption key="mars">Mars</ActiveOption>
    </Listbox>;

export const ScrollingWithTooManyOptions = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ScrollingWithSections = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ScrollingWithDescriptions = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ScrollingMixMmatch = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

export const ScrollingWithCustomStyleHeight = () =>
    <Listbox height={12} aria-label="Planets">
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
    </Listbox>;

export const CustomMenuWidth = () =>
    <Listbox width={16} aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Listbox>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <Listbox aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Listbox>

        </Div>
        <Div className="zoom-out">
            <Listbox aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Listbox>

        </Div>
    </Stack>;

export const Styling = () =>
    <Inline>
        <Listbox border="warning-7" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item border="warning-7" key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
        <Listbox className="border-red" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item className="border-red" key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
        <Listbox style={{ border: "1px solid red" }} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item style={{ border: "1px solid red" }} key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    </Inline>;

ScrollingWithSections.args = {
    a11y: {
        config: {
            rules: [
                { id: "aria-required-parent", enabled: false }
            ]
        }
    }
};

MixedSectionsAndItems.args = {
    a11y: {
        config: {
            rules: [
                { id: "aria-required-parent", enabled: false }
            ]
        }
    }
};

Sections.args = {
    a11y: {
        config: {
            rules: [
                { id: "label-title-only", enabled: false },
                { id: "aria-required-parent", enabled: false }
            ]
        }
    }
};

OnlyItems.storyName = "only items";
GeneratedKeys.storyName = "generated keys";
Sections.storyName = "sections";
MixedSectionsAndItems.storyName = "mixed sections and items";
SelectedKeys.storyName = "selected keys";
ItemWithStartIcon.storyName = "item with start icon";
ItemWithStartIconAndDescription.storyName = "item with start icon and description";
ItemWithEndIcon.storyName = "item with end icon";
ItemWithAvatar.storyName = "item with avatar";
ItemWithAvatarAndDescription.storyName = "item with avatar and description";
ItemWithDescription.storyName = "item with description";
ItemOverflow.storyName = "item overflow";
ItemWithDescriptionOverflow.storyName = "item with description overflow";
ItemWithDescriptionOverflowWhenFluid.storyName = "item with description overflow when fluid";
Fluid.storyName = "fluid";
Validation.storyName = "validation";
States.storyName = "states";
ArrayMap.storyName = "array map";
CustomItemComponent.storyName = "custom item component";
ScrollingWithTooManyOptions.storyName = "scrolling with too many options";
ScrollingWithSections.storyName = "scrolling with sections";
ScrollingWithDescriptions.storyName = "scrolling with descriptions";
ScrollingMixMmatch.storyName = "scrolling mix & match";
ScrollingWithCustomStyleHeight.storyName = "scrolling with custom style height";
CustomMenuWidth.storyName = "custom menu width";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
