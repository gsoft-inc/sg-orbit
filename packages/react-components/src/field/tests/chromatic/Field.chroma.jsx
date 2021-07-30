import { Autocomplete } from "@react-components/autocomplete";
import { Checkbox } from "@react-components/checkbox";
import { DateInput } from "@react-components/date-input";
import { ErrorMessage, Field, HelpMessage, Label, ValidMessage } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { InputGroup } from "@react-components/input-group";
import { Item } from "@react-components/collection";
import { NumberInput } from "@react-components/number-input";
import { PasswordInput, TextInput } from "@react-components/text-input";
import { Select } from "@react-components/select";
import { Switch } from "@react-components/switch";
import { Text } from "@react-components/typography";
import { TextArea } from "@react-components/text-area";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Field")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Field>
            <TextInput placeholder="Where to?" />
        </Field>
    )
    .add("label", () =>
        <Field>
            <Label>Where to?</Label>
            <TextInput />
        </Field>
    )
    .add("message", () =>
        <Stack gap={10}>
            <Field>
                <TextInput placeholder="Where to?" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <div>
                <Field>
                    <TextInput placeholder="Where to?" />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
        </Stack>,
         {
             ...paramsBuilder()
                 .a11y({
                     config: {
                         rules: [{ id: "label-title-only", enabled: false }]
                     }
                 })
                 .build()
         }
    )
    .add("validation", () =>
        <Inline>
            <Field>
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
            <Field validationState="valid">
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
            <Field validationState="invalid">
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
        </Inline>
    )
    .add("fluid", () =>
        <Stack>
            <div>
                <Field fluid>
                    <Label>Where to?</Label>
                    <TextInput />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
            <div className="w-10">
                <Field fluid>
                    <Label>Where to?</Label>
                    <TextInput />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
        </Stack>
    )
    .add("required", () =>
        <Field required>
            <Label>Where to?</Label>
            <TextInput />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("states", () =>
        <Field disabled>
            <Label>Where to?</Label>
            <TextInput />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("text input", () =>
        <Field>
            <Label>Where to?</Label>
            <TextInput placeholder="Ex. Mars" />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("password input", () =>
        <Field>
            <Label>Where to?</Label>
            <PasswordInput />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("number input", () =>
        <Field>
            <Label>Age</Label>
            <NumberInput placeholder="Ex. 89" />
            <HelpMessage>How long ago are you born?</HelpMessage>
        </Field>
    )
    .add("text area", () =>
        <Field>
            <Label>Where to?</Label>
            <TextArea placeholder="Ex. Mars" />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("date input", () =>
        <Field>
            <Label>When?</Label>
            <DateInput placeholder="dd/mm/yyyy" />
            <HelpMessage>When do you leave?</HelpMessage>
        </Field>
    )
    .add("checkbox", () =>
        <Field>
            <Checkbox>Milky Way</Checkbox>
            <HelpMessage>Must be reachable within 200,000 light-years.</HelpMessage>
        </Field>
    )
    .add("switch", () =>
        <Field>
            <Switch>Milky Way</Switch>
            <HelpMessage>Engines must cooldown for 30 minutes between startups.</HelpMessage>
        </Field>
    )
    .add("select", () =>
        <Field>
            <Label>Planet</Label>
            <Select placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
            <HelpMessage>Must be a planet of the solar system.</HelpMessage>
        </Field>
    )
    .add("autocomplete", () =>
        <Field>
            <Label>Planet</Label>
            <Autocomplete placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <HelpMessage>Must be a planet of the solar system.</HelpMessage>
        </Field>
    )
    .add("input group", () =>
        <Stack>
            <Field>
                <Label>Launch date</Label>
                <InputGroup>
                    <TextInput />
                    <Text>Days</Text>
                </InputGroup>
                <HelpMessage>In how many days does your flight will launch?</HelpMessage>
            </Field>
            <Inline>
                <Field validationState="invalid">
                    <Label>Launch date</Label>
                    <InputGroup>
                        <TextInput />
                        <Text>Days</Text>
                    </InputGroup>
                    <HelpMessage>In how many days does your flight will launch?</HelpMessage>
                </Field>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <Field className="border-red">
                <Label>Launch date</Label>
                <TextInput />
            </Field>
            <Field style={{ border: "1px solid red" }}>
                <Label>Launch date</Label>
                <TextInput />
            </Field>
        </Inline>
    );
