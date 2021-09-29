Theming Strategy in Orbit

## Summary

Orbit has been, in it's infancy, a monolitich piece of CSS, the only theming options were to modify the primary colors in order to adapt to each products in the Sharegate ecosystem. With Orbit 2.0 we aim to support, among things, a dark theme, while opening the door for future theming possibilities. In this RFC we propose a new architecture for CSS Custom Properties and a way to organize them.

## Motivation

Being able to quickly add design tokens, and semantic variables, without questionning where to do so, is a main goal of ours. This is why we came up with a strategy, and are moving many custom properties. In order to provide a consistent theme, we are introducing the concept of semantic colors. Semantic colors are a layer over design tokens representing a meaning, e.g. `border-negative` has a semantic meaning while `border-beetle-6` has none and could be used in many situations. This make our intefaces more cohesive, our codebase easier to maintain and gives intention to our design choices. As Adobe Spectrum sums it up:

> Too much color can create cognitive overload, affecting users’ ability to efficiently interact with products.

### CSS Variables

CSS Variables are the values needed to construct and maintain our design system, from spacing, color, typograghy, to shadows. Think of CSS Variables as Design Tokens or constants. These values are reflected in the form of CSS Custom Properties(variables). These are prefixed with `o-ui-global`. CSS Variables are not affected by a theme. or color scheme, they are what one could call a constant.

On top of design tokens lives *semantic variables*, these have an assigned meaning and expedite design decisions. One example of a semantic variable would be a `border-negative` variable, this variable would use the `beetle-6` color behind the scene. When in need of a border that represent a negative state one designer wouldn't need to reinvent the wheel and should use this abstraction : `border-negative`.  These are prefixed with `o-ui-alias`.

Here is an example on how semantic variables work at a core level: 

`--o-ui-text-alias-negative-1` is a semantic variable who uses `--o-ui-beetle-6` when in a *light* theme and `--o-ui-beetle-8` when in a *dark* theme.

### Supported Themes

Orbit supports themes as well as color schemes. Themes can ben defined with adjectives, dark, light, dense, etc while color schemes are a bunch of colors reorganized. Semantic variables need to support themes. Some variables can also  be affected by a color scheme. Color schemes colors can also be affected by a theme.

| ![theme-vs-color-scheme.jpg](https://raw.githubusercontent.com/gsoft-inc/sg-orbit/master/rfcs/assets/theme-vs-color-scheme.jpg?raw=true) |
| :----------------------------------------------------------: |
| *Themes and Color Schemes while similar are not affecting colors the same way* |

### Components usage

#### Alias variables

While developing or modifying an Orbit component, it is important to use alias variables whenever possible. Remember that aliases are theme sensitive, which is what we aim for in order to support a dark theme as well as keeping apps concise.

Here instead of using `color: var(--o-ui-marine-10);` we refer to the defined primary text color.

``` css
// Label.css
.o-ui-field-label {
    color: var(--o-ui-text-alias-1);
    white-space: nowrap;
}
```

If you think it is absolutely necessary to add a new alias, this need to be discussed with the Orbit core team. Once approved this alias need to be added as a symbol in Figma, and documented in Orbit.

#### Global variables

Global variables have their use, spacing, typography and other static values are not tied to semantic variables, aka themes are not affecting these. 

```css
// Label.css
.o-ui-field-label-required {
    margin-left: var(--o-ui-sp-1);
}
```

#### Local variables

Sometimes a component needs reusable values through it's UI while not explicitly needing to be shared between other components. It is alright to create reusable local variables in a component's CSS file. These variables should be prefixed with the components name and be still be accesible globally and be scoped to the `o-ui` class. Here is a typical scenario:

```css
// Input.css
.o-ui {
    --o-ui-input-border-color: var(--o-ui-b-alias-1);
    --o-ui-input-border-radius: var(--o-ui-shape-rounded);
}

.o-ui-input {
    color: var(--o-ui-input-border-color);
    // ...
}
```

As you can see the local variables are not prefixed by global or alias while keeping a logical scope through it's `-{c omtonent-name} prefix. A subcomponent would have access to it, e.g. NumberInput. Defining these variables in the component's CSS file makes it easier to remove unnecessary CSS when removing a component.

#### Utility variables

Utility variables are variables that helps crafting experiences, while being utilitarian. These are not values that have been discussed with designers, a circle being a circle there is no art direction on these. Creating a circle with a border-radius is a common CSS trick that is used all over Orbit and the web in general. Instead of repeating the same line of CSS all the time, there is an utility for that. Many more utilities are available through Orbit, check Orbit's documentation for more information.

```css
.o-ui {
  --o-ui-shape-circular: 100%;
}

// ...

.circle {
    border-radius: var(--o-ui-shape-circular);
}
```

### Implementation in Orbit

Orbit's utility variables, these are unprefixed, are declared at the root CSS file `react-components/src/index.css` as well as generic CSS declarations like the app default font-color.

Global variables, alias variables as well as alias CSS classes are declared at the foundation level, grouped by what they affect: background, color, spacing, etc. Each of these files contains global declarations as well as theme and color scheme declarations. Here's is an example of the structure of a CSS file.

```css
// background.css
.o-ui {
  --o-ui-global-background-...: value;
}

.o-ui-light-theme {
  --o-ui-alias...: value;
}

.o-ui-dark-theme {
  --o-ui-alias...: value;
}

.o-ui-apricot {
  --o-ui-alias...: value;
}

...
```

Concretely here are the files that holds all of Orbit CSS

- colors : all of Orbit's colors
- background : aliases for our backgrounds
- text: aliases for our text colors
- lines: aliases for our borders
- icons: aliases for our icon fills
- shadows: shadow definitions as well as their aliases
- spacing / type scale

### Implementation in apps

In order to be able to benefits from themes, an app need some setup. Apart from having Orbit installed, see Orbit documentation, 3 classes are needed at the root element of your app, Orbit ThemeProvider takes care of this. Here is the classes provided along with what they do

- `o-ui` gives you access to design tokens via CSS Custom Properties
- `o-ui-dark` `o-ui-light` gives you access to semantic tokens via CSS Custom Properties
- `o-ui-apricot` `o-ui-desktop` gives you access to brand related semantic tokens, e.g. `--o-ui-primary-50`

Once setup you can refer to these variables in your CSS, as well as use their utility classes counterpart.

The *Theme Provider* component is responsible of adding the 3 needed classes: `-o-ui o-ui-{theme} -o-ui-{color-scheme}) in order to benefit from the complete Orbit UI experience.

Using a semantic token in your CSS

```css
.tile {
   background-color: var(--o-ui-background-alias-negative-1);
}
```

Using a semantic token as a CSS class

```html
<div className="background-negative-1">...</div>
```

Directly on a dom element

```html
<div style="background-color: var(--o-ui-background-alias-negative-1)">...</div>
```

It is not recommended to override these variables, except to circuvment a bug. 
