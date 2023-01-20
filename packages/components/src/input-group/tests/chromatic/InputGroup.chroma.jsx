import { Autocomplete } from "@components/autocomplete";
import { Button, IconButton } from "@components/button";
import { DateInput, DateRangeInput } from "@components/date-input";
import { DisclosureArrow } from "@components/disclosure";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { InputGroup } from "@components/input-group";
import { Item } from "@components/collection";
import { LightbulbMajorIcon } from "@components/icons";
import { Menu, MenuTrigger } from "@components/menu";
import { NumberInput } from "@components/number-input";
import { PasswordInput, SearchInput, TextInput } from "@components/text-input";
import { Select } from "@components/select";
import { Text } from "@components/typography";
import { subMonths, subWeeks } from "date-fns";

export default {
    title: "Chromatic/InputGroup",
    component: InputGroup
};

export const TextAddon = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
            <InputGroup>
                <Text>Launching in</Text>
                <TextInput aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>Days</Text>
                <TextInput validationState="invalid" aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <TextInput validationState="invalid" aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
        </Inline>
    </Stack>
);

TextAddon.storyName = "text addon";

export const ButtonAddon = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Button variant="secondary">Trigger</Button>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button variant="secondary">Copy</Button>
            </InputGroup>
            <InputGroup>
                <Button variant="secondary">Trigger</Button>
                <TextInput aria-label="Duration" />
                <Button variant="secondary">Copy</Button>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button variant="primary">Copy</Button>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button variant="secondary">Copy</Button>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button variant="negative">Copy</Button>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <TextInput aria-label="Duration" />
                <Button variant="secondary">Copy</Button>
            </InputGroup>
            <InputGroup readOnly>
                <TextInput aria-label="Duration" />
                <Button variant="secondary">Copy</Button>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button active variant="secondary">Copy</Button>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button focus variant="secondary">Copy</Button>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button hover variant="secondary">Copy</Button>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Button focus hover variant="secondary">Copy</Button>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput validationState="invalid" aria-label="Duration" />
                <Button variant="secondary">Copy</Button>
            </InputGroup>
            <InputGroup>
                <Button variant="secondary">Copy</Button>
                <TextInput validationState="invalid" aria-label="Duration" />
            </InputGroup>
        </Inline>
    </Stack>
);

ButtonAddon.storyName = "button addon";

export const IconButtonAddon = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup>
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
                <TextInput aria-label="Duration" />
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton variant="primary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton variant="negative" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <TextInput aria-label="Duration" />
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup readOnly>
                <TextInput aria-label="Duration" />
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton active variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton focus variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton hover variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <IconButton focus hover variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput validationState="invalid" aria-label="Duration" />
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
            </InputGroup>
            <InputGroup>
                <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
                <TextInput validationState="invalid" aria-label="Duration" />
            </InputGroup>
        </Inline>
    </Stack>
);

IconButtonAddon.storyName = "icon button addon";

export const MenuAddon = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <MenuTrigger>
                    <Button variant="secondary">Trigger</Button>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput aria-label="Duration" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <MenuTrigger>
                    <Button variant="secondary">Trigger</Button>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
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
                <Button variant="secondary">Trigger</Button>
                <Menu aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Menu>
            </MenuTrigger>
            <TextInput aria-label="Duration" />
            <MenuTrigger>
                <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
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
                    <Button variant="secondary">Trigger</Button>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup disabled>
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup disabled>
                <TextInput aria-label="Planet" />
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup readOnly>
                <MenuTrigger>
                    <Button variant="secondary">Trigger</Button>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup readOnly>
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup readOnly>
                <TextInput aria-label="Planet" />
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput validationState="invalid" aria-label="Planet" />
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
            </InputGroup>
            <InputGroup>
                <MenuTrigger>
                    <IconButton variant="secondary" aria-label="Select a planet"><DisclosureArrow /></IconButton>
                    <Menu aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput validationState="invalid" aria-label="Planet" />
            </InputGroup>
        </Inline>
    </Stack>
);

MenuAddon.storyName = "menu addon";

