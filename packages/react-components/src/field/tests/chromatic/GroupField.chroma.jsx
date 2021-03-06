import { Button, ButtonGroup } from "@react-components/button";
import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { DateRangeInput } from "@react-components/date-input";
import { GroupField, HelpMessage, Label } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { Radio, RadioGroup } from "@react-components/radio";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/GroupField")
        .segment(segment)
        .build();
}

stories()
    .add("checkbox group", () =>
        <Stack gap={13}>
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup>
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup orientation="vertical">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Stack>
    )
    .add("radio group", () =>
        <Inline gap={13} verticalAlign="end">
            <GroupField>
                <Label>Select your packages</Label>
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Select your packages</Label>
                <RadioGroup orientation="horizontal">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Inline>
    )
    .add("button group", () =>
        <Stack gap={13}>
            <GroupField>
                <Label>Would you like to rate your experience?</Label>
                <ButtonGroup>
                    <Button variant="outline">No, thanks</Button>
                    <Button variant="outline">Remind me later</Button>
                    <Button>Rate Now</Button>
                </ButtonGroup>
                <HelpMessage>It will only take a minute of your time.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Would you like to rate your experience?</Label>
                <ButtonGroup orientation="vertical">
                    <Button variant="outline">No, thanks</Button>
                    <Button variant="outline">Remind me later</Button>
                    <Button>Rate Now</Button>
                </ButtonGroup>
                <HelpMessage>It will only take a minute of your time.</HelpMessage>
            </GroupField>
        </Stack>
    )
    .add("date range input", () =>
        <GroupField>
            <Label>When?</Label>
            <DateRangeInput placeholder="dd/mm/yyyy" />
            <HelpMessage>When do you leave?</HelpMessage>
        </GroupField>
    )
    .add("styling", () =>
        <Inline>
            <GroupField className="border-red">
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </GroupField>
            <GroupField style={{ border: "1px solid red" }}>
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </GroupField>
        </Inline>
    );
