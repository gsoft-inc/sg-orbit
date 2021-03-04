import { isNil } from "lodash";
import { useId as useAutoId } from "@reach/auto-id";

// This utility will initially trigger a re-render.
export function useId(userId: string, prefix?: string) {
    const uuid = useAutoId(userId);

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