export const SelectAddon = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Select aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup>
                <Select placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput aria-label="Planet" />
                <Select aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Planet" />
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
            <TextInput aria-label="Planet" />
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
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup readOnly>
                <Select placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Select active placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup>
                <Select focus placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
            <InputGroup>
                <Select hover placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Select focus hover placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput aria-label="Planet" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <TextInput validationState="invalid" aria-label="Planet" />
                <Select placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </InputGroup>
            <InputGroup>
                <Select placeholder="Planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <TextInput validationState="invalid" aria-label="Planet" />
            </InputGroup>
        </Inline>
    </Stack>
);

SelectAddon.storyName = "select addon";

export const Placeholder = () => (
    <InputGroup>
        <Text>Launching in</Text>
        <TextInput placeholder="Ex. 8" />
        <Text>Days</Text>
    </InputGroup>
);

Placeholder.storyName = "placeholder";

export const Fluid = () => (
    <InputGroup fluid>
        <Text>Launching in</Text>
        <TextInput aria-label="Duration" />
        <Text>Days</Text>
    </InputGroup>
);

Fluid.storyName = "fluid";

export const States = () => (
    <Stack>
        <InputGroup disabled>
            <TextInput aria-label="Duration" />
            <Text>Days</Text>
        </InputGroup>
        <InputGroup readOnly>
            <TextInput aria-label="Duration" />
            <Text>Days</Text>
        </InputGroup>
    </Stack>
);

States.storyName = "states";

export const InputGroupTextInput = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <TextInput aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
            <InputGroup>
                <Text>Launching in</Text>
                <TextInput aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup >
                <Text>Days</Text>
                <TextInput aria-label="Duration" focus />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>Days</Text>
                <TextInput validationState="invalid" aria-label="Duration" />
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupTextInput.storyName = "text input";

export const InputGroupNumberInput = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>Days</Text>
                <NumberInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <NumberInput aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
            <InputGroup>
                <Text>Launching in</Text>
                <NumberInput aria-label="Duration" />
                <Text>Days</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>Days</Text>
                <NumberInput aria-label="Duration" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>Days</Text>
                <NumberInput aria-label="Duration" />
            </InputGroup>
            <InputGroup>
                <Text>Days</Text>
                <NumberInput focus aria-label="Duration" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>Days</Text>
                <NumberInput validationState="invalid" aria-label="Duration" />
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupNumberInput.storyName = "number input";

export const InputGroupPasswordInput = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>Access key</Text>
                <PasswordInput aria-label="Password" />
            </InputGroup>
            <InputGroup>
                <PasswordInput aria-label="Password" />
                <Text>Access key</Text>
            </InputGroup>
            <InputGroup>
                <Text>Your</Text>
                <PasswordInput aria-label="Password" />
                <Text>Access key</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>Access key</Text>
                <PasswordInput aria-label="Password" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>Access key</Text>
                <PasswordInput aria-label="Password" />
            </InputGroup>
            <InputGroup>
                <Text>Access key</Text>
                <PasswordInput focus aria-label="Password" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>Access key</Text>
                <PasswordInput validationState="invalid" aria-label="Password" />
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupPasswordInput.storyName = "password input";

export const InputGroupSearchInput = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>Origin</Text>
                <SearchInput aria-label="Origin" />
            </InputGroup>
            <InputGroup>
                <SearchInput aria-label="Origin" />
                <Text>Origin</Text>
            </InputGroup>
            <InputGroup>
                <Text>I am from the</Text>
                <SearchInput aria-label="Origin" />
                <Text>Planet</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>Origin</Text>
                <SearchInput aria-label="Origin" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>Origin</Text>
                <SearchInput aria-label="Origin" />
            </InputGroup>
            <InputGroup>
                <Text>Origin</Text>
                <SearchInput focus aria-label="Origin" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>Origin</Text>
                <SearchInput validationState="invalid" aria-label="Origin" />
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupSearchInput.storyName = "search input";

