import { Alert, AlertTrigger } from "@components/alert";
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";

export default {
    title: "Chromatic/AlertTrigger",
    component: AlertTrigger
};

export const Default = () => (
    <AlertTrigger>
        <Button variant="secondary">Open</Button>
        <Alert primaryButtonLabel="Yes">
            <Heading>Launch</Heading>
            <Content>Are you sure you want to launch the space shuttle?</Content>
        </Alert>
    </AlertTrigger>
);

Default.storyName = "default";

export const DefaultOpen = () => (
    <AlertTrigger defaultOpen>
        <Button variant="secondary">Open</Button>
        <Alert primaryButtonLabel="Yes">
            <Heading>Launch</Heading>
            <Content>Are you sure you want to launch the space shuttle?</Content>
        </Alert>
    </AlertTrigger>
);

DefaultOpen.storyName = "default open";
