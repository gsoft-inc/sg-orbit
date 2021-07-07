import { AlertDialog, AlertDialogTrigger } from "@react-components/dialog";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/AlertDialogTrigger")
        .segment(segment)
        .build();
}

/*
JEST TRIGGER TESTS
- cannot dismiss on outside click
*/

stories()
    .add("default", () =>
        <AlertDialogTrigger>
            <Button>Open</Button>
            <AlertDialog primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
            </AlertDialog>
        </AlertDialogTrigger>
    )
    .add("open", () =>
        <AlertDialogTrigger defaultOpen>
            <Button>Open</Button>
            <AlertDialog primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you use you want to launch the space shuttle?</Content>
                <Button>Close</Button>
            </AlertDialog>
        </AlertDialogTrigger>
    );
