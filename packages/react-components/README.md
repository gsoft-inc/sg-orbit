# @sharegate/react-components

This package is a bundle of all the Sharegate Orbit React components.

Individual packages are available in the [components](https://github.com/gsoft-inc/sg-brand/tree/master/packages/react-components/components) directory.

## Maintainers

The following documentation is only for the maintainers of this repository.

## Add a new component

Adding a new component package involve a few additional steps to the [Add a new packages to the monorepo](https://github.com/gsoft-inc/sg-brand#add-a-new-packages-to-the-monorepo) procedure. 

The package must be available through the *@sharegate/react-components* npm package.

To do so:

1. Add a dependency to the new npm package in the [package.json](https://github.com/gsoft-inc/sg-brand/blob/master/packages/react-components/package.json) file of the *react-components* package. The dependency must be precisely the current version of the new package, otherwise Yarn workspace will fail to create the simlink.

2. Add an export to the [index.js](https://github.com/gsoft-inc/sg-brand/blob/master/packages/react-components/src/index.js) file of the *react-components* package.

## Storybook

The components are available with Storybook. Storybook configuration can be found in the `.storybook` folder.

Note that we use a .babelrc config file because storybook doesn't currently support .babelrc.js or babel.config.js file.

You can add a new story for a component adding it in is respective `stories` folder.

### Write a new story

https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07

- Every story must correspond to a test specification.
- Always have a default story that expose the relevant properties of the component as knobs

Of course we can always reproduce this problem by entering the same input into the knobs, but it's better to write a fixed story for this input. This will increase your regression testing and clearly outline the limits of the component(s) to the rest of your team.

Storybook is a fantastic tool for visual regression testing because every story is essentially a test specification.

## Chromatic

https://www.chromaticqa.com/

## Babel

The components are transpiled to ES5 compatible code using babel, you can find the babel configuration in `build/babel.config.js`.

Talk about babel runtime.



## Installation

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

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.

## TODO

- Sortir les keys dans "shared"




