import { isNil } from "lodash";

// Sorting order:
//      1- "default" story should be first
//      2- "knobs" story should be second
//      3- "chromatic" folder should be last
// export function customStorySort(a, b) {
//     if (a[1].kind === b[1].kind) {
//         if (a[1].parameters.displayName === "default") {
//             return -1;
//         }
//         else if (b[1].parameters.displayName === "default") {
//             return 1;
//         }
//         else if (a[1].parameters.displayName === "knobs") {
//             return -1;
//         }
//         else if (b[1].parameters.displayName === "knobs") {
//             return 1;
//         }
//     }

//     return a[1].id.localeCompare(b[1].id);
// }

// Custom sort that support a sorting priority.
// This is mostly done to ensure that the "chromatic" folder stay at the bottom
export function customStorySort(a, b) {
    const aPriority = isNil(a[1].parameters.sortPriority) ? 0 : a[1].parameters.sortPriority;
    const bPriority = isNil(b[1].parameters.sortPriority) ? 0 : b[1].parameters.sortPriority;

    if (aPriority === bPriority) {
        return 0;
    }

    return aPriority > bPriority ? 1 : -1;
}
