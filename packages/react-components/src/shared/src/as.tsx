import {
    ComponentProps,
    ElementType,
    JSXElementConstructor
} from "react";
import { Merge } from "type-fest";

export function as<A extends JSXElementConstructor<{ as?: ElementType } & any>, B extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>(component: A, asProp: B) {
    const Component = component as JSXElementConstructor<any>;

    return (props: Merge<ComponentProps<A>, ComponentProps<B>>) => <Component as={asProp} {...props} />;
}
