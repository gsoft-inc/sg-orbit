# @orbit-ui/icons

## Usage

As a React component:

```javascript
import { IconClear } from "@orbit-ui/icons";

<IconClear />
```

As a React file:

```javascript
import cabinetEmpty from "@orbit-ui/icons/icon-clear-10x10.svg";

<img src={cabinetEmpty} />
```

As a CSS background file:

```css
.cabinet-empty: {
    background: url("@orbit-ui/icons/icon-clear-10x10.svg");
}
```

## Maintainers

The following documentation is only for the maintainers of this repository.

### Icons Guidelines

In order to be included in Orbit UI an icon must satisfy the followind guidelines

- The icon (refered as it from now on), must be available in a small(16x16), medium (24x24) and large(32x32) format when used as an interface icon.
- It should not be specific to an app, e.g. Azure specific icons.
- It must be used as part of an interface, illustrations, product icons, should'nt be submitted to this library.
- It should be uncoloured, any icon that has many colours or need to be coloured, should be in your solution.
- When the icon is used in a mono repo component it should live in the icon project, the size and colour rules (1 and 2) don't apply in those case.

### Naming convention

- An icon name should describe it's look and not usage. (e.g. trash.svg instead of delete.svg)
- An icon should always be appended by it's numeric size (e.g. trash-32x32.svg)
- If an icon has some states, add it to the file name (e.g. trash-empty-32x32.svg)
- Although not ideal when an svg has to be coloured add the colour name(refer to sg-brand colour names) after it's name and before it's size (e.g. trash-empty-cloud-300-24x24.svg)
