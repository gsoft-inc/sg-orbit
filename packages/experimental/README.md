# @orbit-ui/experimental-components

Full documentation available at: https://orbit.sharegate.design

## What differentiate an “experimental” component from a “stable” component?
Contrary to a “stable” component, an “experimental” component can:
- Not have a final stamp of approval from the design team.
- Not have all its variants or usecases defined.
- Not have a complete test coverage.
- Not have a final documentation.

By lowering expectations in regards to the design team approbation, testing coverage and documentation we believe an “experimental” component could go out about 60% to 65% faster than a “stable” component.

## What should an “experimental” component support from day 1?
An “experimental” component must:
- Leverage Orbit’s [shared utilities](https://github.com/gsoft-inc/sg-orbit/tree/master/packages/components/src/shared/src)
- Use Orbit’s [tokens](https://orbit.sharegate.design/?path=/docs/tokens--page), [color schemes](https://orbit.sharegate.design/?path=/docs/color-schemes--page) and [theming](https://orbit.sharegate.design/?path=/docs/theming--page)
- Implement Orbit’s [style props](https://orbit.sharegate.design/?path=/docs/style-props--page)
- Support Orbit’s [responsive styles](https://orbit.sharegate.design/?path=/docs/responsive-styles--page)
- Support Orbit’s [as function](https://orbit.sharegate.design/?path=/docs/as--page)
- Follow Orbit’s [components software design requirements](https://github.com/gsoft-inc/sg-orbit/tree/master/packages/components#design)
- Match Orbit’s [developers experience expectations](https://github.com/gsoft-inc/sg-orbit/tree/master/packages/components#developer-experience)
- Follow Orbit’s [naming conventions](https://github.com/gsoft-inc/sg-orbit/tree/master/packages/components#component-props-naming)

## Rules
As we do not want the package to me be misused nor cause harm to Orbit’s “stable” components we define rules which will guide our actions.

Those rules will have to be included in the “experimental” package documentation on Github.

- Changes to “stable” code should always be done in a distinct PR.
- Every “experimental” components should implement basic requirements.
- “Experimental” components shouldn’t be specific to an application.
- “Experimental” components must be released in a different package than the “stable” components.
- “Experimental” components code is isolated from “stable” code.
- “Experimental” components shouldn’t require new third party dependencies. If a component has a very good reason to install a new third party, it should be approved by the Collège de gouvernance FE first
- An “experimental” component doesn’t have to be accessible from the beginning but is expected to have a realistic path toward accessibility (the component will have to be WAI ARIA AA requirements before being promoted to a “stable” component). We encourage developers to build accessible components from the ground up when possible

## Adding a new “experimental” component

Refer to the "Adding a new component" section in the [components' package README](https://github.com/gsoft-inc/sg-orbit/tree/master/packages/components#add-a-new-component)

## Flagging an “experimental” component in the documentation

Make sure to add the following component in the Usage Section

```js
<ExperimentalMessage />
```
Some props are available to detail the component's status.

```js
<ExperimentalMessage noDoc noTests noVisualTesting noFinalDesign noMobileSupport />
```

## License

Copyright © 2023, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
