import { Field } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { Row } from "@react-components/form";
import { TextInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Row"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Row size="sm">
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
            </Row>
            <Row>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
            </Row>
            <Row size="lg">
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
                <Field>
                    <TextInput />
                </Field>
            </Row>
        </Stack>
    )
    .add("fluid", () =>
        <Row fluid>
            <Field>
                <TextInput />
            </Field>
            <Field>
                <TextInput />
            </Field>
            <Field>
                <TextInput />
            </Field>
        </Row>
    )
    .add("styling", () =>
        <Inline>
            <Row className="border-red">
                <Field>
                    <TextInput />
                </Field>
            </Row>
            <Row style={{ border: "1px solid red" }}>
                <Field>
                    <TextInput />
                </Field>
            </Row>
        </Inline>
    );
