import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { cloneElement } from "react";

function AlertDialog({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createAlertDialogTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <AlertDialog
                primaryButtonLabel="Yes"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        )
        .add("primary button disabled", () =>
            <AlertDialog
                primaryButtonLabel="Yes"
                primaryButtonDisabled
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        )
        .add("secondary button", () =>
            <AlertDialog
                primaryButtonLabel="Yes"
                secondaryButton="Postpone"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        )
        .add("secondary button disabled", () =>
            <AlertDialog
                primaryButtonLabel="Yes"
                secondaryButton="Postpone"
                secondaryButtonDisabled
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        )
        .add("cancel button", () =>
            <AlertDialog
                primaryButtonLabel="Yes"
                cancelButtonLabel="No"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        )
        .add("all 3 buttons", () =>
            <AlertDialog
                primaryButtonLabel="Yes"
                secondaryButtonLabel="Postpone"
                cancelButton="No"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        );
}
