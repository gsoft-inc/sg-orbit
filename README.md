# sg-brand

<p align="center">
    <a href="https://circleci.com/gh/gsoft-inc/sg-brand/tree/master"><img alt="CircleCI Status" src="https://circleci.com/gh/gsoft-inc/sg-brand/tree/master.svg?style=svg"></a>
</p>

## NPM packages

Mettre l'équivalent de la page de babel ici?

## Storybook

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b420380-aed1-4dc6-b002-6efe7b413025/deploy-status)](https://app.netlify.com/sites/sg-storybook/deploys)

https://sg-storybook.netlify.com

## Components documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/65b52a34-8224-4783-bed2-64ffd05d36af/deploy-status)](https://app.netlify.com/sites/sg-orbit/deploys)

https://sg-orbit.netlify.com

## Maintainers

### Monorepo

This project repository is managed as a monorepo that is composed of many NPM packages. 

For more information on monorepo:

- [Babel Github](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
- [Shopify Github](https://github.com/Shopify/quilt/blob/master/Decision%20records/00%20-%20Use%20a%20Lerna%20monorepo.md)
- [Google it!](https://www.google.com/search?q=monorepo)

**Lerna**

We use Lerna for managing our monorepo. All our packages can be found in the [packages](https://github.com/gsoft-inc/sg-brand/tree/master/packages) directory. 

The only exception is the website that is not managed by the monorepo tooling since it's not a package. The website can be found in the [website](https://github.com/gsoft-inc/sg-brand/tree/master/website) directory.

Since Yarn workspace feature offer native mono-repo capabilities and a seemless integration with Lerna this is our goto package manager for this project.

When Lerna is configured to use Yarn it will delegate the installation of the NPM packages and the dependencies linking to Yarn. It result in an increase of performance and a more reliable experience than using the Lerna dependencies linking feature and NPM. The native integration between Lerna and Yarn make it worthwill to switch from NPM to Yarn for this project.

So why do we need Lerna if Yarn workspace take care of everything?

Well the Lerna workflow make it very easy to publish the packages of a monorepo. For more information, view the [publish command](https://github.com/lerna/lerna/tree/master/commands/publish#readme) of Lerna.

**Yarn workspace**

As stated before, the monorepo is using the Yarn workspace feature to handle the installation of the NPM packages and linking the inter-dependencies of the monorepo packages.

Remember that only the **packages** are handled by Yarn workspace, the **website is not handled** by the monorepo tooling.

It's also important to understand that Yarn workspace will **hoist** all the dependencies to the root of the workspace. This means that you won't find any *node_modules* directory inside the packages directory. All the dependencies are installed in a *node_modules* directory at the root of the workspace and a single *yarn.lock* file is generated, also at the root of the workspace.

Since the website is not handled by the monorepo tooling so you will also find a *node_modules* directory and a *yarn.lock* file inside the *website* directory.

**Website dependencies linking**

If the website is not handled by the monorepo tooling how come it can consume the non-published packages of the monorepo?

To make this work, a [custom script](https://github.com/gsoft-inc/sg-brand/blob/master/website/scripts/setup-website-yarn-links.js) has been developed to automatically create symlinks between the website and the packages of the monorepo.

### Installation

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

By default, the packages and the website are installed.

To only install the packages, instead, use the following command:

```bash
yarn bootstrap:pkg
```

If you want to install the website later, use the default installation command or:

```bash
yarn bootstrap:website
```

### Develop a component

**Storybook**

We recommend to develop every components in [Storybook](https://storybook.js.org).

This is a convenient sandbox that help the developpers write organized and isolated stories for every specifications of the component. Storybook also facilitate functionnal testing and integrate very well with automated testing technologies.

When completed, the whole Storybook will represent a functional catalog of all the Sharegate design system components and will be available online for the design team.

For more informations about the automated tests, view the [Visual Regression Tests](https://github.com/gsoft-inc/sg-brand/blob/master/README.md#visual-regression-tests) section.

**Start developing**

The tooling to develop a component involve 2 processes:

- A process that watch & re-compile the packages
- A process that run the Storybook app

Therefore, you should [open 2 terminals in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals).

In the first terminal, watch & compile the packages by executing the following command at the root of the workspace:

```bash
yarn start
```

In the second terminal, start the Storybook app by executing the following command at the root of the workspace:

```bash
yarn start:sb
```

You can update any packages (components, SUI theme, tachyons, ...) or stories and your Storybook will be automatically refreshed with the changes.

For more information about the development of a component view blabla..

### Update the website

The tooling to update the website involve 2 processes:

- A process that watch & re-compile the packages
- A process that run the website

Therefore, you should [open 2 terminals in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals).

In the first terminal, watch & compile the packages by executing the following command at the root of the workspace:

```bash
yarn start
```

In the second terminal, start the website by executing the following command at the root of the workspace:

```bash
yarn start:website
```

You can update any packages (components, SUI theme, tachyons, ...) or pages of the website and your website will be automatically refreshed with the changes.

For more information about the development of the website view blabla..

### Release the packages

Releasing the packages to NPM includes a few steps:

1. Compile the packages code for production
2. Choose which packages to release (based on which packages changed)
3. Bump the version of every packages selected for release
4. Updates all the packages that requires the selected packages to reflect the version bump
5. Publish the packages to NPM
6. Push the changes to Git (the changes are the version bump)

Good news, this is all automated with a few commands!

Before you release, make sure you have **write access** for all the NPM packages that will be published and that you are [logged in to NPM](https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line).

To release, open a terminal at the root of the workspace and execute the following:

```bash
yarn new-version
yarn release:pkg
git push
```

#### Troubleshooting

**Github**

Make sure you dont have any pending changes.

**NPM**

Make sure you have **write access** to the NPM package.

If you are using 2FA, make sure you specified a valid OTP

**Compilation**

If the packages failed to compile you can build the packages without executing the whole release flow. To do so, execute the following command:

```bash
yarn build:pkg
```

By default, the output of the packages compilation should be in their respective *dist* directory. For more details, view the specific packages README.

### Release Storybook

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b420380-aed1-4dc6-b002-6efe7b413025/deploy-status)](https://app.netlify.com/sites/sg-storybook/deploys)

Releasing Storybook includes a few steps:

1. Build the storybook into a static web app
2. Deploy the static web app to Netlify

Before you release, make sure you have access to the GSoft Netlify team.

To release, open a terminal at the root of the workspace and execute the following:

```bash
yarn release:sb
```

Open a web browser and navigate to https://sg-storybook.netlify.com.

#### Troubleshooting

**Netlify**

Login to [Netlify](https://app.netlify.com) and make sure you have access to te GSoft team and to the **sg-storybook** site.

Make sure the site `App ID` of the site **sg-storybook** match the `--site` parameter of the script `sb:deploy` in the *packages/react-components/package.json* file.

To deploy Storybook without building the static web app everytime, navigate to the *packages/react-components* directory and execute the following command:

```bash
yarn sb:deploy
```

**Build the static web app**

If the packages failed to compile you can build the packages without executing the whole release flow. To do so, execute the following command:

```bash
yarn build:sb
```

The output will be available in the *packages/react-components/storybook/dist* directory. For more details, view the specific packages README.

### Release the website

[![Netlify Status](https://api.netlify.com/api/v1/badges/65b52a34-8224-4783-bed2-64ffd05d36af/deploy-status)](https://app.netlify.com/sites/sg-orbit/deploys)

Releasing the website includes a few steps:

1. Build the docz into a static web app
2. Deploy the static web app to Netlify

Before you release, make sure you have access to the GSoft Netlify team and to the **sg-orbit** site.

To release, open a terminal at the root of the workspace and execute the following:

```bash
yarn release:sb
```

Open a web browser and navigate to https://sg-orbit.netlify.com.

#### Troubleshooting

**Netlify**

Login to [Netlify](https://app.netlify.com) and make sure you have access to te GSoft team and to the **sg-orbit** site.

Make sure the site `App ID` of the site **sg-orbit** match the `--site` parameter of the scripts `deploy:staging` and `deploy:prod` in the *website/package.json* file.

To deploy the website without building the static web app everytime, navigate to the *website* directory and execute any of the following commands:

```bash
yarn deploy:staging
yarn deploy:prod
```

**Build the static web app**

If the packages failed to compile you can build the packages without executing the whole release flow. To do so, execute the following command:

```bash
yarn build:website
```

The output will be available in the *website/.docz/dist* directory. For more details, view the specific packages README.

### Commands

Here's an exhaustive list of all the commands you might need to use. All the following commands must be executed in a terminal opened at the root of the workspace.

**bootstrap**

Install the NPM packages for all the monorepo packages and the website. Once the NPM packages are all installed a **setup** step will be executed in every packages and the website.

Depending of the packages / website, the setup step will perform a number of required additional installation tasks.

For example, the semantic-ui theme must be **build once** before it can be **watch**.

```bash
yarn bootstrap
```

**bootstrap:pkg**

Same as *bootstrap* but only for the packages.

```bash
yarn bootstrap:pkg
```

**bootstrap:website**

Same as *bootstrap* but only for the website.

```bash
yarn bootstrap:website
```

**start**

Compile & watch all the packages.

```bash
yarn start
```

**start:sb**

Start Storybook.

```bash
yarn start:sb
```

**start:website**

Start the website.

```bash
yarn start:website
```

**build**

Build all the packages, Storybook and the website for production.

```bash
yarn build
```

**build:pkg**

Same as *build* but only for the packages.

```
yarn build:pkg
```

**build:sb**

Same as *build* but only for Storybook.

```
yarn build:sb
```

**build:website**

Same as *build* but only for the website.

```
yarn build:website
```

**reset**

**update**

**lint**

**chromatic**

### Add a new NPM packages

Dont add new packages to the root of the workspace unless you know what you are doing.

Instead add new packages to sub packages of the workspace.

To do so, in your terminal, navigate to the directory of the package and the use yarn to add the package:

`yarn add PACKAGE_NAME [--dev]` will install the package.

### Add a yarn scripts

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

### Add a new project

Create a new folder matching your project name in /packages

Go to that folder with a terminal and execute `yarn init`.

Answer the questions.

Dont forget to add the scope "@sharegate" before your package name. For example if your project name is "toto", your package name should be "@sharegate/toto".

Make sure you set the license to "Apache-2.0"

Make sure you set the author to "Groupe Sharegate inc."

Make sure you set the repository to "https://github.com/gsoft-inc/sg-brand.git"

Add your new project has "peerDependency", "devDependency" or "dependency" of any project who need it.

If the "website" project use your new project, make sure you add it to /website/scripts/setup-website-yarn-links.js.

### Visual Regression Tests

### CI

### Storybook stories (potentiellement mettre ça dans le packages react-components)

## Good to remember

Bootstrap specify "--ignore-scripts" to yarn install because otherwise semantic-ui will try to reinstall everytime we do a yarn install. Haven't found any other way to prevent it.

Chromaticqa is inconsistant if we load a custom font

# TODO

- Doc une page packages à la Babel: https://github.com/babel/babel/blob/master/packages/README.md

- Hot reload doesn't seem to work anymore with storybook? Maybe it's the update to the babel config of the components? Maybe the update to storybook?

- Deprecate old packages (semantic-ui-sg, tachyons-sg, sg-brand-foundation)

- Inclure la "files" property dans les package.json

- Hookify components

- Some sort of intellisense? Like typescript types?

- Prendre la dernière version de Apricot pour remote-search-input (https://dev.azure.com/sharegate/Sharegate.Gravt/_git/Sharegate.Gravt/pullrequest/3118)

- Delete custom script sto copy LICENSE when released: https://github.com/lerna/lerna/commit/d410a58e3039ea7db0ad6f6d50f33b2024cda709

- Babel - compile for production

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.

