import { CheckboxGroup } from "@react-components/checkbox";
import { Field, Label } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { NotificationIcon } from "@react-components/icons";
import { Radio, RadioGroup } from "@react-components/radio";
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
            <Toolbar align="start">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar align="end">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar align="center">
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
            <Toolbar verticalAlign="start" style={{ height: "100px" }}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar verticalAlign="end" style={{ height: "100px" }}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <ToggleIconButton shape="circular" aria-label="Activate notification">
                    <NotificationIcon />
                </ToggleIconButton>
            </Toolbar>
            <Toolbar verticalAlign="center" style={{ height: "100px" }}>
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
        <div style={{ width: "170px" }}>
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
        </div>
    )
    .add("autofocus", () =>
        <Toolbar autoFocus>
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
    .add("when disabled do not autofocus", () =>
        <Toolbar disabled autoFocus>
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
    .add("do not autofocus a disabled element", () =>
        <Toolbar autoFocus>
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
    .add("autofocus with delay", () =>
        <Toolbar autoFocus={50}>
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
    .add("complex", () =>
        <Toolbar>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <TextInput />
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
        </Toolbar>
    )
    .add("fields + label", () =>
        <Toolbar verticalAlign="end">
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
                <TextInput />
            </Field>
            <ToggleButton>Activate</ToggleButton>
        </Toolbar>
    );

stories("/vertical")
    .add("default", () =>
        <Toolbar orientation="vertical">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <TextInput />
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
            <Toolbar align="start" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
            <Toolbar align="end" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
            <Toolbar align="center" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput />
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
            <Toolbar verticalAlign="start" orientation="vertical" style={{ height: "500px" }}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
            <Toolbar verticalAlign="end" orientation="vertical" style={{ height: "500px" }}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
            <Toolbar verticalAlign="center" orientation="vertical" style={{ height: "500px" }}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
        </Inline>
    );
