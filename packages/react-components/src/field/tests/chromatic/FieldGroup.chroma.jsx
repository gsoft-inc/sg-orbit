import { Field, FieldGroup } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { TextInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("FieldGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <FieldGroup size="sm">
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
            </FieldGroup>
            <FieldGroup size="lg">
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
            </FieldGroup>
        </Stack>
    )
    .add("fluid", () =>
        <FieldGroup fluid>
            <Field>
                <TextInput />
            </Field>
            <Field>
                <TextInput />
            </Field>
            <Field>
                <TextInput />
            </Field>
        </FieldGroup>
    )
    .add("styling", () =>
        <Inline>
            <FieldGroup className="border-red">
                <Field>
                    <TextInput />
                </Field>
            </FieldGroup>
            <FieldGroup style={{ border: "1px solid red" }}>
                <Field>
                    <TextInput />
                </Field>
            </FieldGroup>
        </Inline>
    );
