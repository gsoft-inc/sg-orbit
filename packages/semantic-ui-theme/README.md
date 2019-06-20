# Semantic UI for Sharegate

## Consumers

### Installation

Install the library from *npm*

```bash
npm install @sharegate/semantic-ui-sg --save
```

### Usage

To add a new Semantic UI control in your project...

Make sure you add all the Semantic UI *CSS* files required by the control. Those file will be located in `@sharegate/semantic/ui-sg/`.

You should import them in your `main.css`.

```css
/* main.css */
/* ... */

@import "~@sharegate/semantic-ui-sg/button.css";

```

For the behavior of your control (the JavaScript) use the official Semantic UI React library. https://react.semantic-ui.com/

### Documentation

For our customization: https://sharegate.github.io/semantic-ui-sg/index.html

For official Semantic UI documentation: https://semantic-ui.com/

For Semantic UI React documentation: https://react.semantic-ui.com/

## Maintainers

The following documentation is _only_ for the maintainers of the package.

### Installation

Clone the repository

Install the dependencies

```bash
npm install
```

Build Semantic UI

```bash
npm run build
```

Start developping

```bash
npm start
```

### Development flow

To start developing, run the following command:

```bash
npm start
```

Once started, a browser tab will open and serve the file `index.html`.

The `index.html` file should showcase all the Semantic UI components that has been customized to follow the `Sharegate Design Guidelines`.

When a change to any Semantic UI file or the `index.html` file is saved, the page will be automatically refresh.

### How to work with Semantic UI 

Prior to make any changes, please make sure you read the [Semantic UI documentation](https://semantic-ui.com/) and understand how [theming works](https://semantic-ui.com/usage/theming.html).

Semantic UI offer 3 layers of theming:
- Defaults Theme
- Packaged Theme
- Site Theme

Customization of Semantic UI should only happens at the **Packaged Theme** layer to ensure we can still benefits from updates.

Our implementation of the `Sharegate Style Guildelines` is located in the packaged theme `sharegate`. You can find it at `semantic/src/themes/sharegate`.

_Currently, you shouldn't need to create additional packaged theme._

In the `sharegate` theme folder, You will find 2 types of files: `.overrides` and `.variables`.

The `.variables` files are used to override the value of existing variables or introduce new variables.

The `.overrides` files provide the ability to override existing Semantic UI CSS selectors. **Before you override a selector, make sure this is your last resort**.

Before you override a selector, you should answer **no** to all the following questions:
- Can I use an existing Semantic UI variable to make my modification?
- Does my modification fix a use case specific to my current project? 
- Does my modification belong in the source code of my Sharegate project?

Finally ...

You should never do the followings:
- Update code in `semantic/src/definitions`
- Update code in `semantic/tasks`
- Update Semantic UI `default` theme in `semantic/src/themes/default`
- Use the `Site Theme` layer

### Publish

#### Semantic Versioning

Before you publish, make sure you understand [semantic versioning](https://semver.org/).

#### Go

First thing first... make sure you're logged in to NPM.

If you're not, run the following command

```bash
npm login
```

and follow the instructions.

Run the following command and let the magic happen

```bash
npm version major | minor | patch --otp=[YOU_AUTHENTICATOR_CODE]
```

If you have the following error

```bash
npm ERR! Git working directory not clean.
```

Make sure you've push your changes to Git prior to running the command.

#### What the magic does

The version script is based on the recipe described in the [npm-version documentation](https://docs.npmjs.com/cli/version).

The following steps will be executed in order

1. Bump the version of the package
2. Build Semantic UI
3. Delete the `publish` folder
4. Copy Semantic UI distribution files to the `publish` folder
5. Copy `package.json`, `LICENCE` and `README.md` files from the root to the `publish` folder
6. Commit + push the package changes and the tags
7. Publish the package to `NPM`

## License

Copyright © 2018, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/sharegate/semantic-ui-sg/blob/master/LICENSE.
