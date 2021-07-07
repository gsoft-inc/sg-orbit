import { Alert } from "@react-components/dialog";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { createAlertTestSuite } from "./createAlertTestSuite";
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

createAlertTestSuite(<Alert tone="confirmation" />, stories("/confirmation"));

createAlertTestSuite(<Alert tone="destructive" />, stories("/destructive"));

createAlertTestSuite(<Alert tone="warning" />, stories("/warning"));

createAlertTestSuite(<Alert tone="error" />, stories("/error"));

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
