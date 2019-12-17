import { CHROMATIC_ROOT, COMPONENTS_ROOT, INTRODUCTION_ROOT, MATERIALS_ROOT } from "../roots";
import { isNil } from "lodash";

const ROOTS = {
    [INTRODUCTION_ROOT.toLocaleLowerCase()]: {
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
    [CHROMATIC_ROOT.toLocaleLowerCase()]: {
        priority: 3,
        sortByKind: false
    }
};

function getRoot(story) {
    const rootIndex = story.kind.indexOf("|");

    if (rootIndex === -1) {
        throw new Error("Storybook story should have a root. For more information about story hierarchy, read the following documentation: https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy.");
    }

    const name = story.kind.substring(0, rootIndex);
    const root = ROOTS[name.toLocaleLowerCase()];

    if (isNil(root)) {
        throw new Error(`Unknown Storybook story root "${root}". Supported roots are ${INTRODUCTION_ROOT}, ${MATERIALS_ROOT}, ${COMPONENTS_ROOT} and ${CHROMATIC_ROOT}.`);
    }

    return root;
}

// Custom sort that try to:
// - Sort by the root
// - Then sort by kind when specified
//
// When the "root" is not configured to be sorted by kind, try to use the story "sortPriority".
export function customStorySort(a, b) {
    const aRoot = getRoot(a[1]);
    const bRoot = getRoot(b[1]);

    // Sort by root.
    if (aRoot.priority === bRoot.priority) {
        // Then by kind when specified.
        if (aRoot.sortByKind) {
            return a[1].kind.localeCompare(b[1].kind);
        }

        // Fallback to "sortPriority" when available.
        const aPriority = isNil(a[1].parameters.sortPriority) ? 0 : a[1].parameters.sortPriority;
        const bPriority = isNil(b[1].parameters.sortPriority) ? 0 : b[1].parameters.sortPriority;

        if (aPriority === bPriority) {
            return 0;
        }

        return aPriority > bPriority ? 1 : -1;
    }

    return aRoot.priority > bRoot.priority ? 1 : -1;
}
