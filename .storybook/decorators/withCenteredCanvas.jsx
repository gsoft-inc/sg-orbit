import { Div } from "@components/html";
import { Flex } from "@components/layout";
import { isChromatic } from "../env";

export function withCenteredCanvas(story, context) {
    const { parameters, viewMode } = context;
    const { canvasLayout } = parameters;

    if (viewMode !== "story" && !isChromatic) {
        return story();
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
                height="37.5rem"
                marginRight="auto"
                marginLeft="auto"
                style={canvasLayout}
            >
                {story()}
            </Div>
        </Flex>
    );
}
