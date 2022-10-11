import { isNil } from "./assertions";
import { useId as useIdReach } from "./autoId";
import { useId as useIdReact } from "react";

// Use React's useId on version >18, and use @reach/auto-id on versions below
const useAutoId = useIdReact ?? useIdReach;

export function useId(userId?: string, prefix?: string) {
    const uuid = useAutoId();

    if (!isNil(userId)) {
        return userId;
    }

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
