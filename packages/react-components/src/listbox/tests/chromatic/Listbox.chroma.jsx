import { Avatar } from "@react-components/avatar";
import { Box } from "@react-components/box";
import { CheckCircleIcon, CrossIcon, IconList, LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Item, Section } from "@react-components/collection";
import { Listbox, ListboxOption } from "@react-components/listbox";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useListboxContext } from "@react-components/listbox";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Listbox")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("test", () =>
        <Listbox aria-label="Planets" onFocusChange={() => { console.log("bla"); }}>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    )
    .add("only items", () =>
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
    .add("generated keys", () =>
        <Listbox aria-label="Planets">
            <Item>Earth</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Listbox>
    )
    .add("sections", () =>
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
        </Listbox>,
         {
             ...paramsBuilder()
                 .a11y({
                     config: {
                         rules: [
                             { id: "aria-required-children", enabled: false },
                             { id: "aria-required-parent", enabled: false }
                         ]
                     }
                 })
                 .build()
         }
    )
    .add("mixed sections and items", () =>
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
        </Listbox>,
         {
             ...paramsBuilder()
                 .a11y({
                     config: {
                         rules: [
                             { id: "aria-required-parent", enabled: false }
                         ]
                     }
                 })
                 .build()
         }
    )
    .add("selected keys", () =>
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
    .add("item with start icon", () =>
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
        </Listbox>
    )
    .add("item with start icon and description", () =>
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
        </Listbox>
    )
    .add("item with end icon", () =>
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
        </Listbox>
    )
    .add("item with avatar", () =>
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
    .add("item with avatar and description", () =>
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
    .add("item with description", () =>
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
    .add("item overflow", () =>
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
    .add("item with description overflow", () =>
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
    .add("item with description overflow when fluid", () =>
        <Inline>
            <Listbox fluid style={{ width: "400px" }} aria-label="Planets">
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
            <Listbox defaultSelectedKeys={["earth", "mars"]} selectionMode="multiple" fluid style={{ width: "400px" }} aria-label="Planets">
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
    .add("fluid", () =>
        <Listbox fluid aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
    )
    .add("validation", () =>
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
        </Stack>
    )
    .add("states", () =>
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
                <Item disabled key="neptune">Neptune</Item>
                <Item key="saturn">Saturn</Item>
            </Listbox>
        </Inline>
    )
    .add("array map", () =>
        <Listbox aria-label="Planets">
            {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
                <Item key={x.toLowerCase()}>{x}</Item>
            ))}
        </Listbox>
    )
    .add("custom item component", () => {
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

        return (
            <Listbox aria-label="Planets">
                <ActiveOption key="earth">Earth</ActiveOption>
                <ActiveOption key="jupiter">Jupiter</ActiveOption>
                <ActiveOption key="mars">Mars</ActiveOption>
            </Listbox>
        );
    })
    .add("custom as", () => {
        const RedOption = ({ children, ...rest }) => {
            return (
                <Box
                    {...rest}
                    style={{ color: "red" }}
                >
                    {children}
                </Box>
            );
        };

        return (
            <Listbox aria-label="Planets">
                <Item as={RedOption} key="earth">Earth</Item>
                <Item as={RedOption} key="jupiter">Jupiter</Item>
                <Item as={RedOption} key="mars">Mars</Item>
            </Listbox>
        );
    })
    .add("scrolling", () =>
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
    .add("custom menu width", () =>
        <Listbox style={{ width: "500px" }} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Listbox>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Listbox className="border-red" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Listbox>
                <Listbox style={{ border: "1px solid red" }} aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Listbox>
            </Inline>
            <Inline>
                <Listbox aria-label="Planets">
                    <Item className="border-red" key="earth">Earth</Item>
                    <Item style={{ border: "1px solid red" }} key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Listbox>
            </Inline>
        </Stack>
    );
