## semantic.json

Semantic UI "`require-dot-file` packages goal is to find the `semantic.json` configuration file.

The way it works is that it will start with the current directory and search up (parent directory) until it finds the file.

Since we have a mono repo setup the current directory is `C:\Dev\20_gsoft\sg-orbit\node_modules` which doesn't work for us the `semantic.json` is not found and the path structure is not working which results in gulp scripts not findind any files.

Here the full directory that the package walk up:

C:\Dev\20_gsoft\sg-orbit\node_modules
C:\Dev\20_gsoft\sg-orbit
C:\Dev\20_gsoft
C:\Dev
C:\

To fix this, we can provide a `startPath` to the `require-dot-file` package.

The modification has been made in the file `/semantic/config/user.js`.

Before:

```js
userConfig = requireDotFile('semantic.json');
```

After:

```js
  const startPath = path.resolve(path.join(process.cwd(), path.sep, '..'));

  userConfig = requireDotFile('semantic.json', startPath);
```

## browserslist

The default browserslist overrided in `/semantic/tasks/config/tasks.js` has been commented to use the .browserlistrc config file.

## buildCss

By default, the CSS build with not stop and return an error if a module failed to compuile. The current behavior is that the CSS output file will be ignored for that module.

This is annoying for a lot of reasons, mostly because our CI doesn't fail on compilation errors.

To fix this, a `failOnError` parameter has been added to the functions `build` & `buildCss` of the file `/semantic/tasks/build/css.js`.

The default value is true. This means that for a build, it will fail on error. The watch function provide `false` for `failOnError` to continue on error.

## Compressed

The compressed compilation has been removed for the CSS and the JS.
