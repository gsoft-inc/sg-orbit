# @orbit-ui/react-components

This package is a bundle of all the Orbit UI React components.

Individual packages are available in the [components](/components) directory.

## Usage

```javascript
import { DateRangePicker, MultiSelect, ... } from "@orbit-ui/react-components";
```

https://sg-orbit.netlify.com

## Maintainers

The following documentation is only for the maintainers of this repository.

## Add a new component

Adding a new component package involve a few extra steps. Before you go forward with this section, make sure you read and followed the [Add a new packages to the monorepo](../../README.md#add-a-new-packages-to-the-monorepo) section. 

- [Guidelines](#component-guidelines)
- [Write storybook stories](#write-storybook-stories)
- [Update the documentation](#update-the-documentation)
- [Include the component in the bundle](#include-the-component-in-the-bundle)

### Guidelines

Make sur you read and understand the following [guidelines](#component-guidelines) before writing a component.

### Write storybook stories

The storybook is configured to look for stories in a *stories* directory under the component directory.

```
/react-components
    /components
        /component-foo
            /stories
                play.stories.js
                specs.stories.js
```

A component should provide 2 stories sections. A **play** section and a **specs** section.

#### play

Play stories are written for 2 purposes:

- For the developper to test a component use case in a isolated story during the development lifecycle.
- For the design team to try the component behaviors.

The play stories must be in a single file named after the following naming convention: `play.[stories|COMPONENT_NAME].stories.jsx`.

The section must provide:

- A story named *default* that render the component default state.
- A story named *knobs* with pre-configured [knobs](https://github.com/storybookjs/storybook/tree/next/addons/knobs). 

It's very important to configure the play stories to be ignored by chromatic QA in order to save on snapshots usage.

To easily follow all the requirements, use the following template:

```javascript
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder("[COMPONENT_NAME]|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default",
         () =>
            ...
    )
    .add("knobs",
         () =>
            ...
         { decorators: [withKnobs] }
    );
```

#### specs

Specifications stories are for automated visual tests. Every specifications of the component must match at least one story. The specifications stories are validated [every night](https://circleci.com/gh/gsoft-inc) with [Chromatic QA](https://www.chromaticqa.com/) for visual regression issues.

Storybook is a fantastic tool for visual testing because every story is essentially a test specification.

To easily add specifications stories, use the following template:

```javascript
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder("[COMPONENT_NAME]|specs")
        .segment(segment)
        .layoutWidth("80%")
        .build();
}

stories("/segment")
    .add("story-name",
         () =>
            ...
    )
```

For more information about the Storybook automated visual tests workflow, read the following [blog post](https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07).

**Troubleshooting**

If you encounter issues with Chromatic QA snapshots, try to increment the value of the `chromaticDelay` option.

### Update the documentation

Add the new package to the [React components packages documentation](https://github.com/gsoft-inc/sg-brand#react-components). The badges will only be available once the package has been published.

### Include the component in the bundle

The package must be available through the *@orbit-ui/react-components* npm package.

To do so:

1. Add a dependency to the new npm package in the [package.json](/package.json) file of the *react-components* package. The dependency must match the current version of the new package, otherwise Yarn workspace will fail to create the symlink.

2. Add an export to the [index.js](/src/index.js) file of the *react-components* package.

## Component guidelines

Every Orbit UI custom components must share a consistent API and a similar design. Please read carefully the following guidelines before you develop a new component or update an existing one.

### Design

#### Controlled & Auto-controlled

A component should always be develop to offer a [controlled](https://reactjs.org/docs/forms.html) mode usage. However, using a *controlled* component involve a lot of additional code
for the consumer and a component should as flexible as possible but also painless to use.

That's why a component should also offer an *auto-controlled* mode for some properties.

For more information, view the [auto-controlled-state](/components/shared/src/auto-controlled-state) directory.

#### Composable

Components should be composable and configurable. Sub-components should be exposed from the root component.

Prefer exporting `DateRangePicker.Input` to `DateRangePickerInput`:

```javascript
// definition

export class DateRangePicker extends AutoControlledPureComponent {
    static Input = DateRangePickerInput;
}

// usage
import { DateRangePicker } from "@orbit-ui/react-date-range-picker";

<DateRangePicker.Input />
```

#### Derived state

If you need to compute a derived state, prefer using `getDerivedStateFromProps` to `componentDidUpdate`.

#### Event handlers exposed by the component

An event handler prop exposed by a component should always:

- Provide the original Synthetic Event as the first argument.
- Provide the components props as the last argument.

```javascript
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

#### Anonymous functions

Components shouldn't render anonymous functions.

```javascript
function MyComponent() {
    function handleChange() {
        ...
    }

    return (
        <input ... onChange={this.handleChange} />
    );
}
```

For more information, read the following posts:

- http://johnnyji.me/react/2016/06/27/why-arrow-functions-murder-react-performance.html
- https://www.freecodecamp.org/news/the-best-way-to-bind-event-handlers-in-react-282db2cf1530/

### Development experience

#### Props

All available props should be defined in the root component with [prop-types](https://github.com/facebook/prop-types). For most required props, instead of defining the prop as required with prop-types, you should instead provide a default value.

All default props should be defined in the root component.

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

#### Accessibility

A component should fully support keyboard.

## Babel

The components are transpiled to ES5 compatible code using [babel](https://babeljs.io/). The [babel configuration](/babel.config.js) is located at the root of the *react-components* package.

The current configuration use [babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) to optimize the file size of the components.

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.



