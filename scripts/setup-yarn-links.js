const chalk = require("chalk");
const shell = require("shelljs");
const es = require("./ensure-success");

const PROJECTS_TO_LINK = [
    { name: "@orbit-ui/foundation", path: "packages/foundation" },
    { name: "@orbit-ui/css-normalize", path: "packages/css-normalize" },
    { name: "@orbit-ui/tachyons", path: "packages/tachyons" },
    { name: "@orbit-ui/semantic-ui-theme", path: "packages/semantic-ui-theme" },
    { name: "@orbit-ui/react-components", path: "packages/react-components" },
    { name: "@orbit-ui/fonts", path: "packages/fonts" },
    { name: "@orbit-ui/icons", path: "packages/icons" }
];

console.log(chalk.bold("Creating yarn links for..."));

const projectPath = es(shell.pwd()).stdout;

es(shell.cd(".."));
const rootPath = es(shell.pwd()).stdout;

console.log(chalk.bold(`   project: ${projectPath}`));
console.log(chalk.bold(`   root: ${rootPath}`));

PROJECTS_TO_LINK.forEach((project, index) => {
    shell.cd(project.path);

    const current = `[${index + 1}/${PROJECTS_TO_LINK.length * 2}]`;

    shell.exec("yarn unlink", { silent: true });
    es(shell.exec("yarn link", { silent: true }), `${current} Failed to create yarn link for project "${project.name}".`);
    es(shell.cd(rootPath));

    console.log(`${current} Created yarn link for project "${project.name}"...`);
});

es(shell.cd(projectPath));

PROJECTS_TO_LINK.forEach((project, index) => {
    const current = `[${PROJECTS_TO_LINK.length + index + 1}/${PROJECTS_TO_LINK.length * 2}]`;

    shell.exec(`yarn unlink ${project.name}`, { silent: true });
    es(shell.exec(`yarn link ${project.name}`, { silent: true }), `${current} Failed to link project "${project.name}".`);

    console.log(`${current} Linked project "${project.name}"...`);
});

console.log(chalk.green("success"), " website project links created.");
