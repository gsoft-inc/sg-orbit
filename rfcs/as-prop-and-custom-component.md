The as prop and Custom component

## Summary

By default, all Orbit components work with the `as` prop.  This let you customize the HTML element or React element that is rendered by the component.

For example, you might want an Heading component to be rendered as an h1 :

```jsx
// React code
<Heading as="h1">Migrate, adapt, and control the cloud.</Heading>

// Rendered DOM
<h1 class="o-ui-heading o-ui-heading-md">Migrate, adapt, and control the cloud.</h1>
```

In regular JavaScript, this pattern is fairly easy to implement and understand. However in TypeScript, where we bring static typings to a type that accepts different props based on the
runtime value passed to the as property, it quickly becomes more complex.

This RFC propose a way to handle this property in TypeScript, providing type safety and intellisense.

## Motivation

The decision to convert the Orbit codebase in Typescript was surely to gain the benefits of the static typings, but also to provide rich and accurate types to the library's consumers.
Given that statement, we quickly noticed the issue with the as property. We looked at different options, and found out that @chakra-ui had a great way of handling it. This RFC details what those patterns are and how we implemented them in Orbit.

## Different way of having static typings on the `As` property

Before we dive into how our the implementation is done, let's have a look on how the end result looks like to our consumers. 
There is 2 approaches: Using the base implementation which give generic typings, useable in most situations, and a custom approach to implement exact typings of the as property.

### Option 1: Using the base implementation and intellisense

Every component in orbit is exported with the most accurate type for that component. For instance, the Button component is typed with all the props of a regular buttons, since it's the most frequent scenario. In this example, even if formtarget is not visible in the documentation, it's still available through intellisense and type checked.

```jsx
<Button type="submit" formtarget="_blank">Submit</Button>
```

For some components, there is not a DOM element strongly associated with the component. In those case, the default value is "div", but in the cases where the as property change often, on the Box
component for instance, we simply provide all the possible HTML attributes for that component.

```jsx
<Box id="myBox">
```

Finally, if you try to provide a Custom Component to the as property of a Box component, the property of that Custom Component won't be proposed by default through the intellisense and won't be type checked. 

```jsx
<TextLink as={RouterLink} to="/flight-details"> // The property isn't provided via intellisense, but can still be added
    Flight details
</TextLink>
```

It's ok in some cases, but if your developing a component that is going to be reused a lot, you should look at Option 2. 

### Option 2: Using forwardRef from @orbit-ui/react-components

`forwardRef` is the recommended approach as it ensures your components forwards their reference properly. Orbit defined its own `forwardRef` that adds the HTML or React properties to the component.

>  Note ⚠️: You need to use forwardRef from @orbit-ui not react

Example of the way the link is exported by default : 
```jsx
import { forwardRef } from "@orbit-ui/react-components";

// This way of exporting is not specifying a type to use as its default as property. So we add all the HTML properties
export const Link = forwardRef<InnerLinkProps>((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));

// Those two way of writing are equivalent
export const Link = forwardRef<InnerLinkProps, Element>((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));
```

Example of the way the link could be exported to properly type check the RouterLink's properties.

```jsx
import { forwardRef } from "@orbit-ui/react-components";

export const MyRouterLink = forwardRef<InnerLinkProps, RouterLink>((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));
```

The `forwardRef` defined in @orbit-ui/react-components returns an [OrbitComponent](orbitcomponent) instead of the standard ForwardRefExoticComponent from React.

## OrbitComponent

The `OrbitComponent` is a type that is used to mark specific components as Orbit components rather than using ForwardRefExoticComponent.
This is because an `OrbitComponent` comes with the specific props of the component and adds properties extracted from the as property type. It also removes the forwardedRef property declared in the Inner[X]Props interface, which is a standard pattern in Orbit.

`OrbitComponent` takes 2 type generic, the props of the component, and the specific type of the as property. 

The type property could be one of the following : 
- an element type the element type (like "div", "button", etc), 
- a React component Type
- Element, or any of its subtype.

## Concrete Implementation of the OrbitComponent

The `OrbitComponent` uses a bunch of Typescript utils function. This section will detail the role of each of those helper functions.

>  Note ⚠️: This section won't be updated with each changes in those types. This section is used to document decisions taken at this point in time.

Starting with the OrbitComponent Type.

```tsx
import { ForwardRefExoticComponent, ForwardRefRenderFunction, WeakValidationMap, forwardRef as reactForwardRef } from "react";

export function forwardRef<P extends Record<string, any>, T = HTMLElement>(render: ForwardRefRenderFunction<AsRef<T>, P>) {
    return (reactForwardRef(render) as unknown) as OrbitComponent<T, P>;
}

export interface OrbitComponent<T, P> extends ForwardRefExoticComponent<MergeWithAs<T, P>> {
    defaultProps?: Partial<any>;
    propTypes?: WeakValidationMap<any>;
}
```

Orbit's `forwardRef` function returns an OrbitComponent, and override its prop to return an ForwardRefExoticComponent while merging the component's props with the props of the type passed as the As : 
`ForwardRefExoticComponent<MergeWithAs<T, P>>`

If we take a look at the merge function : 

```tsx
type MergeWithAs<T, P> = RightJoinProps<PropsOf<T>, OmitCommonProps<P>> & {
    [key: string]: any;
};
```

`MergeWithAs` does a couple of things : 
- Get the props of the As Type : `PropsOf<T>`
- Omit the common props of our inner interface, like "forwardedRef" which is an internal typed used to forward refs : `OmitCommonProps<P>`
- Merge those 2 props, prioritizing the type on the right : `RightJoinProps<PropsOf<T>, OmitCommonProps<P>>`
- Finally, we took the decision that our component accept ALL extra props : `[key: string]: any;`. This allow the consumer to pass forward any props to the DOM element underneath.


Finally, we have `PropsOf`, which is the helper type that gives the props of the as property

```tsx
type PropsOf<T> =
    T extends ElementType ? HTMLProps<UnwrapElementType<T>> & ComponentProps<T> & RefAttributes<UnwrapElementType<T>> :
    T extends HTMLElement ? HTMLProps<T> & RefAttributes<T> :
    never;
```

If `T` is an ElementType, so a string or a React Component : 
- Adds all the default props of an generic html element : `HTMLProps<UnwrapElementType<T>>` --- This decision has been made "to be safe". We want to make sure that the generic html props are valid on our component. However, since we know exactly what props the type expects, we could remove this part and everything would still work properly.
- Adds the props of that component : `ComponentProps<T>`
- Adds a ref property to that element : `RefAttributes<UnwrapElementType<T>>`

