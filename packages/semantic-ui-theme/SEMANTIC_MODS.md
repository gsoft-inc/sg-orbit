## semantic.json

Semantic UI "require-dot-file" packages goal is to find the "semantic.json" configuration file.

The way it works is that it will start with the current directory and search up (parent directory) until it finds the file.

Since we have a mono repo setup the current directory is "C:\Dev\20_gsoft\sg-brand\node_modules" which doesn't work for us the "semantic.json" is not found and the path structure is not working which results in gulp scripts not findind any files.

Here the full directory that the package walk up:

C:\Dev\20_gsoft\sg-brand\node_modules
C:\Dev\20_gsoft\sg-brand
C:\Dev\20_gsoft
C:\Dev
C:\

To fix this, we can provide a "startPath" to the "require-dot-file" package.

The modification has been made in the file /semantic/config/user.js.

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

The default browserslist overrided in /semantic/tasks/config/tasks.js has been commented to use the .browserlistrc config file
