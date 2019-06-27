// const args = process.argv;

// args.forEach(x => {
//     console.log(x, "\n");
// });

const es = require("./ensure-success");

const shell = require("shelljs");

const result = es(shell.exec("npm whoami --registry https://registry.npmjs.org")).stdout;

// console.log(result);

// shell.exec("lerna publish from-package --exact --loglevel verbose", { shell: true, stdio: 'inherit' });