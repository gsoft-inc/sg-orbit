# @orbit-ui/semantic-ui-theme

## Usage

In your `main.css`:

Import specific Semantic UI modules:

```css
@import "~@orbit-ui/semantic-ui-theme/button.css";
@import "~@orbit-ui/semantic-ui-theme/checkbox.css";
```

Or import the whole theme:

```css
@import "~@orbit-ui/semantic-ui-theme";
```

Full documentation available at: https://sg-orbit.netlify.com

## Maintainers

The following documentation is only for the maintainers of this repository.

### How to work with Semantic UI 

Prior to make any changes, please make sure you read the [Semantic UI documentation](https://semantic-ui.com/) and understand how [theming works](https://semantic-ui.com/usage/theming.html).

Semantic UI offer 3 layers of theming:
- Defaults Theme
- Packaged Theme
- Site Theme

Customization of Semantic UI should only happens at the **Packaged Theme** layer to ensure we can still benefits from updates.

Our custom theme is located in the theme [sharegate theme directory](/semantic/src/themes/sharegate).

_Currently, you shouldn't need to create additional theme._

In the *sharegate* theme folder, You will find 2 types of files: `.overrides` and `.variables`.

The `.variables` files are used to override the value of existing variables or introduce new variables.

The `.overrides` files provide the ability to override existing Semantic UI CSS selectors. **Before you override a selector, make sure this is your last resort**.

Before you override a selector, you should answer **no** to all the following questions:
- Can I use an existing Semantic UI variable to make my modification?
- Does my modification fix a use case specific to my current project? 
- Does my modification belong in the source code of my Sharegate project?

Finally ...

You should never do the followings:
- Update code in [semantic/src/definitions](/semantic/src/definitions)
- Update code in [semantic/tasks](/semantic/tasks)
- Update Semantic UI *default* theme in [semantic/src/themes/default](/semantic/src/themes/default)
- Use the *Site Theme* layer

### Bundle

When a new Semantic UI module is supported, dont forget to add it to the [bundle styles](../bundles/react/core.css).

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
