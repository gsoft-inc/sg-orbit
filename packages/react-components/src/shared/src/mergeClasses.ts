export function mergeClasses(...values: string[]) {
    const deduped = values
        .filter(Boolean)
        .reduce((set, x) => {
            x.split(" ").forEach(y => {
                set.add(y);
            });

            return set;
        }, new Set<string>());

    return Array.from(deduped).join(" ");
}
