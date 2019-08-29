# @orbit-ui/foundation

## Usage

Import the core of the foundation and [override the default variables manually](#override-defaut-variables) to match your brand:

```css
@import "~@orbit-ui/foundation";
```

Or, import the foundation for a specific brand:

```css
@import "~@orbit-ui/foundation/apricot.css";
@import "~@orbit-ui/foundation/overcast.css";
@import "~@orbit-ui/foundation/desktop.css";
```

### Override default variables

The following default variables can be overrided by simply redeclaring the variables in a `:root` CSS class:

```css
:root {
    --primary-50:  #c63a0c;
    --primary-100: #c63a0c;
    --primary-200: #c63a0c;
    --primary-300: #c63a0c;
    --primary-400: #c63a0c;
    --primary-500: #c63a0c;
    --primary-600: #c63a0c;
    --primary-700: #c63a0c;
    --primary-800: #c63a0c;
    --primary-900: #c63a0c;
}
```

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
