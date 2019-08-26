# @orbit-ui/tachyons

This package is a custom version of the [Tachyons library](https://github.com/tachyons-css/tachyons). This version is based on the variables of *@orbit-ui/foundation* and the spacing scale has been increased to 10.

## Usage

In your `main.css`, import Tachyons:

```css
@import "~@orbit-ui/tachyons";
```

You can use it as-is or override the default variables by simply redeclaring the variables in a `:root` CSS class.

``` css
:root {
    --primary: #c63a0c;
}
```

For more information:

https://sg-orbit.netlify.com
http://tachyons.io/docs

### Legacy

To use the legacy version of Tachyons:

```css
@import "~@orbit-ui/tachyons/tachyons.legacy.css";
```

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
