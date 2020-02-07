const GITHUB_REPOSITORY_URL = "https://github.com/gsoft-inc/sg-orbit/tree/master";

export function getGithubUrl(path) {
    const relativePath = path.startsWith("/") ? path : `/${path}`;

    return `${GITHUB_REPOSITORY_URL}${relativePath}`;
}
