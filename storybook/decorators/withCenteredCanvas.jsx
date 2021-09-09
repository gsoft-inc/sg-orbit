import { Div } from "@react-components/html";
import { Flex } from "@react-components/layout";
import { isChromatic } from "../env";

export function withCenteredCanvas(Story, context) {
    const { parameters, viewMode } = context;
    const { canvasLayout } = parameters;

    if (viewMode !== "story" && !isChromatic) {
        return <Story />;
    }

    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            right="0"
            marginTop={10}
            alignItems="center"
        >
            <Div
                width="90%"
                // Important for chromatic tests.
                height="600px"
                marginRight="auto"
                marginLeft="auto"
                style={canvasLayout}
            >
                <Story />
            </Div>
        </Flex>
    );
}
