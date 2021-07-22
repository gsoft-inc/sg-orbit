# Packages Update

## Bump NPM packages versions

To udpate our packages use a package called ![npm-check-updates](https://www.npmjs.com/package/npm-check-updates). Dont install it locally, use `npx`.

In a terminal, use the followings commands

- To list the available updates, type `npx npm-check-updates`
- If you want to proceed with the updates, your must first delete `yarn.lock`
- Then type `npx npm-check-updates -u` to bump the versions in the `package.json` file
- Install the new packages with `yarn update`

## PostCSS

We currently cannot upgrade to postcss 8 because `tachyons-build-css` has a dependency on `postcss-rtl` which doesn't works with postcss 8

```
@orbit-ui/tachyons: C:\Dev\gsoft\sg-orbit\node_modules\postcss-rtl\lib\keyframes.js:5
@orbit-ui/tachyons: const unprefixed = postcss.vendor.unprefixed;
@orbit-ui/tachyons:                                   ^
@orbit-ui/tachyons: TypeError: Cannot read property 'unprefixed' of undefined
@orbit-ui/tachyons:     at Object.<anonymous> (C:\Dev\gsoft\sg-orbit\node_modules\postcss-rtl\lib\keyframes.js:5:35)
```
