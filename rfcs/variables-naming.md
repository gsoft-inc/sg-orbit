# Orbit Variables naming convention

## Summary

With the profusion of variables in Orbit source code, there was a need to better identify and classify variables.

## Motivation

With theming at our door, some variables are modified according to Orbit's theme, e.g. a primary text will be lighter on a dark background(`marine-500`) that on a ligth background(`marine-900`). We needed semantic colors, semantic borders, etc. Variables containing `-alias` in their name are directly affected by themes and are using global variables(see them as constant) who will not change based on the app theme.

In some instances variables are tied to a particular component e.g. `--o-ui-input-border-radius` these need to be prefixed with the component's name. These variable are exposed at the theme level since a sub component can consume it (e.g. NumberInput).

In some instances a global variable will refer to an alias, this it alrigh as long as the global is not directly affected by a theme change.
