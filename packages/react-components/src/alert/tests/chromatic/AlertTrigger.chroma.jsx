import { Alert, AlertTrigger } from "@react-components/alert";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/AlertTrigger")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <AlertTrigger>
            <Button>Open</Button>
            <Alert primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        </AlertTrigger>
    )
    .add("default open", () =>
        <AlertTrigger defaultOpen>
            <Button>Open</Button>
            <Alert primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
                <Button>Close</Button>
            </Alert>
        </AlertTrigger>
    );
