import { AlertDialog } from "@react-components/dialog";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { createAlertDialogTestSuite } from "./createAlertDialogTestSuite";
import { storiesOfBuilder } from "@stories/utils";

/*
JEST TEST:
- autofocus primary button when autoFocusButton is "primary"
- autofocus secondary button when autoFocusButton is "secondary"
- autofocus cancel button when autoFocusButton is "cancel"
- when autoFocusButton is not specified, the primary button is focused
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/AlertDialog")
        .segment(segment)
        .build();
}

createAlertDialogTestSuite(<AlertDialog tone="confirmation" />, stories("/confirmation"));

createAlertDialogTestSuite(<AlertDialog tone="danger" />, stories("/danger"));

createAlertDialogTestSuite(<AlertDialog tone="error" />, stories("/error"));

stories()
    .add("className", () =>
        <AlertDialog
            primaryButtonLabel="Yes"
            className="border-red"
        >
            <Heading>Launch</Heading>
            <Content>Are you use you want to launch the space shuttle?</Content>
        </AlertDialog>
    )
    .add("styles", () =>
        <AlertDialog
            primaryButtonLabel="Yes"
            style={{ border: "1px solid red" }}
        >
            <Heading>Launch</Heading>
            <Content>Are you use you want to launch the space shuttle?</Content>
        </AlertDialog>
    );
