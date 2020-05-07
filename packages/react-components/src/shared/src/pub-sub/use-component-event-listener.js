import { useEffect } from "react";


export function useComponentEventListener(pubsub, eventName, handler) {
    useEffect(() => {
        pubsub.subscribe(eventName, handler);

        return () => {
            pubsub.unsubscribe(eventName, handler);
        };
    }, [pubsub, eventName, handler]);
}
