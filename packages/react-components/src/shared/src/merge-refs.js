import { assignRef } from "./assign-ref";
import { isNil } from "lodash";

export function mergeRefs(...refs) {
    const mergedRef = current => {
        // Support using the returned callback function has a ref.
        mergedRef.current = current;

        refs.forEach(ref => {
            if (!isNil(ref)) {
                assignRef(ref, current);
            }
        });
    };

    return mergedRef;
}
