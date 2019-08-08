import React from "react";

export function StoryContainer({ story, context }) {
    const { parameters } = context;
    const { options = {} } = parameters;
    const { layout } = options;

    return (
        <div className="fixed top-0 left-0 right-0 mt10 flex items-center">
            <div className="center" style={layout}>
                {story}
            </div>
        </div>
    );
}
