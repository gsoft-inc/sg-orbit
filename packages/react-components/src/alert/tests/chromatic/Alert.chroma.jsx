import { Alert } from "@react-components/alert";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { createTestSuite } from "./createTestSuite";
import { storiesOfBuilder } from "@stories/utils";

/*
JEST TEST:
- autofocus primary button when autoFocusButton is "primary"
- autofocus secondary button when autoFocusButton is "secondary"
- autofocus cancel button when autoFocusButton is "cancel"
- when autoFocusButton is not specified, the primary button is focused
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Alert")
        .segment(segment)
        .build();
}

createTestSuite(<Alert variant="confirmation" />, stories("/confirmation"));

createTestSuite(<Alert variant="destructive" />, stories("/destructive"));

createTestSuite(<Alert variant="warning" />, stories("/warning"));

createTestSuite(<Alert variant="negative" />, stories("/negative"));

stories()
    .add("className", () =>
        <Alert
            primaryButtonLabel="Yes"
            className="border-red"
        >
            <Heading>Launch</Heading>
            <Content>Are you use you want to launch the space shuttle?</Content>
        </Alert>
    )
    .add("styles", () =>
        <Alert
            primaryButtonLabel="Yes"
            style={{ border: "1px solid red" }}
        >
            <Heading>Launch</Heading>
            <Content>Are you use you want to launch the space shuttle?</Content>
        </Alert>
    );
