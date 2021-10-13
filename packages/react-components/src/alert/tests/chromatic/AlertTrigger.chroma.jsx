import { Alert, AlertTrigger } from "@react-components/alert";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/AlertTrigger")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <AlertTrigger>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        </AlertTrigger>,
         {
             ...paramsBuilder()
                 .validateBreakpoints()
                 .build()
         }
    )
    .add("default open", () =>
        <AlertTrigger defaultOpen>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </Alert>
        </AlertTrigger>
    );
