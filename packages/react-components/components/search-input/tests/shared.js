export const RESULT_ID = "search-input-result";
export const TEXTBOX_ID = "search-input-textbox";
export const CLEAR_BUTTON_ID = "search-input-clear-button";

export async function getTextbox(getByTestId) {
    const textboxNode = await getByTestId(TEXTBOX_ID);

    return textboxNode.querySelector("input");
}

export function getResultsMenu(container) {
    return container.querySelector("div.results.visible");
}
