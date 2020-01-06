import { Anchor, DocsContext } from "@storybook/addon-docs/blocks";
import { isNil } from "lodash";
import { useContext } from "react";

function getDocsStories({ storyStore, selectedKind }) {
    if (isNil(storyStore)) {
        return [];
    }

    return storyStore
        .getStoriesForKind(selectedKind)
        .filter(x => !(x.parameters && x.parameters.docs && x.parameters.docs.disable));
}

export function TopAnchor() {
    const docsContext = useContext(DocsContext);
    const stories = getDocsStories(docsContext);

    const anchorId = stories.length > 0 ? stories[0].id : docsContext.id;

    return <Anchor storyId={anchorId} />;
}
