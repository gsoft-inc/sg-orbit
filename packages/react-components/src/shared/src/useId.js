import { isNil } from "lodash";
import { useId as useAutoId } from "@reach/auto-id";

export function useId(userId, prefix) {
    const uuid = useAutoId();
    const id = userId ?? uuid;

    return !isNil(prefix) ? `${prefix}-${id}` : id;
}
