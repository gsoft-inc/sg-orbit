import { Alert } from "@react-components/alert";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { createTestSuite } from "./createTestSuite";
import { storiesOfBuilder } from "@stories/utils";

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
    .add("styled system", () =>
        <Alert
            primaryButtonLabel="Yes"
            border="sunray-10"
        >
            <Heading border="sunray-10">Launch</Heading>
            <Content border="sunray-10">Are you use you want to launch the space shuttle?</Content>
        </Alert>
    )
    .add("className", () =>
        <Alert
            primaryButtonLabel="Yes"
            className="border-red"
        >
            <Heading className="border-red">Launch</Heading>
            <Content className="border-red">Are you use you want to launch the space shuttle?</Content>
        </Alert>
    )
    .add("styles", () =>
        <Alert
            primaryButtonLabel="Yes"
            style={{ border: "1px solid red" }}
        >
            <Heading style={{ border: "1px solid red" }}>Launch</Heading>
            <Content style={{ border: "1px solid red" }}>Are you use you want to launch the space shuttle?</Content>
        </Alert>
    );
