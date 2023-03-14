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
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/InputGroup",
    component: InputGroup
} as ComponentMeta<typeof InputGroup>;

type InputGroupStory = ComponentStoryObj<typeof InputGroup>;

export const TextAddon: InputGroupStory = {
    storyName: "text addon",
    render: () => (
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
    )
};

export const ButtonAddon: InputGroupStory = {
    storyName: "button addon",
    render: () => (
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
    )
};

export const IconButtonAddon: InputGroupStory = {
    storyName: "icon button addon",
    render: () => (
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
    )
};

export const MenuAddon: InputGroupStory = {
    storyName: "menu addon",
    render: () => (
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
    )
};

export const SelectAddon: InputGroupStory = {
    storyName: "select addon",
    render: () => (
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
    )
};


export const Placeholder: InputGroupStory = {
    storyName: "placeholder",
    render: () => (
        <InputGroup>
            <Text>Launching in</Text>
            <TextInput placeholder="Ex. 8" />
            <Text>Days</Text>
        </InputGroup>
    )
};

export const Fluid: InputGroupStory = {
    storyName: "fluid",
    render: () => (
        <InputGroup fluid>
            <Text>Launching in</Text>
            <TextInput aria-label="Duration" />
            <Text>Days</Text>
        </InputGroup>
    )
};

export const States: InputGroupStory = {
    storyName: "states",
    render: () => (
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
    )
};

export const InputGroupTextInput: InputGroupStory = {
    storyName: "text input",
    render: () => (
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
    )
};

export const InputGroupNumberInput: InputGroupStory = {
    storyName: "number input",
    render: () => (
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
    )
};

export const InputGroupPasswordInput: InputGroupStory = {
    storyName: "password input",
    render: () => (
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
    )
};

export const InputGroupSearchInput: InputGroupStory = {
    storyName: "search input",
    render: () => (
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
    )
};

export const InputGroupDateInput: InputGroupStory = {
    storyName: "date input",
    render: () => (
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
    )
};

export const InputGroupDateRangeInput: InputGroupStory = {
    storyName: "date range input",
    render: () => (
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
    )
};

export const InputGroupAutocomplete: InputGroupStory = {
    storyName: "autocomplete",
    render: () => (
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
    )
};

export const Zoom: InputGroupStory = {
    storyName: "zoom",
    render: () => (
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
    )
};

export const Styling: InputGroupStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <InputGroup border="warning-7">
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup className="border-red">
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
            <InputGroup style={{ border: "0.0625rem solid red" }}>
                <Text>Days</Text>
                <TextInput aria-label="Duration" />
            </InputGroup>
        </Inline>
    )
};
