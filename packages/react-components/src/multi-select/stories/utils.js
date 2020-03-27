import Fuse from "fuse.js";

export function logValuesChanged(event, values) {
    console.log("Values: ", values);
}

export function fuzzySearch(event, items, query) {
    const options = {
        keys: ["text", "value"]
    };

    const fuse = new Fuse(items, options);
    const results = fuse.search(query);

    return results;
}
