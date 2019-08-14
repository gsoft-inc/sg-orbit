# Consumers

You can install components from individual packages or with a global package that contains the whole components suit.

To install them individually:

```
npm install @sharegate/react-date-range-picker

...

import { DateRangePicker } from @sharegate/react-date-range-picker

```

To install all of them with a single package

```
npm install @sharegate/react-components

...

import { DateRangePicker } from @sharegate/react-components

```

# Maintainers

## Installation

## Commands

### start

### build

### watch

## Build

All packages distribution code is outputted in their respective `dist` folder.

## Add a new dependency to a component

## Add a new component

Add a package dependency to the react-components package.json.

Add an export to the react-components index.js file.

## Babel

The components are transpiled to ES5 compatible code using babel, you can find the babel configuration in `build/babel.config.js`.

## Storybook

The components are available with Storybook. Storybook configuration can be found in the `.storybook` folder.

Note that we use a .babelrc config file because storybook doesn't currently support .babelrc.js or babel.config.js file.

You can add a new story for a component adding it in is respective `stories` folder.

## Chromatic

https://www.chromaticqa.com/

# @sharegate/react-components

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.

## TODO

- Write components developments guidelines
- Sortir les keys dans "shared"

Nice talk about why Chromatic: https://www.youtube.com/watch?v=QE-xQxN9Sps

## Guidelines

https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07

- Every story must correspond to a test specification.
- Always have a default story that expose the relevant properties of the component as knobs

Of course we can always reproduce this problem by entering the same input into the knobs, but it's better to write a fixed story for this input. This will increase your regression testing and clearly outline the limits of the component(s) to the rest of your team.

Storybook is a fantastic tool for visual regression testing because every story is essentially a test specification.


