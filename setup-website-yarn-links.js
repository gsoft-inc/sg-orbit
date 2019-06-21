const chalk = require("chalk");
const shell = require("shelljs");

function run(command, errorMessage) {
    const result = command();

    if (result.code !== 0) {
        if (errorMessage) {
            console.error(chalk.red("error"), ` ${errorMessage}`);
        }

        if (result.stderr && result.stderr !== "") {
            console.error(chalk.red("error"), ` ${result.stderr}`);
        }

        shell.exit(1);
    }

    return result;
}

////////////////////////////////////////////////////////

const PROJECTS_TO_LINK = [
    { name: "@sharegate/foundation", path: "packages/foundation" },
    { name: "@sharegate/tachyons", path: "packages/tachyons" },
    { name: "@sharegate/semantic-ui-theme", path: "packages/semantic-ui-theme" },
    { name: "@sharegate/react-components", path: "packages/react-components" },
]

console.log(chalk.bold("Creating yarn links for website project..."));

const home = run(() => shell.pwd()).stdout;

PROJECTS_TO_LINK.forEach((project, index) => {
    shell.cd(project.path);

    const current = `[${index + 1}/${PROJECTS_TO_LINK.length * 2}]`;
    const result = run(() => shell.exec("yarn link", { silent: true }), `${current} Failed to create yarn link for project "${project.name}".`);

    run(() => shell.cd(home));

    console.log(`${current} Created yarn link for project "${project.name}"...`);
});

run(() => shell.cd("website"));

PROJECTS_TO_LINK.forEach((project, index) => {
    const current = `[${PROJECTS_TO_LINK.length + 1}/${PROJECTS_TO_LINK.length * 2}]`;
    const result = run(() => shell.exec(`yarn link ${project.name}`, { silent: true }), `${current} Failed to link project "${project.name}".`);

    run(() => shell.cd(home));
    
    console.log(`${current} Linked project "${project.name}"...`);
});

console.log(chalk.green("success"), " website project links created.");