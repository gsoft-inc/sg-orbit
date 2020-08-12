export function mergeClasses(...values) {
    const deduped = values
        .filter(Boolean)
        .reduce((set, x) => {
            x.split(" ").forEach(y => {
                set.add(y);
            });

            return set;
        }, new Set());

    return [...deduped].join(" ");
}
