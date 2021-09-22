import { CheckboxGroup } from "@react-components/checkbox";
import { Div } from "@react-components/html";
import { Field, Label } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { InputGroup } from "@react-components/input-group";
import { NotificationIcon } from "@react-components/icons";
import { Radio, RadioGroup } from "@react-components/radio";
import { Text } from "@react-components/typography";
import { TextInput } from "@react-components/text-input";
import { ToggleButton, ToggleIconButton } from "@react-components/button";
import { Toolbar } from "@react-components/toolbar";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Toolbar")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Toolbar>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton shape="circular" aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Toolbar>
    )
    .add("disabled element", () =>
        <Toolbar>
            <CheckboxGroup disabled>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton shape="circular" aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Toolbar>
    )
    .add("fluid", () =>
        <Toolbar fluid>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleButton fluid>Turn On</ToggleButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Toolbar>
    )
    .add("disabled", () =>
        <Toolbar disabled>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleButton fluid>Turn On</ToggleButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Toolbar>
    )
    .add("gap", () =>
        <Toolbar gap={13}>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton shape="circular" aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Toolbar>
    )
    .add("align", () =>
        <Stack>
            <Toolbar alignX="start">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar alignX="end">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar alignX="center">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
        </Stack>
    )
    .add("vertical align", () =>
        <Inline gap={13}>
            <Toolbar alignY="start" height="100px">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar alignY="end" height="100px">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar alignY="center" height="100px">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
        </Inline>
    )
    .add("wrap", () =>
        <Div width="170px">
            <Toolbar wrap>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </Toolbar>
        </Div>
    )
    .add("complex", () =>
        <Toolbar>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <TextInput aria-label="Label" />
            <ToggleButton>On</ToggleButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </RadioGroup>
            <InputGroup>
                <TextInput aria-label="Label" />
                <Text>Days</Text>
            </InputGroup>
        </Toolbar>
    )
    .add("fields + label", () =>
        <Toolbar alignY="end">
            <Field>
                <Label>Package</Label>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
            </Field>
            <Field>
                <Label>Search</Label>
                <TextInput aria-label="Label" />
            </Field>
            <ToggleButton>Activate</ToggleButton>
        </Toolbar>
    )
    .add("styling", () =>
        <Stack>
            <Toolbar border="sunray-10">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
            </Toolbar>
            <Toolbar className="border-red">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
            </Toolbar>
            <Toolbar style={{ border: "1px solid red" }}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
            </Toolbar>
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <Toolbar orientation="vertical">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <TextInput aria-label="Label" />
            <ToggleButton>Activate</ToggleButton>
            <RadioGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </RadioGroup>
        </Toolbar>
    )
    .add("align", () =>
        <Inline gap={13}>
            <Toolbar alignX="start" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
            <Toolbar alignX="end" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
            <Toolbar alignX="center" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
        </Inline>
    )
    .add("vertical align", () =>
        <Inline gap={13}>
            <Toolbar alignY="start" orientation="vertical" height="500px">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
            <Toolbar alignY="end" orientation="vertical" height="500px">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
            <Toolbar alignY="center" orientation="vertical" height="500px">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
        </Inline>
    );
