import { Avatar } from "@react-components/avatar";
import { Box } from "@react-components/box";
import { Divider } from "@react-components/divider";
import { IconList, LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Item, Section } from "@react-components/collection";
import { Menu, MenuItem } from "@react-components/menu";
import { Text } from "@react-components/typography";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Menu")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("only items", () =>
        <Menu aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    )
    .add("generated keys", () =>
        <Menu aria-label="Planets">
            <Item>Earth</Item>
            <Item>Mars</Item>
            <Item>Saturn</Item>
        </Menu>
    )
    .add("sections", () =>
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
    )
    .add("dividers", () =>
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
    )
    .add("mixed sections, items and dividers", () =>
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
    )
    .add("selected keys", () =>
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
    )
    .add("item with start icon", () =>
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
        </Menu>
    )
    .add("item with start icon and description", () =>
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
        </Menu>
    )
    .add("item with end icon", () =>
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
        </Menu>
    )
    .add("item with avatar", () =>
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
    )
    .add("item with avatar and description", () =>
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
    )
    .add("item with description", () =>
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
    )
    .add("item overflow", () =>
        <Inline>
            <Menu style={{ width: "150px" }} aria-label="Planets">
                <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
                <Item>Jupiter</Item>
                <Item>Mars</Item>
            </Menu>
            <Menu defaultSelectedKeys={["0"]} selectionMode="single" style={{ width: "150px" }} aria-label="Planets">
                <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
                <Item>Jupiter</Item>
                <Item>Mars</Item>
            </Menu>
        </Inline>
    )
    .add("item with description overflow", () =>
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
    )
    .add("item with description overflow when fluid", () =>
        <Inline>
            <Menu fluid style={{ width: "400px" }} aria-label="Planets">
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
            <Menu defaultSelectedKeys={["earth", "mars"]} selectionMode="multiple" fluid style={{ width: "400px" }} aria-label="Planets">
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
    )
    .add("fluid", () =>
        <Menu fluid aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    )
    .add("validation state", () =>
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
        </Stack>
    )
    .add("states", () =>
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
                <Menu selectionMode="single" aria-label="Planets">
                    <Item active key="earth">Earth</Item>
                    <Item focus key="jupiter">Jupiter</Item>
                    <Item hover key="mars">Mars</Item>
                    <Item focus hover key="mercury">Mercury</Item>
                    <Item disabled key="neptune">Neptune</Item>
                    <Item key="saturn">Saturn</Item>
                </Menu>
            </Inline>
        </Stack>
    )
    .add("dynamic items", () =>
        <Menu aria-label="Planets">
            {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
                <Item key={x.toLowerCase()}>{x}</Item>
            ))}
        </Menu>
    )
    .add("custom item component", () => {
        const RedItem = ({ children, ...rest }) => {
            return (
                <MenuItem
                    {...rest}
                    style={{ color: "red" }}
                >
                    {children}
                </MenuItem>
            );
        };

        return (
            <Menu aria-label="Planets">
                <RedItem key="earth">Earth</RedItem>
                <RedItem key="jupiter">Jupiter</RedItem>
                <RedItem key="mars">Mars</RedItem>
            </Menu>
        );
    })
    .add("custom as", () => {
        const RedItem = ({ children, ...rest }) => {
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
            <Menu aria-label="Planets">
                <Item as={RedItem} key="earth">Earth</Item>
                <Item as={RedItem} key="jupiter">Jupiter</Item>
                <Item as={RedItem} key="mars">Mars</Item>
            </Menu>
        );
    })
    .add("adapt width to largest item", () =>
        <Menu aria-label="Planets">
            <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Menu>
    )
    .add("custom menu width", () =>
        <Menu style={{ width: "500px" }} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    )
    .add("conditional rendering", () =>
        <Menu aria-label="Planets">
            {false && <Item key="earth">Earth</Item>}
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Menu>
    )
    .add("scrolling with too many items", () =>
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
    )
    .add("scrolling with sections", () =>
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
        </Menu>,
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
    .add("scrolling with dividers", () =>
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
    )
    .add("scrolling with descriptions", () =>
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
    )
    .add("scrolling mix & match", () =>
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
    )
    .add("scrolling with custom style height", () =>
        <Menu selectionMode="single" style={{ height: "200px" }} aria-label="Planets">
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
    )
    .add("styling", () =>
        <Inline>
            <Menu className="border-red" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Menu>
            <Menu style={{ border: "1px solid red" }} aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Menu>
        </Inline>
    );

