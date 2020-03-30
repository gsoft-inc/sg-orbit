# @orbit-ui/react-components

Full documentation available at: https://orbit.sharegate.design

## Add a new component

Orbit UI components are built on top of [Semantic UI](https://semantic-ui.com) and [Semantic UI React](https://react.semantic-ui.com).

When available, you should use a component from [Semantic UI React](https://react.semantic-ui.com). If a UI requirement cannot be achieved with the existing components, a custom one can be added to this repository.

Adding a new component package involve a few extra steps. Before you go forward with this section, make sure you read and followed the [Add a new packages to the monorepo](../../CONTRIBUTING.md#add-a-new-package-to-the-monorepo) section. 

- [Guidelines](#component-guidelines)
- [Write storybook stories](#write-storybook-stories)
- [Write tests](../../CONTRIBUTING.md#testing)
- [Update the documentation](#update-the-documentation)
- [Include the component in the bundle](#include-the-component-in-the-bundle)

### Guidelines

Make sure you read and understand the following [guidelines](#component-guidelines) before writing a component.

### Write storybook stories

As mentionned in the [contributing guide](../../CONTRIBUTING.md), Storybook is use to *develop*, *document* and *test* a component.

To develop and document, we leverage the [CSF](https://storybook.js.org/docs/formats/component-story-format/) and [MDX](https://storybook.js.org/docs/formats/mdx-syntax/) features of Storybook.

To test, we rely on a third party called [Chromatic](https://www.chromaticqa.com/) that fully integrate with Storybook to provide visual testing capabilities.

#### Develop and document

Development stories are written for 2 purposes:

- For the developper to test a component use case in a isolated story during the development lifecycle.
- For the design team to try the component behaviors.

Documentation stories are written... well for documentation purpose!

To define a story once for development and documentation a story must be written with [CSF](https://storybook.js.org/docs/formats/component-story-format/) in an `*.stories.mdx` file.

A story must:

- Be located in the `Components` top level section of the Storybook navigation menu (use `createComponentSection` utility function).
- The second level segment must be the capitalized name of the component.

Here's an exemple for the date range picker component:

```jsx
import { createComponentSection } from "@utils";

<Meta title={createComponentSection("Date Picker/range")} />
```

The component stories must provide:

- A story named *default* that render the component default state.
- A story named *knobs* with pre-configured [knobs](https://github.com/storybookjs/storybook/tree/next/addons/knobs). 

The stories must be located in a `stories` folder next to the `src` folder of your component. Storybook is configured to load the following component stories: `packages/react-components/src/*/stories/**.stories.mdx`.

```
/packages
    /react-components
        /components
            /date-pickers
                /src
                /stories
                    date-range-picker.stories.mdx
```

#### Tests

Tests stories are written to validate the specifications of a component with automated visual tests. Every specifications of the component must match at least one story. The specifications stories are validated [every night](https://circleci.com/gh/gsoft-inc) with [Chromatic](https://www.chromaticqa.com/) for visual regression issues.

Storybook is a fantastic tool for visual testing because a story is essentially a test specification.

Specifications stories must be written with the [storiesOf API](https://storybook.js.org/docs/formats/storiesof-api/) in a `*.chroma.jsx` file.

A story must:

- Be located in the `Chromatic` top level section of the Storybook navigation menu (use `createChromaticSection` utility function).
- The second level segment must be the capitalized name of the component (same as the development stories).

Here's an example:

```javascript
// date-range-picker.chroma.jsx

import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Date Picker/range))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .build()
            )
        .build();
}

stories("/segment")
    .add("story-name",
         () =>
            ...
    )
```

The stories must be located in `tests/chromatic` folder next to the `stories` folder of the component. Storybook is configured to load the following chromatic stories: `packages/react-components/src/*/tests/chromatic/**.chroma.jsx`.

For more information about the Storybook automated visual tests workflow, read the following [blog post](https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07).

#### Good to know

A stories should always import the Component from the `src` directory of the package. This way, it's possible to break through the source code instead of the *compiled* code. You will also benefits from faster reload time with HMR.

### Update the documentation

Add the new package to the [React components packages documentation](../../README.md#react-components). The badges will only be available once the package has been published.

### Include the component in the bundle

The package must be available through the *@orbit-ui/react-components* npm package.

To do so:

1. Add a dependency to the new npm package in the [package.json](/package.json) file of the *react-components* package. The dependency must match the current version of the new package, otherwise Yarn workspace will fail to create the symlink.

2. Add an export to the [index.js](/src/index.js) file of the *react-components* package.

## Component guidelines

Every Orbit UI custom components must share a consistent API and a similar design. Please read carefully the following guidelines before you develop a new component or update an existing one.

### Design

#### Functional components

All components should be developed as functional components.

#### Hooks

All components should leverage React hooks.

#### Styling

Use Tachyons classes as much as possible.

When you can't use Tachyons, define a custom CSS stylesheet and import it in your component.

Custom classes should use [Orbit UI foundation CSS variables](https://orbit.sharegate.design/?path=/docs/getting-started-foundation--page) when available.

#### Controlled & Auto-controlled

A component should always be develop to offer a [controlled](https://reactjs.org/docs/forms.html) and [auto-controlled](https://reactjs.org/docs/uncontrolled-components.html) usage. 

A *controlled* component gives a lot of flexibility to the consumer and is well fit for a lot of use cases but also involve additional code. We believe a component should be flexible but also painless to use. That's why a component should also offer an *auto-controlled* mode for basic use cases who don't requires controlling the props.

For more information, view the [auto-controlled-state](/components/shared/src/auto-controlled-state) directory. _NOTE: since we switched to functional components, this might not apply anymore. We haven't yet developed an alternative for functional components._

#### Composable

Components should be composable and configurable. Sub-components should be exposed from the root component.

Prefer exporting `DateRangePicker.Input` to `DateRangePickerInput`:

```jsx
// definition
function DateRangePicker() {
    ...
}

DateRangePicker.Input;

// usage
import { DateRangePicker } from "@orbit-ui/react-components";

<DateRangePicker.Input />
```

#### Derived state

If you need to compute a derived state, prefer using `getDerivedStateFromProps` to `componentDidUpdate`.

_NOTE: since we switched to functional components, this might not apply anymore._

#### Shorthand props

A component prop accepting an Orbit UI element should support [shorthand props](https://orbit.sharegate.design/?path=/docs/getting-started-shorthand-props--page).

#### Event handlers exposed by the component

An event handler prop exposed by a component should always:

- Provide the original Synthetic Event as the first argument.
- Provide the components props as the last argument.

```jsx
function MyComponent({ onChange }) {
    function handleChange(event) {
        onChange(event, this.props);
    }

    return (
        <input ... onChange={this.handleChange} />
    );
}
```

#### Never stop event propagation

A component shouldn't stop the propagation of an event. Instead, other parts of the code should determine wether or not it should handle the event.

For more information, read the following [blog post](https://css-tricks.com/dangers-stopping-event-propagation/).

#### Ref

A component `ref` should always be attached to the top most DOM element. A `ref` should never be attached to a React component.

#### Spread props

Unhandled props should always be spread on the root element of the component.

```jsx
function MyComponent({ className, children ...rest }) {
    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
}
```

#### Shared code

When possible, a component should rely on [react-components-shared](/components/shared) as much as possible.

### Developer experience

#### Props

All available props should be defined in the root component with [prop-types](https://github.com/facebook/prop-types). For most required props, instead of defining the prop as required with prop-types, you should instead provide a default value.

### Naming

#### Event handlers props

Event handler props should be prefix by `on` and be in the present tense.

Ex:

- Prefer `onChange` to `onChanged`
- Prefer `onItemClick` to `onItemClicked`

#### Boolean props

A boolean prop should be prefix with `is`.

The reason behind this is that the Semantic UI React components library use this naming convention and we want a consistent experience between the components.

Ex:

- Prefer `open` to `isOpen`
- Prefer `disabled` to `isDisabled`

#### Render function props

A function prop that is meant to render React component should be suffixed with `renderer`.

Ex:

- `itemRenderer`
- `valueRenderer`

#### Prefer simpler props name

When there is no possible *ambiguities*, prefer a simpler prop name.

For example, prefer `icon` to `inputIcon`.

#### Initial values props name

Auto-controlled components will usually expose initial values props. Those props should be prefix with `default`.

Ex:

- `defaultOpen`
- `defaultStartDate`
- `defaultValues`

### UX

#### States

A component should have a default state

A component should have a tab / focus state

A component should have an hover state

A component should have a disabled state

A component should have an error state

Input components should have a readonly state

#### Behaviors

If the component is an input, the value should be clearable with a clear button.

When a component can be open:

- it should close on blur
- the trigger should be focused when the component close

#### Accessibility

A non disabled component should always be accessible with tabs

A disabled component shouldn't be accessible with tabs

When a component offer multiple values, those values should be navigable with arrows and / or tabs.

The following keys should be standard for a component that can open:

- space, enter: open the component
- esc: close the component

The following keys should be standard for a button:

- enter: same as click

The following keys should be standard for an input:

- esc: clear the value

## Babel

The components are transpiled to ES5 compatible code using [babel](https://babeljs.io/). The [babel configuration](/babel.config.js) is located at the root of the *react-components* package.

The current configuration use [babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) to optimize the file size of the components.

## License

Copyright © 2019, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.



