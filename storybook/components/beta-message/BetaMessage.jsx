import { Message } from "@components/message";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";

export function BetaMessage() {
    return (
        <Message variant="negative">
            <Content>
                <Heading>Beta</Heading>
        This component is in development. There could be breaking changes made to it in a non-major release. Please use with caution
            </Content>
        </Message>
    );
}
