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
import { Tooltip, TooltipTrigger } from "../../../tooltip";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
TODO:
- For all inputs states
- For all addon states

- In field
- In toolbar
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/InputGroup")
        .segment(segment)
        .parameters(paramsBuilder()
            .build())
        .build();
}

stories()
    .add("start addon", () =>
        <InputGroup>
            <Text>Days</Text>
            <TextInput />
        </InputGroup>
    )
    .add("end addon", () =>
        <InputGroup>
            <TextInput />
            <Text>Days</Text>
        </InputGroup>
    )
    .add("start & end addons", () =>
        <InputGroup>
            <Text>Launching in</Text>
            <TextInput />
            <Text>Days</Text>
        </InputGroup>
    )
    .add("text addon", () =>
        <Stack>
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
        </Stack>
    )
    .add("icon addon", () =>
        <Stack>
            <InputGroup>
                <LightbulbIcon />
                <TextInput />
            </InputGroup>
            <InputGroup>
                <TextInput />
                <LightbulbIcon />
            </InputGroup>
            <InputGroup>
                <LightbulbIcon />
                <TextInput />
                <LightbulbIcon />
            </InputGroup>
        </Stack>
    )
    .add("button addon", () =>
        <Stack>
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
        </Stack>
    )
    .add("icon button addon", () =>
        <Stack>
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
        </Stack>
    )
    .add("menu addon", () =>
        <Stack>
            <Inline>
                <InputGroup>
                    <MenuTrigger>
                        <Button>Trigger</Button>
                        <Menu>
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
                        <Menu>
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
                        <Menu>
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
                        <Menu>
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
                    <Menu>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
                <TextInput />
                <MenuTrigger>
                    <IconButton><DisclosureArrow /></IconButton>
                    <Menu>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </MenuTrigger>
            </InputGroup>
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
        </Stack>
    )
    .add("tooltip addon", () =>
        <Inline>
            <InputGroup>
                <TextInput />
                <TooltipTrigger open position="bottom">
                    <Text>Days</Text>
                    <Tooltip>In how many days should the launch occurs?</Tooltip>
                </TooltipTrigger>
            </InputGroup>
            <InputGroup>
                <TextInput />
                <TooltipTrigger open position="bottom">
                    <LightbulbIcon />
                    <Tooltip>In how many days should the launch occurs?</Tooltip>
                </TooltipTrigger>
            </InputGroup>
        </Inline>
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
    .add("text input", () =>
        <Stack>
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
        </Stack>
    )
    .add("number input", () =>
        <Stack>
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
        </Stack>
    )
    .add("password input", () =>
        <Stack>
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
        </Stack>
    )
    .add("search input", () =>
        <Stack>
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
        </Stack>
    )
    .add("date input", () =>
        <Stack>
            <InputGroup>
                <Text>Origin</Text>
                <DateInput />
            </InputGroup>
            <InputGroup>
                <DateInput />
                <Text>Origin</Text>
            </InputGroup>
            <InputGroup>
                <Text>I am from the</Text>
                <DateInput />
                <Text>Planet</Text>
            </InputGroup>
        </Stack>
    )
    .add("date range input", () =>
        <Stack>
            <InputGroup>
                <Text>Origin</Text>
                <DateRangeInput />
            </InputGroup>
            <InputGroup>
                <DateRangeInput />
                <Text>Origin</Text>
            </InputGroup>
            <InputGroup>
                <Text>I am from the</Text>
                <DateRangeInput />
                <Text>Planet</Text>
            </InputGroup>
        </Stack>
    );
