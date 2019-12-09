import { isNil } from "lodash";
import { useSessionStorage } from "../../../utils/use-storage";

const STORAGE_KEY = "SB_PROPS_TAB_VISIBILITY";

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
        return `${STORAGE_KEY}-${storyId}`;
    }

    return "default";
}

export function useStorage(defaultValue) {
    const [value, setValue] = useSessionStorage(getStorageKey(), defaultValue);

    return [
        value,
        setValue
    ];
}
