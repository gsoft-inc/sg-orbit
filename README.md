# Maintainer

EX doc: https://frint.js.org/docs/contributing/maintainers/

## Lerna

We use Lerna for managing our mono-repo. All our packages can be found in packages directory excepting the websites.

## Installation

This repository use yarn workspace. Therefore, you must install yarn:

`choco install yarn` or `choco update yarn` to get the latest version.

For more options to install yarn, view https://yarnpkg.com/lang/en/docs/install/#windows-stable.

To install the packages and link all the workspace dependencies:

`yarn install`

To install a new package:

`yarn ` will install the packages in every projects of the workspace.

### Why yarn?

yarn natively support mono-repo with the "workspace" feature. When Lerna is configured to use yarn it delegate all the packages installation and dependencies linking to yarn which result in an increase of performance and less bugs. The native integration between Lerna and yarn make it worthwill to switch from NPM to yarn for this repository.

yarn also natively support packages hoisting which results in less disk space consuption and faster installation.












## Yarn workspace

Why we dont use yarn workspace + lerna. Yarn workspace doesn't support packages nesting in version 1.

## Installation

To install the dependencies and link the mono-repo dependencies:

`npm install`


This project use "hoisting", therefore, to add a new package, use

`lerna add <package>` to add a package for the whole workspace

or

`lerna add <package> --scope <specific-project>` to add a package to a specific projet

NEVER USE `npm install`





