import { isNil } from "lodash";
import { useRef } from "react";

class PubSub {
    _emitters = {};
    _subscriptions = {};

    eventEmitter(eventName, defaultHandler) {
        let emitter = this._emitters[eventName];

        if (isNil(emitter)) {
            this._emitters[eventName] = emitter = (...args) => {
                const subscribers = this._subscriptions[eventName];

                if (!isNil(subscribers)) {
                    subscribers.forEach(x => {
                        x(...args);
                    });
                }

                if (!isNil(defaultHandler)) {
                    defaultHandler(...args);
                }
            };
        }

        return emitter;
    }

    subscribe(eventName, handler) {
        if (isNil(this._subscriptions[eventName])) {
            this._subscriptions[eventName] = [];
        }

        this._subscriptions[eventName].push(handler);
    }

    unsubscribe(eventName, handler) {
        if (!isNil(this._subscriptions[eventName])) {
            const index = this._subscriptions[eventName].findIndex(x => {
                return x === handler;
            });

            if (index > -1) {
                this._subscriptions[eventName].splice(index, 1);
            }
        }
    }
}

export function useComponentPubsub() {
    const instance = useRef(new PubSub());

    return instance.current;
}
