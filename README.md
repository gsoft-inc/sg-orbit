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

## Add a new NPM packages

Dont add new packages to the root of the workspace unless you know what you are doing.

Instead add new packages to sub packages of the workspace.

To do so, in your terminal, navigate to the directory of the package and the use yarn to add the package:

`yarn add PACKAGE_NAME [--dev]` will install the package.

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

## Add a new project

Create a new folder matching your project name in /packages

Go to that folder with a terminal and execute `yarn init`.

Answer the questions.

Dont forget to add the scope "@sharegate" before your package name. For example if your project name is "toto", your package name should be "@sharegate/toto".

Make sure you set the license to "Apache-2.0"

Make sure you set the author to "Groupe Sharegate inc."

Make sure you set the repository to "https://github.com/gsoft-inc/sg-brand.git"

Add your new project has "peerDependency", "devDependency" or "dependency" of any project who need it.

If the "website" project use your new project, make sure you add it to /website/scripts/setup-website-yarn-links.js.

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

## Publish

To release, go to the root project of the workspace and do the following:

```
yarn new-version
yarn release:pkg
git push
```

## Good to remember

Bootstrap specify "--ignore-scripts" to yarn install because otherwise semantic-ui will try to reinstall everytime we do a yarn install. Haven't found any other way to prevent it.

Chromaticqa is inconsistant if we load a custom font

# TODO

- Hot reload doesn't seem to work anymore with storybook? Maybe it's the update to the babel config of the components? Maybe the update to storybook?

- Prettier + eslint doesn't work everywhere? like react-components.

- Deprecate old packages (semantic-ui-sg, tachyons-sg, sg-brand-foundation)

- Inclure la "files" property dans les package.json

- Hookify components

- Some sort of intellisense? Like typescript types?

- unit test for react-components/shared

- Configure Chromatic for CI: https://docs.chromaticqa.com/setup_ci

- Have distinct icon in storybook sidebar for story intented for designers or devs

- Prendre la dernière version de Apricot pour remote-search-input (https://dev.azure.com/sharegate/Sharegate.Gravt/_git/Sharegate.Gravt/pullrequest/3118)

- Remove "babel-eslint" dependencies from the root workspace once the new eslint config is done.

- Setup Chromatic QA, add Francis, Alex & send email alerts maybe?

- Delete custom script sto copy LICENSE when released: https://github.com/lerna/lerna/commit/d410a58e3039ea7db0ad6f6d50f33b2024cda709


////////

How to use eslint auto-fix instead of prettier and still use prettier for style

1- add "*.js" and "*.jsx" to .prettierignore
2- in settings.json make sure 
        "eslint.autoFixOnSave": true,
        "javascript.format.enable": false,
        "editor.formatOnSave": true
        "prettier.eslintIntegration": false

