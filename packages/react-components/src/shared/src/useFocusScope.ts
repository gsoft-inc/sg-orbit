import { RefObject, createContext, useCallback, useContext, useMemo } from "react";
import { isNil } from "lodash";
import { useRefState } from "./useRefState";
import { walkFocusableElements } from "./focusableTreeWalker";

export type ChangeEventHandler = (elements: HTMLElement[], scope: HTMLElement[]) => void;

export interface FocusScope {
    elements: HTMLElement[];
    isInScope: (element: HTMLElement) => boolean;
    registerChangeHandler: (onChangeHandler: ChangeEventHandler) => void;
    removeChangeHandler: (onChangeHandler: ChangeEventHandler) => void;
}


class DomScope implements FocusScope {
    _scopeRef: RefObject<HTMLElement[]>;
    _handlersRef: RefObject<ChangeEventHandler[]>;

    constructor(scopeRef: RefObject<HTMLElement[]>, handlersRef: RefObject<ChangeEventHandler[]>) {
        this._scopeRef = scopeRef;
        this._handlersRef = handlersRef;
    }

    get elements(): HTMLElement[] {
        return this._scopeRef.current;
    }

    registerChangeHandler(handler: ChangeEventHandler): void {
        this._handlersRef.current.push(handler);
    }

    removeChangeHandler(handler: ChangeEventHandler): void {
        const handlers = this._handlersRef.current;

        handlers.splice(handlers.indexOf(handler), 1);
    }

    isInScope(element: HTMLElement): boolean {
        return this.elements.some(x => x.contains(element));
    }
}

interface FocusContextProps {
    scope?: FocusScope
}

export const FocusContext = createContext<FocusContextProps>({});

export function useFocusContext(): FocusContextProps {
    return useContext(FocusContext) ?? {};
}

export function useFocusScope(): [FocusScope, (rootElement: HTMLElement) => void] {
    const [scopeRef, setScope] = useRefState<HTMLElement[]>([]);
    const [handlersRef] = useRefState<ChangeEventHandler[]>([]);

    const setRef = useCallback((rootElement: HTMLElement) => {
        const setElements = (elements: HTMLElement[]): void => {
            handlersRef.current.forEach(x => {
                x(elements, scopeRef.current);
            });

            setScope(elements);
        };

        const parseElements = (): void => {
            const scope: HTMLElement[] = [];

            walkFocusableElements(rootElement, x => {
                scope.push(x as HTMLElement);
            });

            setElements(scope);
        };

        // Watch for dynamic elements.
        const mutationObserver = new MutationObserver(() => {
            parseElements();
        });

        if (rootElement) {
            // Parse initial elements.
            parseElements();

            mutationObserver.observe(rootElement, {
                subtree: true,
                childList: true
            });
        } else {
            mutationObserver.disconnect();
            setElements([]);
        }
    }, [scopeRef, setScope, handlersRef]);

    const scope: FocusScope = useMemo(() => new DomScope(scopeRef, handlersRef), [scopeRef, handlersRef]);

    const { scope: contextScope } = useFocusContext();

    return isNil(contextScope)
        ? [scope, setRef]
        : [contextScope, undefined];
}