export const InputGroupDateInput = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>When</Text>
                <DateInput aria-label="Date" />
            </InputGroup>
            <InputGroup>
                <DateInput aria-label="Date" />
                <Text>When</Text>
            </InputGroup>
            <InputGroup>
                <Text>When</Text>
                <DateInput aria-label="Date" />
                <Text>When</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>When</Text>
                <DateInput aria-label="Date" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>When</Text>
                <DateInput aria-label="Date" />
            </InputGroup>
            <InputGroup>
                <Text>When</Text>
                <DateInput focus aria-label="Date" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>When</Text>
                <DateInput validationState="invalid" aria-label="Date" />
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupDateInput.storyName = "date input";

export const InputGroupDateRangeInput = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>When</Text>
                <DateRangeInput aria-label="Date" />
            </InputGroup>
            <InputGroup>
                <DateRangeInput aria-label="Date" />
                <Text>When</Text>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>When</Text>
                <DateRangeInput aria-label="Date" />
                <Text>When</Text>
            </InputGroup>
            <InputGroup>
                <Text>When</Text>
                <DateRangeInput
                    presets={[
                        { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                        { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                        { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                        { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
                    ]}
                    aria-label="Date"
                />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup disabled>
                <Text>When</Text>
                <DateRangeInput aria-label="Date" />
            </InputGroup>
            <InputGroup readOnly>
                <Text>When</Text>
                <DateRangeInput aria-label="Date" />
            </InputGroup>
            <InputGroup>
                <Text>When</Text>
                <DateRangeInput focus aria-label="Date" />
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>When</Text>
                <DateRangeInput validationState="invalid" aria-label="Date" />
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupDateRangeInput.storyName = "date range input";

export const InputGroupAutocomplete = () => (
    <Stack>
        <Inline>
            <InputGroup>
                <Text>Origin</Text>
                <Autocomplete aria-label="Planet">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                </Autocomplete>
            </InputGroup>
            <InputGroup>
                <Autocomplete aria-label="Planet">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                </Autocomplete>
                <Text>Origin</Text>
            </InputGroup>
            <InputGroup>
                <Text>Origin</Text>
                <Autocomplete aria-label="Planet">
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
                <Autocomplete aria-label="Planet">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                </Autocomplete>
            </InputGroup>
            <InputGroup readOnly>
                <Text>Origin</Text>
                <Autocomplete aria-label="Planet">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                </Autocomplete>
            </InputGroup>
        </Inline>
        <Inline>
            <InputGroup>
                <Text>Origin</Text>
                <Autocomplete validationState="invalid" aria-label="Planet">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                    <Item key="jupiter">Jupiter</Item>
                </Autocomplete>
            </InputGroup>
        </Inline>
    </Stack>
);

InputGroupAutocomplete.storyName = "autocomplete";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
            <Inline>
                <InputGroup>
                    <Text>Days</Text>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <Button variant="secondary">Trigger</Button>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <MenuTrigger>
                        <Button variant="secondary">Trigger</Button>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <Select aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput aria-label="Planet" />
                </InputGroup>
            </Inline>
        </Div>
        <Div className="zoom-out">
            <Inline>
                <InputGroup>
                    <Text>Days</Text>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <Button variant="secondary">Trigger</Button>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <IconButton variant="secondary" aria-label="Icon"><LightbulbMajorIcon /></IconButton>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <MenuTrigger>
                        <Button variant="secondary">Trigger</Button>
                        <Menu aria-label="Planets">
                            <Item key="earth">Earth</Item>
                            <Item key="mars">Mars</Item>
                            <Item key="saturn">Saturn</Item>
                        </Menu>
                    </MenuTrigger>
                    <TextInput aria-label="Duration" />
                </InputGroup>
                <InputGroup>
                    <Select aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <TextInput aria-label="Planet" />
                </InputGroup>
            </Inline>
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Inline>
        <InputGroup border="warning-7">
            <Text>Days</Text>
            <TextInput aria-label="Duration" />
        </InputGroup>
        <InputGroup className="border-red">
            <Text>Days</Text>
            <TextInput aria-label="Duration" />
        </InputGroup>
        <InputGroup style={{ border: "1px solid red" }}>
            <Text>Days</Text>
            <TextInput aria-label="Duration" />
        </InputGroup>
    </Inline>
);

Styling.storyName = "styling";
