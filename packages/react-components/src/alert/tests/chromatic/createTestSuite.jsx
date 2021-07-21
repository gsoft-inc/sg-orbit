import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { cloneElement } from "react";

function Alert({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Alert
                primaryButtonLabel="Yes"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        )
        .add("primary button disabled", () =>
            <Alert
                primaryButtonLabel="Yes"
                primaryButtonDisabled
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        )
        .add("secondary button", () =>
            <Alert
                primaryButtonLabel="Launch"
                secondaryButtonLabel="Postpone"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        )
        .add("secondary button disabled", () =>
            <Alert
                primaryButtonLabel="Launch"
                secondaryButtonLabel="Postpone"
                secondaryButtonDisabled
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        )
        .add("cancel button", () =>
            <Alert
                primaryButtonLabel="Yes"
                cancelButtonLabel="No"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        )
        .add("all 3 buttons", () =>
            <Alert
                primaryButtonLabel="Launch"
                secondaryButtonLabel="Postpone"
                cancelButtonLabel="Cancel"
                element={element}
            >
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        );
}
