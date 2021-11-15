import { useEffect } from "react";
import { useRefState } from "./useRefState";

export function useIsInitialRenderRef() {
    const [isInitialRef, setIsInitial] = useRefState(true);

    useEffect(() => {
        setIsInitial(false);
    }, [setIsInitial]);

    return isInitialRef;
}
