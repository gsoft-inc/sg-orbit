import styles from "./PinnedPlayground.module.css";

import { AutoControlledPopper, Popper } from "@react-components/popper";
import { Button } from "@react-components/button";
import { Toggle } from "@react-components/toggle";
import { useState } from "react";

export function PinnedPlayground() {
    const [isPinned, setIsPinned] = useState(true);
    const [boundaryElement, setBoundaryElement] = useState();

    const popperModifiers = [
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
    ];

    return (
        <>
            <div className={styles.popperBoundary} ref={setBoundaryElement}>
                <AutoControlledPopper trigger={<Button>Toggle</Button>}>
                    <Popper
                        pinned={isPinned}
                        position="top"
                        noPortal
                        popperModifiers={popperModifiers}
                    >
                        <div className="bg-primary-300 white pa2">A comet is an icy, small Solar System body.</div>
                    </Popper>
                </AutoControlledPopper>
            </div>
            <div className="mt4">
                <Toggle label="Pinned" checked={isPinned} onChange={() => { setIsPinned(!isPinned); }} />
            </div>
        </>
    );
}
