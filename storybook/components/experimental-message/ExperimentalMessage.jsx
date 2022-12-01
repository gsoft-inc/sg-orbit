import { Message } from "@components/message";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";

export function ExperimentalMessage() {
    return (
        <Message variant="negative">
            <Content>
                <Heading>Experimental</Heading>
                This component is in development. There could be breaking changes made to it in a non-major release. Please use with caution
            </Content>
        </Message>
    );
}
