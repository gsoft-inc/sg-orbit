import { Autocomplete } from "@react-components/autocomplete";
import { Button, IconButton } from "@react-components/button";
import { DateInput, DateRangeInput } from "@react-components/date-input";
import { DisclosureArrow } from "@react-components/disclosure";
import { Inline, Stack } from "@react-components/layout";
import { InputGroup } from "@react-components/input-group";
import { Item } from "@react-components/collection";
import { LightbulbIcon } from "@react-components/icons";
import { Menu, MenuTrigger } from "@react-components/menu";
import { NumberInput } from "@react-components/number-input";
import { PasswordInput, SearchInput, TextInput } from "@react-components/text-input";
import { Select } from "@react-components/select";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/InputGroup")
        .segment(segment)
        .parameters(paramsBuilder()
            .build())
        .build();
}

stories()
    .add("text addon", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>Days</Text>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Text>Days</Text>
                </InputGroup>
                <InputGroup>
                    <Text>Launching in</Text>
                    <TextInput />
                    <Text>Days</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>Days</Text>
                    <TextInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>Days</Text>
                    <TextInput />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("button addon", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Button>Trigger</Button>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Button>Copy</Button>
                </InputGroup>
                <InputGroup>
                    <Button>Trigger</Button>
                    <TextInput />
                    <Button>Copy</Button>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <Button variant="solid">Copy</Button>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Button color="primary">Copy</Button>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <TextInput />
                    <Button>Copy</Button>
                </InputGroup>
                <InputGroup readOnly>
                    <TextInput />
                    <Button>Copy</Button>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <Button active>Copy</Button>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Button focus>Copy</Button>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Button hover>Copy</Button>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <Button focus hover>Copy</Button>
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("icon button addon", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <IconButton><LightbulbIcon /></IconButton>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <IconButton><LightbulbIcon /></IconButton>
                </InputGroup>
                <InputGroup>
                    <IconButton><LightbulbIcon /></IconButton>
                    <TextInput />
                    <IconButton><LightbulbIcon /></IconButton>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <IconButton variant="solid"><LightbulbIcon /></IconButton>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <IconButton color="primary"><LightbulbIcon /></IconButton>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <TextInput />
                    <IconButton><LightbulbIcon /></IconButton>
                </InputGroup>
                <InputGroup readOnly>
                    <TextInput />
                    <IconButton><LightbulbIcon /></IconButton>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <IconButton active><LightbulbIcon /></IconButton>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <IconButton focus><LightbulbIcon /></IconButton>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <IconButton hover><LightbulbIcon /></IconButton>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <IconButton focus hover><LightbulbIcon /></IconButton>
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("menu addon", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <MenuTrigger>
                        <Button>Trigger</Button>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <MenuTrigger>
                        <IconButton><DisclosureArrow /></IconButton>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                    <TextInput />
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <MenuTrigger>
                        <Button>Trigger</Button>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <MenuTrigger>
                        <IconButton><DisclosureArrow /></IconButton>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                </InputGroup>
            </Inline>
            <InputGroup>
                <MenuTrigger>
                    <Button>Trigger</Button>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput />
                <MenuTrigger>
                    <IconButton><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
            </InputGroup>
            <Inline>
                <InputGroup disabled>
                    <MenuTrigger>
                        <Button>Trigger</Button>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                    <TextInput />
                </InputGroup>
                <InputGroup readOnly>
                    <MenuTrigger>
                        <Button>Trigger</Button>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                    <TextInput />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("select addon", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Select aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <Select placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <TextInput />
                    <Select aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Select placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                </InputGroup>
            </Inline>
            <InputGroup>
                <Select placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput />
                <Select placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </InputGroup>
            <Inline>
                <InputGroup disabled>
                    <Select placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Select placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup>
                    <Select active placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <Select focus placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <Select hover placeholder="Planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput />
                </InputGroup>
            </Inline>
            <InputGroup>
                <Select focus hover placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput />
            </InputGroup>
        </Stack>
    )
    .add("placeholder", () =>
        <InputGroup>
            <Text>Launching in</Text>
            <TextInput placeholder="Ex. 8" />
            <Text>Days</Text>
        </InputGroup>
    )
    .add("fluid", () =>
        <InputGroup fluid>
            <Text>Launching in</Text>
            <TextInput />
            <Text>Days</Text>
        </InputGroup>
    )
    .add("states", () =>
        <Stack>
            <InputGroup disabled>
                <TextInput />
                <Text>Days</Text>
            </InputGroup>
            <InputGroup readOnly>
                <TextInput />
                <Text>Days</Text>
            </InputGroup>
        </Stack>
    )
    .add("text input", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>Days</Text>
                    <TextInput />
                </InputGroup>
                <InputGroup>
                    <TextInput />
                    <Text>Days</Text>
                </InputGroup>
                <InputGroup>
                    <Text>Launching in</Text>
                    <TextInput />
                    <Text>Days</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>Days</Text>
                    <TextInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>Days</Text>
                    <TextInput />
                </InputGroup>
                <InputGroup >
                    <Text>Days</Text>
                    <TextInput focus />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("number input", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>Days</Text>
                    <NumberInput />
                </InputGroup>
                <InputGroup>
                    <NumberInput />
                    <Text>Days</Text>
                </InputGroup>
                <InputGroup>
                    <Text>Launching in</Text>
                    <NumberInput />
                    <Text>Days</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>Days</Text>
                    <NumberInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>Days</Text>
                    <NumberInput />
                </InputGroup>
                <InputGroup>
                    <Text>Days</Text>
                    <NumberInput focus />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("password input", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>Access key</Text>
                    <PasswordInput />
                </InputGroup>
                <InputGroup>
                    <PasswordInput />
                    <Text>Access key</Text>
                </InputGroup>
                <InputGroup>
                    <Text>Your</Text>
                    <PasswordInput />
                    <Text>Access key</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>Access key</Text>
                    <PasswordInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>Access key</Text>
                    <PasswordInput />
                </InputGroup>
                <InputGroup>
                    <Text>Access key</Text>
                    <PasswordInput focus />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("search input", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>Origin</Text>
                    <SearchInput />
                </InputGroup>
                <InputGroup>
                    <SearchInput />
                    <Text>Origin</Text>
                </InputGroup>
                <InputGroup>
                    <Text>I am from the</Text>
                    <SearchInput />
                    <Text>Planet</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>Origin</Text>
                    <SearchInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>Origin</Text>
                    <SearchInput />
                </InputGroup>
                <InputGroup>
                    <Text>Origin</Text>
                    <SearchInput focus />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("date input", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>When</Text>
                    <DateInput />
                </InputGroup>
                <InputGroup>
                    <DateInput />
                    <Text>When</Text>
                </InputGroup>
                <InputGroup>
                    <Text>When</Text>
                    <DateInput />
                    <Text>When</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>When</Text>
                    <DateInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>When</Text>
                    <DateInput />
                </InputGroup>
                <InputGroup>
                    <Text>When</Text>
                    <DateInput focus />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("date range input", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>When</Text>
                    <DateRangeInput />
                </InputGroup>
                <InputGroup>
                    <DateRangeInput />
                    <Text>When</Text>
                </InputGroup>
                <InputGroup>
                    <Text>When</Text>
                    <DateRangeInput />
                    <Text>When</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>When</Text>
                    <DateRangeInput />
                </InputGroup>
                <InputGroup readOnly>
                    <Text>When</Text>
                    <DateRangeInput />
                </InputGroup>
                <InputGroup>
                    <Text>When</Text>
                    <DateRangeInput focus />
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("autocomplete", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <Text>Origin</Text>
                    <Autocomplete>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                        <Item key="jupiter">Jupiter</Item>
                    </Autocomplete>
                </InputGroup>
                <InputGroup>
                    <Autocomplete>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                        <Item key="jupiter">Jupiter</Item>
                    </Autocomplete>
                    <Text>Origin</Text>
                </InputGroup>
                <InputGroup>
                    <Text>Origin</Text>
                    <Autocomplete>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                        <Item key="jupiter">Jupiter</Item>
                    </Autocomplete>
                    <Text>Origin</Text>
                </InputGroup>
            </Inline>
            <Inline>
                <InputGroup disabled>
                    <Text>Origin</Text>
                    <Autocomplete>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                        <Item key="jupiter">Jupiter</Item>
                    </Autocomplete>
                </InputGroup>
                <InputGroup readOnly>
                    <Text>Origin</Text>
                    <Autocomplete>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                        <Item key="jupiter">Jupiter</Item>
                    </Autocomplete>
                </InputGroup>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <InputGroup className="border-red">
                <Text>Days</Text>
                <TextInput />
            </InputGroup>
            <InputGroup style={{ border: "1px solid red" }}>
                <Text>Days</Text>
                <TextInput />
            </InputGroup>
        </Inline>
    );
