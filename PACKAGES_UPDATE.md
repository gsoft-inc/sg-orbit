# Packages Update

We currently cannot update babel package to version *> 7.13*. When doing so Storybook throw transpilation errors at compile time.

Exemple:

```
Module parse failed: Unexpected token (112:31)
File was processed with these loaders:
 * ../node_modules/babel-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
|       children: [/*#__PURE__*/_jsxDEV(Button, { ...rest,
|         ...triggerProps,
>         children: selectedItem?.content ?? placeholder
|       }, void 0, false, {
|         fileName: _jsxFileName,
 @ \.)(?=.)[^\\/]*?\.chroma\.jsx)$ (../packages/react-components/src sync ^\.(?:(?:^|[\\/]|(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/])tests[\\/]chromatic(?:[\\/](?!\.)(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/]|[\\/]|$)(?!\.)(?=.)[^\\/]*?\.chroma\.jsx)$) ./select/tests/chromatic/Select.chroma.jsx
 @ ./generated-stories-entry.js
 @ multi ../node_modules/@storybook/core/dist/server/common/polyfills.js ../node_modules/@storybook/core/dist/server/preview/globals.js ./storybook-init-framework-entry.js ../node_modules/@storybook/addon-docs/dist/frameworks/common/config.js-generated-other-entry.js ../node_modules/@storybook/addon-docs/dist/frameworks/react/config.js-generated-other-entry.js ./preview.js-generated-config-entry.js ./generated-stories-entry.js ../node_modules/webpack-hot-middleware/client.js?reload=true&quiet=false&noInfo=undefined

ERROR in ../packages/react-components/src/select/src/useSelect.js 118:31
Module parse failed: Unexpected token (118:31)
File was processed with these loaders:
 * ../node_modules/babel-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
|     "end-icon": endIcon,
|     stringValue
>   } = useRawSlots(selectedItem?.content, ["icon", "avatar", "text", "end-icon"]);
|   const triggerId = useId(id, id ? null : "o-ui-select-trigger");
|   return {
 @ ../packages/react-components/src/select/src/index.js 3:0-28 3:0-28
 @ ../packages/react-components/src/select/index.js
 @ ../packages/react-components/src/index.js
 @ ./components/preview/scopes.js
 @ ./components/preview/Preview.jsx
 @ ./components/preview/index.js
 @ ./components/index.js
 @ ../packages/icons/docs/icons.stories.mdx
 @ ../packages/icons/docs sync ^\.(?:(?:^|[\\/]|(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/])(?!\.)(?=.)[^\\/]*?\.stories\.mdx)$
```
