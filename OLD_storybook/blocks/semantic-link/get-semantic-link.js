const SEMANTIC_URL = "https://react.semantic-ui.com";

export function getSemanticUrl(path) {
    return `${SEMANTIC_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
