import { Avatar } from "@components/avatar";
import { PlaceholderMajorIcon, CrossMajorIcon, IconList, LightbulbMajorIcon, NotificationMajorIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Item, Section } from "@components/collection";
import { useListboxContext, Listbox, ListboxOption } from "@components/listbox";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Listbox",
    component: Listbox,
    parameters: {
        chromatic: {
            delay: 100
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

OnlyItems.storyName = "only items";

export const GeneratedKeys = () =>
    <Listbox aria-label="Planets">
        <Item>Earth</Item>
        <Item>Jupiter</Item>
        <Item>Mars</Item>
    </Listbox>;

GeneratedKeys.storyName = "generated keys";

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

Sections.storyName = "sections";

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

MixedSectionsAndItems.args = {
    a11y: {
        config: {
            rules: [
                { id: "aria-required-parent", enabled: false }
            ]
        }
    }
};

MixedSectionsAndItems.storyName = "mixed sections and items";

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

SelectedKeys.storyName = "selected keys";

export const ItemWithStartIcon = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">
            <NotificationMajorIcon />
            <Text>Earth</Text>
        </Item>
        <Item key="jupiter">
            <NotificationMajorIcon />
            <Text>Jupiter</Text>
        </Item>
        <Item key="mars">
            <LightbulbMajorIcon />
            <Text>Mars</Text>
        </Item>
        <Item key="mercury">
            <NotificationMajorIcon />
            <Text>Mercury</Text>
        </Item>
        <Item key="neptune">
            <NotificationMajorIcon />
            <Text>Neptune</Text>
        </Item>
        <Item key="saturn">
            <NotificationMajorIcon />
            <Text>Saturn</Text>
        </Item>
        <Item key="uranus">
            <NotificationMajorIcon />
            <Text>Uranus</Text>
        </Item>
    </Listbox>;

ItemWithStartIcon.storyName = "item with start icon";

export const ItemWithStartIconAndDescription = () =>
    <Listbox aria-label="Planets">
        <Item key="earth">
            <NotificationMajorIcon />
            <Text>Earth</Text>
            <Text slot="description">Earth</Text>
        </Item>
        <Item key="jupiter">
            <NotificationMajorIcon />
            <Text>Jupiter</Text>
            <Text slot="description">Jupiter</Text>
        </Item>
        <Item key="mars">
            <LightbulbMajorIcon />
            <Text>Mars</Text>
            <Text slot="description">Mars</Text>
        </Item>
    </Listbox>;

ItemWithStartIconAndDescription.storyName = "item with start icon and description";

export const ItemWithEndIcon = () =>
    <Listbox aria-label="Planets">
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
    </Listbox>;

ItemWithEndIcon.storyName = "item with end icon";

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

ItemWithAvatar.storyName = "item with avatar";

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

ItemWithAvatarAndDescription.storyName = "item with avatar and description";

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

ItemWithDescription.storyName = "item with description";

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

ItemOverflow.storyName = "item overflow";

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

ItemWithDescriptionOverflow.storyName = "item with description overflow";

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

ItemWithDescriptionOverflowWhenFluid.storyName = "item with description overflow when fluid";

export const Fluid = () =>
    <Listbox fluid aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Listbox>;

Fluid.storyName = "fluid";

export const Validation = () =>
    <Stack>
        <Inline>
            <Listbox validationState="invalid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
            <Listbox validationState="valid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
        </Inline>
        <Inline>
            <Listbox validationState="invalid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
            <Listbox validationState="valid" defaultSelectedKeys={["mars"]} aria-label="Planets">
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
            </Listbox>
        </Inline>
    </Stack>;

Validation.storyName = "validation";

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

States.storyName = "states";

export const ArrayMap = () =>
    <Listbox aria-label="Planets">
        {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
            <Item key={x.toLowerCase()}>{x}</Item>
        ))}
    </Listbox>;

ArrayMap.storyName = "array map";

const ActiveOption = ({ item, children, ...rest }) => {
    const { selectedKeys } = useListboxContext();
    const { key } = item;

    return (
        <ListboxOption
            {...rest}
            item={item}
        >
            {selectedKeys.includes(key) ? <PlaceholderMajorIcon /> : <CrossMajorIcon />}
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

CustomItemComponent.storyName = "custom item component";

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

ScrollingWithTooManyOptions.storyName = "scrolling with too many options";

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

ScrollingWithSections.args = {
    a11y: {
        config: {
            rules: [
                { id: "aria-required-parent", enabled: false }
            ]
        }
    }
};

ScrollingWithSections.storyName = "scrolling with sections";

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

ScrollingWithDescriptions.storyName = "scrolling with descriptions";

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

ScrollingMixMmatch.storyName = "scrolling mix & match";

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

ScrollingWithCustomStyleHeight.storyName = "scrolling with custom style height";

export const CustomMenuWidth = () =>
    <Listbox width={16} aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="mars">Mars</Item>
        <Item key="saturn">Saturn</Item>
    </Listbox>;

CustomMenuWidth.storyName = "custom menu width";

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

Zoom.storyName = "zoom";

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

Styling.storyName = "styling";
