import { CollectionBuilder } from "./CollectionBuilder";
import { useMemo } from "react";

export function useCollection(children) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => {
        return builder.build(children);
    }, [builder, children]);
}
