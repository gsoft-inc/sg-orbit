import { CHROMATIC_ROOT, COMPONENTS_ROOT, GETTING_STARTED_ROOT, MATERIALS_ROOT } from "@shared/roots";
import { isNil } from "lodash";

const PARSING_RESULTS_CACHE = {};

const ROOTS = {
    [GETTING_STARTED_ROOT.toLocaleLowerCase()]: {
        priority: 0,
        sortByKind: false
    },
    [MATERIALS_ROOT.toLocaleLowerCase()]: {
        priority: 1,
        sortByKind: true
    },
    [COMPONENTS_ROOT.toLocaleLowerCase()]: {
        priority: 2,
        sortByKind: true
    },
    "navigation": {
        priority: 3,
        sortByKind: true
    },
    "feedback": {
        priority: 4,
        sortByKind: true
    },
    "content": {
        priority: 5,
        sortByKind: true
    },
    [CHROMATIC_ROOT.toLocaleLowerCase()]: {
        priority: 5,
        sortByKind: false
    }
};

function parseStory(story) {
    const cacheResult = PARSING_RESULTS_CACHE[story.id];

    if (!isNil(cacheResult)) {
        return cacheResult;
    }

    const rootIndex = story.kind.indexOf("|");

    if (rootIndex === -1) {
        throw new Error("Storybook story should have a root. For more information about story hierarchy, read the following documentation: https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy.");
    }

    const name = story.kind.substring(0, rootIndex);
    const root = ROOTS[name.toLocaleLowerCase()];

    if (isNil(root)) {
        throw new Error(`Unknown Storybook story root "${root}".`);
    }

    const result = {
        root,
        separators: story.kind.substring(rootIndex + 1).split("/")
    };

    PARSING_RESULTS_CACHE[story.id] = result;

    return result;
}

function sortByStoryPriority(a, b) {
    const aPriority = isNil(a.parameters.sortPriority) ? 0 : a.parameters.sortPriority;
    const bPriority = isNil(b.parameters.sortPriority) ? 0 : b.parameters.sortPriority;

    if (aPriority === bPriority) {
        return 0;
    }

    return aPriority > bPriority ? 1 : -1;
}

// Sort by:
//   Root
//     Kind
//       Story Priority
//     Story Priority
export function customStorySort(a, b) {
    const { root: aRoot, separators: aSeparators } = parseStory(a[1]);
    const { root: bRoot, separators: bSeparators } = parseStory(b[1]);

    if (aRoot.priority === bRoot.priority) {
        const sortByStoryValue = sortByStoryPriority(a[1], b[1]);

        if (aRoot.sortByKind) {
            if (aSeparators.length > 0 && bSeparators.length > 0) {
                // Currently only support 3 levels of depth.
                if (aSeparators[0] === bSeparators[0]) {
                    // When it's !== 0 we have a story priority configured.
                    if (sortByStoryValue !== 0) {
                        return sortByStoryValue;
                    }

                }
            }

            return a[1].kind.localeCompare(b[1].kind);
        }

        return sortByStoryValue;
    }

    return aRoot.priority > bRoot.priority ? 1 : -1;
}
