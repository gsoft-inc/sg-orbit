# @orbit-ui/tachyons

This package is a custom version of the [Tachyons library](https://github.com/tachyons-css/tachyons). This version is based on the variables of [@orbit-ui/foundation](../foundation) and the spacing scale has been increased to 10.

## Usage

Import the core of Tachyons and [override the default variables manually](#override-defaut-variables) to match your brand:

```css
@import "~@orbit-ui/tachyons";
```

Or, import Tachyons for a specific brand:

```css
@import "~@orbit-ui/tachyons/apricot.css";
@import "~@orbit-ui/tachyons/overcast.css";
@import "~@orbit-ui/tachyons/desktop.css";
```

### Override default variables

The following default variables can be overrided by simply redeclaring the variables in a `:root` CSS class:

```css
:root {
    --primary: #c63a0c;
}
```

For more information:

https://sg-orbit.netlify.com
http://tachyons.io/docs

### Legacy version

If you support an old browser that doesn't support CSS variable and you dont have a build process to transpile the CSS variables, import the legacy version:

```css
@import "~@orbit-ui/tachyons/legacy.css";
@import "~@orbit-ui/tachyons/legacy.min.css";
```

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
