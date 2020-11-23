import { themes } from "./styles/themes";

/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import "@orbit-ui/fonts";
import "@orbit-ui/css-normalize";
import "@orbit-ui/foundation/dist/apricot.css";
import "@orbit-ui/tachyons/dist/apricot.css";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/react-components/dist/index.css";
/* eslint-enable sort-imports-es6-autofix/sort-imports-es6 */

import "./styles";

export const parameters = {
    actions: {
        argTypesRegex: "^on[A-Z].*"
    },
    docs: {
        theme: themes.docs
    }
};
