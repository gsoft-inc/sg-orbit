import { Field } from "@react-components/field";
import { Inline } from "@react-components/layout";
import { Row } from "@react-components/form";
import { TextInput } from "@react-components/text-input";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Row")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
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
        </Row>,
         {
             ...paramsBuilder()
                 .validateBreakpoints()
                 .build()
         }
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
