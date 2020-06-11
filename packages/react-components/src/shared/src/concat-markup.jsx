import { isNil } from "lodash";

export function concatMarkup(...values) {
    let markup;

    values.forEach(x => {
        if (!isNil(x)) {
            if (!isNil(markup)) {
                markup = <>{markup}{x}</>;
            } else {
                markup = x;
            }
        }
    });

    return markup;
}
