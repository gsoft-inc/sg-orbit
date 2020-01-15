# Chromatic Tests

## What are we testing?

## Atoms

Atomic properties cannot be combined to form another variation. A _primary_ button cannot be _secondary_ while being _primary_. These are the categories that form our core Chromatic tests. Atomic properties are what a button is at its core, a *primary* button with a subtle appearance (primary basic), a shorter *secondary* button (secondary compact).

### Atomic Variations

We aim to test variations that affects a plethora of CSS properties (padding, width, background color). These properties are divided in two main categories, layout (padding, width, height, etc) and skin (background, text colour, opacity, etc).

By only testing one category of variation at a time(layout, skin) we aim not to test redundant combinations, since SemanticUI properties rarely affects layout and skin at the same time. E.g. a _ghost_ button(skin) won't be tested with a size variation(layout) but will be tested with a disabled(skin) property, since both properties affects the skin. Although a _compact_ property, since it affects horizontal padding, will be tested with a size variation since both affects the layout.

### Content Variations

Content can affect how a components render, a button with an icon, a label containing an empty label are examples of tests that are necessary since content affects layout. Skins affects content, but contents should not affect skin.

### Groups

Group of button, due to their complexity, and for technical reasons, are treated as a separate test. We aim to test skin and layout, basically because 
