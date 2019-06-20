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

Specifying a "browsers" list to the "gulp-autoprefixer" plugin has been deprecated. The new preferred way is to provide them through the package.file or a .browserslistrc config file.

To remove the warning we have to remove the options provide to the "gulp-autoprefixer" plugin in the file /semantic/tasks/build/css.js

Before:

```js
  stream = gulp.src(source.definitions + '/**/' + globs.components + '.less')
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(replace(comments.variables.in, comments.variables.out))
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(replace(comments.large.in, comments.large.out))
    .pipe(replace(comments.small.in, comments.small.out))
    .pipe(replace(comments.tiny.in, comments.tiny.out))
    .pipe(flatten())
  ;
```

After:

```js
  stream = gulp.src(source.definitions + '/**/' + globs.components + '.less')
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer())
    .pipe(replace(comments.variables.in, comments.variables.out))
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(replace(comments.large.in, comments.large.out))
    .pipe(replace(comments.small.in, comments.small.out))
    .pipe(replace(comments.tiny.in, comments.tiny.out))
    .pipe(flatten())
  ;
```

It also must be replaced at some other place, do a find & replace.

## watch build

The watch build has been optimized to not recompiled the compressed version on a change. Changes has been made in the file /semantic/tasks/watch.js