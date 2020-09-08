import { Field, HelpMessage, Label } from "@react-components/field";
import { Stack } from "@react-components/layout";
import { TextInput } from "@react-components/input";
import { createChromaticSection, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Field"))
        .build();
}

stories()
    .add("text-input", () =>
        <Field>
            <Label>Where to?</Label>
            <TextInput placeholder="Ex. Mars" />
            <HelpMessage>Must be a planet in earth solar system. Must be a planet in earth solar system. Must be a planet in earth solar system.</HelpMessage>
        </Field>
    );
