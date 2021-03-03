import { isChromatic } from "../env";

export function withCenteredCanvas(Story, context) {
    const { parameters, viewMode } = context;
    const { canvasLayout } = parameters;

    if (viewMode !== "story" && !isChromatic) {
        return <Story />;
    }

    return (
        <div className="fixed top-0 left-0 right-0 mt10 flex items-center">
            <div
                className="center"
                style={{
                    width: "90%",
                    // Important for chromatic tests.
                    minHeight: "600px",
                    ...canvasLayout
                }}
            >
                <Story />
            </div>
        </div>
    );
}
