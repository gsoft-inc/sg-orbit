// Sorting order:
//      1- "default" story should be first
//      2- "knobs" story should be second
//      3- "chromatic" folder should be last
export function customStorySort(a, b) {
    if (a[1].kind === b[1].kind) {
        if (a[1].parameters.displayName === "default") {
            return -1;
        }
        else if (b[1].parameters.displayName === "default") {
            return 1;
        }
        else if (a[1].parameters.displayName === "knobs") {
            return -1;
        }
        else if (b[1].parameters.displayName === "knobs") {
            return 1;
        }
    }

    return a[1].id.localeCompare(b[1].id);
}
