import { Avatar } from "@components/avatar";
import { PlaceholderMajorIcon, CrossMajorIcon, IconList, LightbulbMajorIcon, NotificationMajorIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { CollectionItem, Item, Section } from "@components/collection";
import { useListboxContext, Listbox, ListboxOption, ListboxOptionProps } from "@components/listbox";
import { Text } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Listbox",
    component: Listbox,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof Listbox>;

type ListboxStory = ComponentStoryObj<typeof Listbox>;

export const OnlyItems: ListboxStory = {
    storyName: "only items",
    render: () => (
        <Listbox aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    )
};

export const GeneratedKeys: ListboxStory = {
    storyName: "generated keys",
    render: () => (
        <Listbox aria-label="Planets">
            <Item>Earth</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Listbox>
    )
};

export const Sections: ListboxStory = {
    storyName: "sections",
    render: () => (
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
        </Listbox>
    ),
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: "label-title-only", enabled: false },
                    { id: "aria-required-parent", enabled: false }
                ]
            }
        }
    }
};

export const MixedSectionsAndItems: ListboxStory = {
    storyName: "mixed sections and items",
    render: () => (
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
        </Listbox>
    ),
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: "aria-required-parent", enabled: false }
                ]
            }
        }
    }
};

export const SelectedKeys: ListboxStory = {
    storyName: "selected keys",
    render: () => (
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
        </Inline>
    )
};

export const ItemWithStartIcon: ListboxStory = {
    storyName: "item with start icon",
    render: () => (
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
        </Listbox>
    )
};

export const ItemWithStartIconAndDescription: ListboxStory = {
    storyName: "item with start icon and description",
    render: () => (
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
        </Listbox>
    )
};

export const ItemWithEndIcon: ListboxStory = {
    storyName: "item with end icon",
    render: () => (
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
        </Listbox>
    )
};

export const ItemWithAvatar: ListboxStory = {
    storyName: "item with avatar",
    render: () => (
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
        </Listbox>
    )
};

export const ItemWithAvatarAndDescription: ListboxStory = {
    storyName: "item with avatar and description",
    render: () => (
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
        </Listbox>
    )
};

export const ItemWithDescription: ListboxStory = {
    storyName: "item with description",
    render: () => (
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
        </Listbox>
    )
};

export const ItemOverflow: ListboxStory = {
    storyName: "item overflow",
    render: () => (
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
        </Inline>
    )
};

export const ItemWithDescriptionOverflow: ListboxStory = {
    storyName: "item with description overflow",
    render: () => (
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
        </Inline>
    )
};

export const ItemWithDescriptionOverflowWhenFluid: ListboxStory = {
    storyName: "item with description overflow when fluid",
    render: () => (
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
        </Inline>
    )
};

export const Fluid: ListboxStory = {
    storyName: "fluid",
    render: () => (
        <Listbox fluid aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
    )
};

export const Validation: ListboxStory = {
    storyName: "validation",
    render: () => (
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
        </Stack>
    )
};

export const States: ListboxStory = {
    storyName: "states",
    render: () => (
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
        </Inline>
    )
};

export const ArrayMap: ListboxStory = {
    storyName: "array map",
    render: () => (
        <Listbox aria-label="Planets">
            {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
                <Item key={x.toLowerCase()}>{x}</Item>
            ))}
        </Listbox>
    )
};

const ActiveOption = ({ item, children, ...rest }: Omit<ListboxOptionProps, "item"> & { item?: CollectionItem }) => {
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


export const CustomItemComponent: ListboxStory = {
    storyName: "custom item component",
    render: () => (
        <Listbox aria-label="Planets">
            <ActiveOption key="earth">Earth</ActiveOption>
            <ActiveOption key="jupiter">Jupiter</ActiveOption>
            <ActiveOption key="mars">Mars</ActiveOption>
        </Listbox>
    )
};

export const ScrollingWithTooManyOptions: ListboxStory = {
    storyName: "scrolling with too many options",
    render: () => (
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
        </Listbox>
    )
};

export const ScrollingWithSections: ListboxStory = {
    storyName: "scrolling with sections",
    render: () => (
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
        </Listbox>
    ),
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: "aria-required-parent", enabled: false }
                ]
            }
        }
    }
};

export const ScrollingWithDescriptions: ListboxStory = {
    storyName: "scrolling with descriptions",
    render: () => (
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
        </Listbox>
    )
};

export const ScrollingMixMmatch: ListboxStory = {
    storyName: "scrolling mix & match",
    render: () => (
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
        </Listbox>
    )
};

export const ScrollingWithCustomStyleHeight: ListboxStory = {
    storyName: "scrolling with custom style height",
    render: () => (
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
        </Listbox>
    )
};

export const CustomMenuWidth: ListboxStory = {
    storyName: "custom menu width",
    render: () => (
        <Listbox width={16} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
    )
};

export const Zoom: ListboxStory = {
    storyName: "zoom",
    render: () => (
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
        </Stack>
    )
};

export const Styling: ListboxStory = {
    storyName: "styling",
    render: () => (
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
        </Inline>
    )
};
