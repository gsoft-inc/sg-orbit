import { isNil } from "./assertions";
import { useId as useAutoId } from "@reach/auto-id";

export function useId(userId?: string, prefix?: string) {
    const uuid = useAutoId();

    if (!isNil(userId)) {
        return userId;
    }

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
