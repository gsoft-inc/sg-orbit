# @orbit-ui/react-components

This package is a bundle of all the Orbit UI React components.

Individual packages are available in the [components](/components) directory.

## Maintainers

The following documentation is only for the maintainers of this repository.

## Add a new component

Adding a new component package involve a few extra steps. Before you go forward with this section, make sure you read and followed the [Add a new packages to the monorepo](https://github.com/gsoft-inc/sg-brand#add-a-new-packages-to-the-monorepo) section. 

- [Write storybook stories](#write-storybook-stories)
- [Update the documentation](#update-the-documentation)
- [Include the component in the bundle](#include-the-component-in-the-bundle)

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
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

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
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

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

## Babel

The components are transpiled to ES5 compatible code using [babel](https://babeljs.io/). The [babel configuration](/babel.config.js) is located at the root of the *react-components* package.

The current configuration use [babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) to optimize the file size of the components.

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.



