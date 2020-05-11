import styles from "./boundary.module.css";

import { Children, cloneElement, useState } from "react";

export function Boundary({ children }) {
    const [boundaryElement, setBoundaryElement] = useState();

    const popper = cloneElement(Children.only(children), {
        popperModifiers: [
            {
                name: "preventOverflow",
                options: {
                    boundary: boundaryElement
                }
            },
            {
                name: "flip",
                options: {
                    boundary: boundaryElement
                }
            }
        ]
    });

    return (
        <div className={styles.boundary} ref={setBoundaryElement}>
            {popper}
        </div>
    );
}
