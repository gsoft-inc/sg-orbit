import { isNil } from "lodash";
import { useState } from "react";

export function FileSource({ filePath }) {
    const [source, setSource] = useState(null);

    if (isNil(source)) {
        console.log(filePath);

        import(/* webpackMode: "eager" */ filePath)
            .then(module => {
                setSource(module.default);
            });

        return null;
    }

    return source;
}
