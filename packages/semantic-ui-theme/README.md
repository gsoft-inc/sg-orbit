# Semantic UI for Sharegate

## Consumers

### Installation

Install the library from *npm*

```bash
npm install @sharegate/semantic-ui-theme --save
```

### Usage

To add a new Semantic UI control in your project...

Make sure you add all the Semantic UI *CSS* files required by the control. Those file will be located in `@sharegate/semantic-ui-theme/`.

You should import them in your `main.css`.

```css
/* main.css */
/* ... */

@import "~@sharegate/semantic-ui-theme/button.css";
```

If you want to add the whole theme you can do the following:

```css
/* main.css */
/* ... */

@import "~@sharegate/semantic-ui-theme";
```

For maintainers installation view the installation section below.

For the behavior of your control (the JavaScript) use the official Semantic UI React library. https://react.semantic-ui.com/

### Documentation

For our customization: https://sharegate.github.io/semantic-ui-sg/index.html

For official Semantic UI documentation: https://semantic-ui.com/

For Semantic UI React documentation: https://react.semantic-ui.com/

## Maintainers

The following documentation is _only_ for the maintainers of the package.

### Installation

Use the same installation instruction than consumers but for indivual files add a "/dist" folder.

This means:

```css
/* main.css */
/* ... */

@import "~@sharegate/semantic-ui-theme/dist/button.css";
```

### Development flow

To start developing, run the following command:

```bash
npm start
```

BLABLA

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

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/sharegate/semantic-ui-sg/blob/master/LICENSE.
