// TODO: Copy assertion function from Chakra and replace lodash: https://github.com/chakra-ui/chakra-ui/blob/develop/packages/utils/src/assertion.ts
// Might want to create an "assertions" folder and have one per file.

import { isNil } from "lodash";

export function isNilOrEmpty(value) {
    return isNil(value) || value === "";
}
