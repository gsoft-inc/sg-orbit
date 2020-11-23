export function CanvasContainer({ story, context }) {
    const { parameters } = context;
    const { layout } = parameters;

    const params = (new URL(document.location)).searchParams;
    const isDocsTab = params.get("viewMode") === "docs";

    if (isDocsTab) {
        return story;
    }

    return (
        <div className="fixed top-0 left-0 right-0 mt10 flex items-center">
            <div className="center" style={layout}>
                {story}
            </div>
        </div>
    );
}
