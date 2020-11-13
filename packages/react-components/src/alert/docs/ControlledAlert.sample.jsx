import { Alert } from "@react-components/alert";
import { Button } from "@react-components/button";
import { Content } from "@react-components/view";
import { EmailIcon } from "@react-components/icons";
import { Stack } from "@react-components/layout";
import { useCallback, useState } from "react";

export function ControlledAlert() {
    const [show, setShow] = useState(true);

    const toggleAlert = useCallback(() => {
        setShow(x => !x);
        console.log(!show);
    }, [show, setShow]);

    return (
        <Stack>
            <Button
                color="secondary"
                onClick={toggleAlert}
            >
                {show ? "Hide" : "Show"}
            </Button>
            <Alert
                show={show}
                onDismiss={toggleAlert}
            >
                <EmailIcon />
                <Content>Your email to <strong>booking@spacetravel.com</strong> has been sent!</Content>
                <Button>Undo</Button>
            </Alert>
        </Stack>
    );
}
