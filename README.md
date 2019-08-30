<p align="center">
    <img alt="Sharegate Orbit" src="https://raw.githubusercontent.com/gsoft-inc/sg-orbit/master/assets/orbit.svg?sanitize=true" width="546">
</p>

<p align="center">
  Orbit UI, the design system for Sharegate web apps.
</p>

<p align=center>
    <a href="https://circleci.com/gh/gsoft-inc/sg-orbit/tree/master"><img alt="build" src="https://img.shields.io/circleci/build/github/gsoft-inc/sg-orbit/master"></a>
    <a href="https://david-dm.org/gsoft-inc/sg-orbit?type=dev" title="devDependencies"><img src="https://david-dm.org/gsoft-inc/sg-orbit/dev-status.svg"/></a>
</p>

<p align=center>
    <a href="https://lerna.js.org"><img alt="lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" /></a>
    <a href="https://yarnpkg.com"><img alt="yarn" src="https://img.shields.io/badge/dependencies%20managed%20by-yarn-blue" /></a>
</p>

Orbit UI is a design system develop by Sharegate to help create the best experience for our customers and drive consistency between all our web apps.

## Documentation website

[![Netlify Status](https://api.netlify.com/api/v1/badges/65b52a34-8224-4783-bed2-64ffd05d36af/deploy-status)](https://app.netlify.com/sites/sg-orbit/deploys)

The documentation website contains information about the foundation of Orbit UI and the React components.

https://sg-orbit.netlify.com

## Storybook website

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b420380-aed1-4dc6-b002-6efe7b413025/deploy-status)](https://app.netlify.com/sites/sg-storybook/deploys)

The storybook website contains stories for Orbit UI custom React components.

Every components will contains a **play** and a **specs** directory. You should only use the **play** directory. The **specs** directory is for automated testing purpose.

https://sg-storybook.netlify.com

## npm packages

Multiple npm packages compose Orbit UI. Based on which type of application you're building you'll choose a different composition of packages.

If you're building a website or any non React app, have a look at the [Core](#core) packages.

If you're building a React app, have a look at the [React Components](#react-components) packages.

### Core

| Package | Version | Dependencies |
|--------|-------|------------|
| [@orbit-ui/css-normalize](/packages/css-normalize) | [![npm](https://img.shields.io/npm/v/@orbit-ui/css-normalize.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/css-normalize) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/css-normalize)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/css-normalize) |
| [@orbit-ui/fonts](/packages/fonts) | [![npm](https://img.shields.io/npm/v/@orbit-ui/fonts.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/fonts) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/fonts)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/fonts) |
| [@orbit-ui/icons](/packages/icons) | [![npm](https://img.shields.io/npm/v/@orbit-ui/icons.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/icons) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/icons)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/icons) |
| [@orbit-ui/foundation](/packages/foundation) | [![npm](https://img.shields.io/npm/v/@orbit-ui/foundation.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/foundation) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/foundation)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/foundation) |
| [@orbit-ui/tachyons](/packages/tachyons) | [![npm](https://img.shields.io/npm/v/@orbit-ui/tachyons.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/tachyons) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/tachyons)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/tachyons) |

- [@orbit-ui/css-normalize](/packages/css-normalize): is Orbit UI custom CSS normalizer for Edge, Chrome, Firefox and Safari.
- [@orbit-ui/fonts](/packages/fonts): contains the fonts of Orbit UI.
- [@orbit-ui/icons](/packages/icons): contains the icons of Orbit UI.
- [@orbit-ui/foundation](/packages/foundation): is a set of CSS variables for Orbit UI colors, spacing and typography.
- [@orbit-ui/tachyons](/packages/tachyons): is a custom version of the [Tachyons library](https://github.com/tachyons-css/tachyons).

#### Installation

You can pick and choose the **core** packages to install but you should normally install all of them. Strict *peerDependencies* are defined to ensure that dependent packages are installed together. If a required package is missing during the installation, a warning will be output by your package manager.

To install all the core packages with npm:

```bash
npm install @orbit-ui/css-normalize @orbit-ui/fonts @orbit-ui/icons @orbit-ui/foundation @orbit-ui/tachyons
```

Then, in your `main.css` file:

```css
@import "~@orbit-ui/fonts";
@import "~@orbit-ui/css-normalize";
@import "~@orbit-ui/foundation[/(apricot|overcast|desktop).css]";
@import "~@orbit-ui/tachyons[/(apricot|overcast|desktop|legacy).css]";
@import "~@orbit-ui/semantic-ui-theme";
```

### React Components

Orbit UI components are built on top of [Semantic UI](https://semantic-ui.com/) and [Semantic UI React](https://react.semantic-ui.com/).

When available, you should use a component from [Semantic UI React](https://react.semantic-ui.com/). If a UI requirement cannot be achieved with the existing components, a custom one can be added to this repository.

| Package | Version | Dependencies |
|--------|-------|------------|
| [@orbit-ui/semantic-ui-theme](/packages/semantic-ui-theme) | [![npm](https://img.shields.io/npm/v/@orbit-ui/semantic-ui-theme.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/semantic-ui-theme) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/semantic-ui-theme)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/semantic-ui-theme) |
| [@orbit-ui/react-components](/packages/react-components) | [![npm](https://img.shields.io/npm/v/@orbit-ui/react-components.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/react-components) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/react-components)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/react-components) |
| [@orbit-ui/react-date-range-picker](/packages/react-components/components/date-range-picker) | [![npm](https://img.shields.io/npm/v/@orbit-ui/react-date-range-picker.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/react-date-range-picker) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/date-range-picker)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/date-range-picker) |
| [@orbit-ui/react-multi-select](/packages/react-components/components/multi-select) | [![npm](https://img.shields.io/npm/v/@orbit-ui/react-multi-select.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/react-multi-select) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/multi-select)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/multi-select) |
| [@orbit-ui/react-search-input](/packages/react-components/components/search-input) | [![npm](https://img.shields.io/npm/v/@orbit-ui/react-search-input.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/react-search-input) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/search-input)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/search-input) |
| [@orbit-ui/react-popup](/packages/react-components/components/popup) | [![npm](https://img.shields.io/npm/v/@orbit-ui/react-popup.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/react-popup) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/popup)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/popup) |
| [@orbit-ui/react-components-shared](/packages/react-components/components/shared) | [![npm](https://img.shields.io/npm/v/@orbit-ui/react-components-shared.svg?maxAge=3600)](https://www.npmjs.com/package/@orbit-ui/react-components-shared) | [![Dependency Status](https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/shared)](https://david-dm.org/gsoft-inc/sg-orbit.svg?path=packages/react-components/components/shared) |

- [@orbit-ui/semantic-ui-theme](/packages/semantic-ui-theme): is Orbit UI custom theme for [Semantic UI](https://semantic-ui.com/). The theme is based on the variables of *@orbit-ui/foundation*.
- [@orbit-ui/react-components](/packages/react-components): is a bundle containing every Orbit UI custom React components.
- [@orbit-ui/react-*](/packages/react-components/components): are packages thats contains invidual Orbit UI custom React component. 

#### Installation

Before installing any components packages, please install the [core packages](#core).

A few options are available...

**Only use the components from Semantic UI React**

With npm:

```bash
npm install @orbit-ui/semantic-ui-theme semantic-ui-react
```

Then, [import the Semantic UI theme](/packages/semantic-ui-theme#installation) and read the React components [usage documentation](https://sg-orbit.netlify.com).

**Use all the Orbit UI components**

With npm:

```bash
npm install react-spring styled-jsx semantic-ui-react moment lodash @orbit-ui/semantic-ui-theme @orbit-ui/react-components
```

Then, [import the Semantic UI theme](/packages/semantic-ui-theme#installation) and read the React components [usage documentation](https://sg-orbit.netlify.com).

**Hand-pick a few Orbit UI components**

With npm:

```bash
npm install react-spring @orbit-ui/semantic-ui-theme semantic-ui-react @orbit-ui/react-*
```

Then, [import the Semantic UI theme](/packages/semantic-ui-theme#installation) and read the React components [usage documentation](https://sg-orbit.netlify.com).

## Maintainers

View the [contributors documentation](CONTRIBUTING.md).

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.

