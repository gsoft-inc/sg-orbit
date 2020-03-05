const SEMANTIC_URL = "https://react.semantic-ui.com";

export function getSemanticUrl(path) {
    const relativePath = path.startsWith("/") ? path : `/${path}`;

    return `${SEMANTIC_URL}${relativePath}`;
}
