import { RefObject, SyntheticEvent } from "react";
import { isNil } from "lodash";
import { useDocumentListener, useEventCallback } from "../../shared";

export interface UseInteractOutsideProps {
    isDisabled?: boolean,
    onInteractOutside?(e: SyntheticEvent<HTMLElement, Event>): void
}

export function useInteractOutside(rootRef: RefObject<HTMLElement>, { isDisabled, onInteractOutside }: UseInteractOutsideProps = {}) {
    const handleDocumentClick = useEventCallback(event => {
        if (!rootRef.current?.contains(event.target)) {
            if (!isNil(onInteractOutside)) {
                onInteractOutside(event);
            }
        }
    });

    // If "capture" is removed, test the popover component to make sure it still works.
    // https://reactjs.org/blog/2020/08/10/react-v17-rc.html#fixing-potential-issues
    useDocumentListener("click", handleDocumentClick, !isDisabled, true);
}
