import { isNil } from "lodash";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

const STORAGE_KEY = "@orbit-ui/storybook/props";

function getStoryId() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("id");

    if (!isNil(id)) {
        const separatorIndex = id.indexOf("--");

        if (separatorIndex > 0) {
            return id.substring(0, separatorIndex);
        }
    }

    return null;
}

function getStorageKey() {
    const storyId = getStoryId();

    if (!isNil(storyId)) {
        return `${STORAGE_KEY}/${storyId}-visibility`;
    }

    return "default";
}

export function useStorage(defaultValue) {
    const [value] = useLocalStorage(getStorageKey(), defaultValue);

    return [
        value,
        newValue => {
            writeStorage(getStorageKey(), newValue);
        }
    ];
}
