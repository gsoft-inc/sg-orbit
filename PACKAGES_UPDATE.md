# Packages Update

## Bump NPM packages versions

To udpate our packages use a package called ![npm-check-updates](https://www.npmjs.com/package/npm-check-updates). Dont install it locally, use `npx`.

In a terminal, use the followings commands

- To list the available updates, type `npx npm-check-updates`
- If you want to proceed with the updates, your must first delete `yarn.lock`
- Then type `npx npm-check-updates -u` to bump the versions in the `package.json` file
- Install the new packages with `yarn update`

## Meow

Cannot update `meow` to version 10.

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: C:\Dev\gsoft\sg-orbit\node_modules\meow\index.js
require() of ES modules is not supported.
require() of C:\Dev\gsoft\sg-orbit\node_modules\meow\index.js from C:\Dev\gsoft\sg-orbit\scripts\copy-root-license.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from C:\Dev\gsoft\sg-orbit\node_modules\meow\package.json.   

## PostCSS

We currently cannot upgrade to postcss 8 because `tachyons-build-css` has a dependency on `postcss-rtl` which doesn't works with postcss 8

```
@orbit-ui/tachyons: C:\Dev\gsoft\sg-orbit\node_modules\postcss-rtl\lib\keyframes.js:5
@orbit-ui/tachyons: const unprefixed = postcss.vendor.unprefixed;
@orbit-ui/tachyons:                                   ^
@orbit-ui/tachyons: TypeError: Cannot read property 'unprefixed' of undefined
@orbit-ui/tachyons:     at Object.<anonymous> (C:\Dev\gsoft\sg-orbit\node_modules\postcss-rtl\lib\keyframes.js:5:35)
```
