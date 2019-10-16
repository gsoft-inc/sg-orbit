# Contributing

The following documentation is only for the maintainers of this repository.

- [Monorepo setup](#monorepo-setup)
- [Installation](#installation)
- [Develop a component](#develop-a-component)
- [Update the website](#update-the-website)
- [Release the packages](#release-the-packages)
- [Release Storybook](#release-storybook)
- [Release the website](#release-the-website)
- [Available commands](#commands)
- [Testing](#testing)
- [CI](#ci)
- [Add a new package to the monorepo](#add-a-new-package-to-the-monorepo)
- [Add a new Yarn script](#add-a-new-yarn-script)
- [Gotchas to remember](#gotchas-to-remember)

## Monorepo setup

This repository is managed as a monorepo that is composed of many npm packages. 

For more information on monorepo:

- [Babel Github](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
- [Shopify Github](https://github.com/Shopify/quilt/blob/master/Decision%20records/00%20-%20Use%20a%20Lerna%20monorepo.md)
- [Google](https://www.google.com/search?q=monorepo)

### Lerna

[Lerna](https://github.com/lerna/lerna) is used to manage this monorepo. The packages of the monorepo can be found in the [packages](/packages) directory. 

Exceptionally the website and Storybook are not managed by the monorepo tooling since it's not meant to be published as an npm package. The website can be found in the [website](/website) directory and Storybook can be found in the [storybook](/storybook) directory.

Since Yarn workspace feature offer native mono-repo capabilities and a seemless integration with Lerna this is our goto package manager for this project.

When Lerna is configured to use Yarn, the installation of the npm dependencies and the management of the packages inter-dependencies will be delegated to Yarn. It result in an increase of performance and a more reliable experience than using the same features from Lerna. The native integration between Lerna and Yarn make it worthwill to switch from npm to Yarn for this project.

So why do we use Lerna if Yarn workspace take care of everything?

Lerna workflow greatly facilitate the release of the packages of a monorepo. 

For more information, read the following Lerna commands documentation:

- [version](https://github.com/lerna/lerna/tree/master/commands/version)
- [publish](https://github.com/lerna/lerna/tree/master/commands/publish)

This monorepo is configured to release the packages independently. The decision to release or not a package is automatically based on wether the code of the package has changed or not.

### Yarn workspace

As mentionned, this monorepo is using Yarn workspace feature to handle the installation of the npm dependencies and manage the packages inter-dependencies.

It's also important to note that Yarn workspace will **hoist** the npm dependencies at the root of the workspace. This means that there isn't any *node_modules* directory nested inside the packages directories. The npm dependencies are installed in a *node_modules* directory at the root of the workspace and a single *yarn.lock* file is generated at the root of the workspace.

Since the website and Storybook are not handled by the monorepo tooling, the [website](/website) and [storybook](/storybook) directories will also contain a *node_modules* directory and a *yarn.lock* file.

## Installation

This project use Yarn workspace. Therefore, you must install Yarn:

```
choco install yarn
``` 

For more options to install Yarn, view https://yarnpkg.com/lang/en/docs/install/#windows-stable.

To install the project, open a terminal at the root of the workspace and execute the following command:

```bash
yarn bootstrap
```

The installation should take up to 5 minutes.

By default, the packages, Storybook and the website are installed.

To only install the packages, instead, use the following command:

```bash
yarn bootstrap:pkg
```

If you want to install Storybook later, use the default installation command or:

```bash
yarn bootstrap:sb
```

If you want to install the website later, use the default installation command or:

```bash
yarn bootstrap:website
```

During the installation you will encoutered several missing *peerDependencies* warnings. Ignore those warnings, this is happening because the *devDependencies* of this monorepo are defined at the root of the workspace.

## Develop a component

The following documentation is a brief overview of the tools and processes involved in the development of a component. For more information, please read the [React components documentation](/packages/react-components).

### Storybook

Every components must be developed in [Storybook](https://storybook.js.org).

Storybook is a convenient sandbox that help the developpers write organized and isolated stories that match the specifications of the component. Storybook also facilitate functionnal testing and integrate very well with automated visual testing technologies.

The resulting Storybook *playbook* will represent a catalog of all the Sharegate design system components and will be available online for the design team.

For more informations about automated visual tests, read the [Testings](#testing) section.

### Start developing

The tooling to develop a component involve 2 processes:

- A process that watch & re-compile the packages
- A process that run the Storybook app

Therefore, [open 2 terminals in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals).

The first terminal will watch & compile the packages. Execute the following command at the root of the workspace:

```bash
yarn start
```

The second terminal will start the Storybook app. Executing the following command at the root of the workspace:

```bash
yarn start-sb
```

Any updates to the packages (components, SUI theme, tachyons, ...) or Storybook's stories will automatically re-compile the packages and refresh the Storybook app accordingly.

## Update the website

The tooling to update the website involve 2 processes:

- A process that watch & re-compile the packages
- A process that run the website

Therefore, [open 2 terminals in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals).

The first terminal will watch & compile the packages. Execute the following command at the root of the workspace:

```bash
yarn start
```

The second terminal will start the website. Execute the following command at the root of the workspace:

```bash
yarn start-website
```

Any updates to the packages (components, SUI theme, tachyons, ...) or the website's pages  will automatically re-compile the packages and refresh the website accordingly.

## Release the packages

Releasing the packages includes several steps:

1. Compile the packages code for production
2. Identifies packages that have been updated since the previous release (Read the [Lerna](#lerna) section.)
3. Bump the version of the identified packages
4. Modifies package metadata to reflect new release
5. Publish the packages to npm
6. Push those changes to Git with a tag
7. Create a new Github release associated to the tag created previously
8. Optionally deploy Storybook and the document Website 

Fortunatelly, this is all automated with a few commands!

Before you release, make sure you have **write access** to every selected npm packages and that you are [logged in to npm](https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line).

To release, open a terminal at the root of the workspace and execute the following commands:

```bash
yarn new-version
yarn release-pkg
yarn push-release <yyyy-MM-dd>
yarn release-sb [optional]
yarn release-website-prod [optional]
```

After you released the packages, create a [Github release](https://github.com/gsoft-inc/sg-orbit/releases) for the Git annotated tag [yyyy-MM-dd] created earlier by the `push-release` command and list all the changes that has been published.

Dont forget to **publish** the release.

### Troubleshooting

#### Github

Make sure you're Git is clean (No pending changes).

#### npm

Make sure you have **write access** to the selected npm packages.

If you are using 2FA, make sure you specified a valid OTP.

#### Compilation

If the packages failed to compile, it's easier to debug without executing the full release flow everytime. To do so, instead, execute the following command:

```bash
yarn build:pkg
```

By default, packages compilation output will be in their respective *dist* directory. For more details, read the [packages](/packages) README file.

## Release Storybook

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b420380-aed1-4dc6-b002-6efe7b413025/deploy-status)](https://app.netlify.com/sites/sg-storybook/deploys)

Releasing Storybook includes a few steps:

1. Build the packages
2. Build storybook into a static web app
3. Deploy the static web app to Netlify

Before you release, make sure you have access to the GSoft Netlify team.

To release, open a terminal at the root of the workspace and execute the following command:

```bash
yarn build:pkg
yarn release-sb
```

Open a web browser and navigate to https://sg-storybook.netlify.com.

### Troubleshooting

#### Netlify

Login to [Netlify](https://app.netlify.com) and make sure you have access to the GSoft team and the **sg-storybook** site.

Make sure the site `App ID` of **sg-storybook** site match the `--site` parameter of the script `deploy` in the [storybook/package.json](/storybook/package.json) file.

To deploy Storybook without building the static web app everytime, execute the following command:

```bash
yarn deploy-sb
```

## Release the website

[![Netlify Status](https://api.netlify.com/api/v1/badges/65b52a34-8224-4783-bed2-64ffd05d36af/deploy-status)](https://app.netlify.com/sites/sg-orbit/deploys)

Releasing the website includes a few steps:

1. Build the packages
2. Build docz into a static web app
3. Deploy the static web app to Netlify

Before you release, make sure you have access to the GSoft Netlify team and the **sg-orbit** site.

You can release the website on a staging or production environment.

### Staging

To release on the staging environment, open a terminal at the root of the workspace and execute the following command:

```bash
yarn build:pkg
yarn release-website
```

Open a web browser and navigate to https://5d1663eba8dbff36f23ecdf0--sg-orbit.netlify.com.

### Production

To release on the production environment, open a terminal at the root of the workspace and execute the following command:

```bash
yarn build:pkg
yarn release-website-prod
```

Open a web browser and navigate to https://sg-orbit.netlify.com.

### Troubleshooting

#### Netlify

Login to [Netlify](https://app.netlify.com) and make sure you have access to the GSoft team and to **sg-orbit** site.

Make sure the site `App ID` of **sg-orbit** site match the `--site` parameter of the scripts `deploy-staging` and `deploy-prod` in the [website/package.json](/website/package.json) file.

To deploy the website without building the static web app everytime, execute any of the following command:

```bash
yarn deploy-website
yarn deploy-website-prod
```

## Commands

Here's an exhaustive list of all the commands you might need to use. The following commands must be executed in a terminal opened at the root of the workspace.

### bootstrap

Install the npm dependencies for every packages of the monorepo and the website. Once the npm dependencies are installed a custom **setup** step will be executed for every packages and the website.

Depending of the packages / website, the setup step will perform a number of required additional installation tasks.

As an example, the *semantic-ui-theme* package must be **build once** before it can be **watch**.

```bash
yarn bootstrap
```

### bootstrap:pkg

Same as *bootstrap* but only for the packages.

```bash
yarn bootstrap:pkg
```

### bootstrap:sb

Same as *bootstrap* but only for Storybook.

```bash
yarn bootstrap:sb
```

### bootstrap:website

Same as *bootstrap* but only for the website.

```bash
yarn bootstrap:website
```

### start

Compile & watch all the packages.

```bash
yarn start
```

### start-sb

Start Storybook.

```bash
yarn start-sb
```

### start-docs

Start the Storybook docs.

```bash
yarn start-docs
```

### build

Build all the packages, Storybook and the website for production.

```bash
yarn build
```

### build:pkg

Same as *build* but only for the packages.

```bash
yarn build:pkg
```

### build:sb

Same as *build* but only for Storybook.

```bash
yarn build:sb
```

### build:docs

Same as *build* but only for the Storybook docs.

```bash
yarn build:website
```

### build-theme

Same as *build* but only for the SUI theme.

```bash
yarn build-theme
```

### release-pkg

View the section [Release the packages](#release-the-packages).

### release-pkg-next

Same as *release-pkg* but with the *next* [dist-tag](https://docs.npmjs.com/cli/dist-tag).

### release-sb

View the section [Release Storybook](#release-storybook).

### release-docs

View the section [Release the website](#release-the-website).

### reset

Reset the monorepo installation. The following will be deleted:

- All the *node_modules* directories
- All the *yarn.lock* files
- All the compiled & cache folders

```bash
yarn reset
```

If you encounter the following error:

```bash
C:\Dev\20_gsoft\sg-orbit\node_modules\rimraf\bin.js:47
      throw er
      ^

[Error: EPERM: operation not permitted, unlink 'XXX\sg-orbit\node_modules\@types'] {
```

Close & re-open VSCode and delete manually the *node_modules* folder at the root of the workspace.

### update

Use this command when you update a dependency and you want it installed without executing the setup steps.

Use this command if you add a new package to the monorepo and you need to update the packages inter-dependencies.

```bash
yarn update
```

### lint

Execute all the linters.

```bash
yarn lint
```

### test

Execute all the interaction tests.

```bash
yarn test
```

### chromatic

Launch the automated visual tests on Chromatic QA. For more information on the automated visual tests, read the [Testing](#testing) section.

Before running make sure you built the packages with the `build:pkg` command.

```bash
yarn chromatic
```

## chromatic-theme

Same as *chromatic* but only for the SUI theme.

Before running make sure you built the theme with the `build-theme` command.

```bash
yarn chromatic-theme
```

## chromatic-materials

Same as *chromatic* but only for the materials parts.

```bash
yarn chromatic-materials
```

## Testing

For testing the components we currently rely only on multiple testing strategies.

### Visual testing

Visual testing assert on what visually appears on the screen instead of asserting on specifics CSS selectors or DOM elements.

This is a more *black box* and *robust* testing approach since it shouldn't requires to modify the tests if the code refactor haven't change anything visually.

This approach is usually strictly use to assert that the visual of a component do not regress. Since it's easy and very efficient to write a robust test with this approach, we also use it to test the specifications of a component that are related to the behaviors and states. 

Therefore, prefer this approach to [interactions](#interaction-testing) and [api testing](#api-testing) when possible.

Setting all the tools to perform automated visual tests involve a lot of time and knowledge. Therefore, we bought a license of [Chromatic QA](https://www.chromaticqa.com). This is the perfect tool for us since it perfectly integrate with Storybook. 

For access to our Chromatic QA environment, ask to join the [gsoft-inc](https://github.com/gsoft-inc) on Github.

For more information about automated visual testing:

- https://storybook.js.org/docs/testing/automated-visual-testing
- https://www.youtube.com/watch?v=QE-xQxN9Sps

### Interaction testing

UI is all about interacting with the user. We need to test if a component work properly when those interactions occurs.

This approach is used to cover the interaction behaviors of a component.

Examples:

- Ensure that a given element X is visible when the user click on the element Y.
- Ensure that an handler of the component interface is called when the user on the element Y.

To facilite those tests, we use a combination of [Jest](https://jestjs.io/) and [React testing library](https://testing-library.com).

For more information about interaction testing:

- https://storybook.js.org/docs/testing/react-ui-testing/#2-interaction-testing

### API testing

API testing is usefull to tests the properties of a component that can hardly be tested with visual testing.

Visual testing can easily assert that the `disabled` property of a component visually work as expected. Asserting that the `onChange` handler has been only called once when the user type a value in a textbox is harder.

This is where API testing shine.

To facilite those tests, we use a combination of [Jest](https://jestjs.io/) and [React testing library](https://testing-library.com).

## CI

[Circle CI](https://circleci.com) is the continuous integration platform for this repository. To have access to the CI environment, ask to join the [gsoft-inc](https://github.com/gsoft-inc) on Github.

2 builds are currently configured:

### On commits

On every commits the CI will execute the linters.

### Nightly

Once per night, the CI will execute the automated visual tests. Those tests can't be executed on every commits since visual test snapshots are pricy and limited.

For more information on the automated visual tests, read the [Testing](#testing) section.

### Troubleshooting

#### SSH

To investigate general problems with Circle CI you can [debug with SSH](https://circleci.com/docs/2.0/ssh-access-jobs).

#### Chromatic & Storybook

If Chromatic can't reach the Storybook server, the Storybook potentially can't compile.

Sadly the Chromatic CLI doesn't properly relay Storybook compilation errors. To see the errors, build the Storybook app locally.

## Add a new package to the monorepo

There is a few steps to add a new packages to the monorepo.

Before you add a new package, please read the [GSoft Github guidelines](https://github.com/gsoft-inc/github-guidelines#npm-package-name).

### Create the package

First, create a new folder matching the package name in the [packages](/packages) directory.

Open a terminal, navigate to the newly created directory and execute the following command:

```bash
yarn init
```

Answer the CLI questions.

Once the *package.json* is generated, please read again the [GSoft Github guidelines](https://github.com/gsoft-inc/github-guidelines#npm-package-name) and make sure the package name, author and license are valid.

Dont forget to add the [npm scope](https://docs.npmjs.com/about-scopes) *"@orbit-ui"* before the package name. For example if the project name is "foo", your package name should be "@orbit-ui/foo".

Make sure the package publish access is *public* by adding the following to the *package.json* file:

```javascript
"publishConfig": {
    "access": "public"
}
```

### Dependencies

npm *dependencies* and *peerDependencies* must be added to the package own *package.json* file.

**However**, the *devDependencies* must be added to the [package.json](package.json) file at the root of the workspace.

Why?

Because packages hoisting is dangerous! When multiple packages of the monorepo requires the same dependencies **but with a different version** there is no garantee on which version will be hoisted to the *node_modules* directory at the root of the workspace and which version will be installed locally. To prevent all kinds of problems, always install the *devDependencies* at the root of the workspace. This ensure that every packages use the same version of the dependencies.

If you are uncertain wether or not you should add a *peerDependencies*, please read the post [dependencies-done-right](https://yarnpkg.com/blog/2018/04/18/dependencies-done-right/) on the Yarn website.

### Scripts

Before adding a script, make sure you read the following [gotcha](#lerna-and-npm-run-all).

### React components

If you're package is a new React component, please read the [React components documentation](/packages/react-components)

### Bundle

If appropriate, dont forget to add your new package to the [bundle package dependencies](/packages/bundles/react/package.json).

## Add a new Yarn script

When adding a new script, there is a few rules to follow.

### Think in terms of atomic scripts

A script should only do one thing. This practice promote better readability and reusability.

Then you can write top level script that compose all those atomic scripts to provide a functionnality.

Instead of doing:

```javascript
"scripts": {
    "build": "rimraf dist && babel src -d dist"
}
```

Do:

```javascript
"scripts": {
    "build": "run-s delete transpile",
    "delete": "rimraf dist",
    "transpile": "babel src -d dist"
}
```

### A script should be executable from the root of the workspace

Make sure you add a script entry in the [package.json](package.json) file at the root of the workspace even if your script is already define in a package or the website.

### Lerna scripts should be executed from the root of the workspace

Lerna provide the ability to [run](https://github.com/lerna/lerna/tree/master/commands/run) or [execute](https://github.com/lerna/lerna/tree/master/commands/exec) a script through all the packages of the monorepo.

Those scripts must be added in the *package.json* file at the root of the workspace since Lerna is installed at the root.

### Use run-p or run-s

To run multiple commands simultaneously, use `run-p`.

To run multiple commands sequentially, use `run-s`.

Otherwise use `yarn`.

### Naming

If a script can be called in batch, separate the discriminant by ":"

Example:

```bash
"scripts": {
    "build": "run-p build:*",
    "build:pkg": "...",
    "build:sb": "..."
}
```

Otherwise, separare words with "-"

Example:

```bash
"scripts": {
    "deploy-sb": "..."
}
```

## Gotchas to remember

### --ignore-scripts

The `bootstrap` command specify `--ignore-scripts` to yarn install because otherwise semantic-ui will try to reinstall everytime a `yarn install` is executed. I haven't found any other way to prevent it.

### Chromatic QA & custom font

The Storybook configuration doesn't load the *Calibre* custom font if the app is started by the chromatic CLI because visual tests offer inconsistent results when a custom font is loaded. Not sure why.

### How Lerna collect updated packages

As a starting point to determine which packages changed, Lerna used the last [Git annotated tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) available. Without a tag, Lerna will infer that all the packages changed.

### cross-env

The following will not work:

```bash
"prepublishOnly": "cross-env NODE_ENV=production && yarn build"
```

But the following work:

```bash
"prepublishOnly": "cross-env NODE_ENV=production yarn build"
```

For other variables that need to be pass accross tasks, please read the following issue: https://github.com/kentcdodds/cross-env/issues/176

### Lerna and npm-run-all

Never use npm-run-all (run-s, run-p) in a lifecycle scripts of a leaf projects. Instead of running in the leaf project scope, it will run at the root project scope.

For more information, read this issue: https://github.com/lerna/lerna/issues/2145#issuecomment-506801262

### react-testing-library and user actions side effects

Some side effects happens in the browsers following a user actions.

For example, if a user click on a textbox, the textbox will then have focus and be the "active element".

The focus side effect doesn't happen with react-testing-library. For more information view issues [https://github.com/testing-library/jest-dom/issues/53](#53) and [https://github.com/testing-library/jest-dom/issues/59](#59).

The solution to this problem have been to create an higher level abstraction library called [https://github.com/testing-library/user-event](user-event) that will take care of triggering the event AND the side effects.

For more information on the topic view the issue [https://github.com/testing-library/dom-testing-library/issues/107](#107).
