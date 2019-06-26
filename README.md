file:
https://github.com/lerna/lerna/blob/0b88ffbbcfe95543d71f6c72e7053087cdc7d19a/package.json#L27-L50
(pour website en autre)
https://docs.npmjs.com/files/package.json#local-paths


# Consumers

# Maintainers

EX doc: https://frint.js.org/docs/contributing/maintainers/

## Lerna

We use Lerna for managing our mono-repo. All our packages can be found in packages directory excepting the websites.

### yarn

yarn natively support mono-repo with the "workspace" feature. When Lerna is configured to use yarn it delegate all the packages installation and dependencies linking to yarn which result in an increase of performance and less bugs. The native integration between Lerna and yarn make it worthwill to switch from NPM to yarn for this repository.

yarn also natively support packages hoisting which results in less disk space consuption and faster installation.

## Installation

This repository use yarn workspace. Therefore, you must install yarn:

```
choco install yarn
``` 

or to update the latest version of yarn:

```
choco update yarn
```

For more options to install yarn, view https://yarnpkg.com/lang/en/docs/install/#windows-stable.

To install the packages and link all the workspace dependencies:

```
yarn bootstrap
```

## Add new packages

To install a new package:

`yarn ` will install the packages in every projects of the workspace.

## Add a yarn scripts

Think of scripts as atomic script. It means that a script should only do one thing, then you can have other scripts than compose those scripts.

Example:

Instead of doing

```
"scripts": {
    "build": rimraf dist && babel src -d dist 
}
```

Do

```
"scripts": {
    "build": "yarn delete && yarn transpile",
    "delete": "rimraf dist",
    "transpile": "babel src -d dist"
}
```

Every scripts should be executable from the root of the workspace. Make sure you add a script entry in the package.json located at the root event if your script is already define in a sub-project.

Every "Lerna" related scripts should be added in the the root package.json since Lerna is installed at the root of the workspace.

For example, take the react-components project, since we execute a babel compilation for all the individual components, we must define a `lerna exec` command, to call the babel CLI, therefore, we added this script in the root package.json

You can have scripts in sub project. Again, take the react-components project. A script is define in the actual project to start storybook since the workspace doesn't know about storybook, this is a dependency of react-components not of the whole workspace. Therefore, the scripts is define in the react-components project and a script entry has been added to the root package.json to call the script in the sub project.

To run multiple commands simultaneously, use `run-p`, to run multiple commands sequentially, use `run-s`, otherwise use `yarn`

## Build

To build the whole brand use the command:

```
yarn build
```

To build a specific package of the brand, use the specific build command. For example, to build the react components, use:

```
yarn build:rc
```

By default, the output should be in a `dist` folder. For more details, view the specific packages README.

## Good to remember

Bootstrap specify "--ignore-scripts" to yarn install because otherwise semantic-ui will try to reinstall everytime we do a yarn install. Haven't found any other way to prevent it.

# TODO

- Configure babel minimum browser to reduce bundle size

- Use https://github.com/lodash/babel-plugin-lodash to prevent from using the whole lodash? (maybe there is also something to do with SUI react, view https://github.com/Semantic-Org/Semantic-UI-React/issues/830)

- S'inspirer de https://github.com/Semantic-Org/Semantic-UI-React/blob/master/.babel-preset.js

- Use babel with runtime: https://www.youtube.com/watch?v=O_wbkFdr3WM

- Make sure to bundle for env = "production" (styled jsx optimizeForSpeed) + les babel transfo
```
  "scripts": {
    "build": "babel src --out-dir . --ignore **/__tests__",
    "prepare": "cross-env NODE_ENV=production npm run build",
    "watch": "babel -w src --out-dir . --ignore **/__tests__"
  },
```

- Prettier workspace setup
- ESLint workspace setup

- Add vscode-styled-jsx to the recommended workspace extensions

- Packager les licences + README

- Storybook should use shared babel-preset.js file

- Deprecate old packages (semantic-ui-sg, tachyons-sg, sg-brand-foundation)

- Pour SUI ajouter le mapping de less au .overrides et .variables

- Share a browserslist config

- Inclure la "files" property dans les package.json

- Hookify components

- Some sort of intellisense? Like typescript types?

- Add a fake api project to be able to create stories for the remote search input

