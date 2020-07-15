import styles from "./Popper.chroma.module.css";

import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef, useLayoutEffect, useState } from "react";
import { isNil } from "lodash";
import { useAutoControlledState } from "@react-components/shared";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .canvasLayout({ width: "30%", height: "600px", marginTop: "100px" })
                .chromaticDelay(100)
                .chromaticPauseAnimationAtEnd()
                .build()
        )
        .build();
}

const RedBox = forwardRef((props, ref) => {
    return (
        <div
            {...props}
            className="w12 h12 bg-red"
            tabIndex="0"
            ref={ref}
        >
        </div>
    );
});

const RedBoxPopper = forwardRef(({ show, defaultShow, ...rest }, ref) => {
    const [triggerElement, setTriggerElement] = useState();
    const [isVisible, setIsVisible] = useAutoControlledState(show, defaultShow, false);

    return (
        <>
            <Button
                fluid
                onClick={() => setIsVisible(!isVisible)}
                ref={setTriggerElement}
            >
                Open
            </Button>
            <If condition={!isNil(triggerElement)}>
                <Popper
                    show={isVisible}
                    triggerElement={triggerElement}
                    ref={ref}
                    {...rest}
                >
                    <RedBox />
                </Popper>
            </If>
        </>
    );
});

function BoundedRedBoxPopper({
    scrollTop = 0,
    setPreventOverflowBoundaryElement,
    setFlipBoundaryElement,
    ...rest }
) {
    const [boundaryElement, setBoundaryElement] = useState();

    const createModifier = name => {
        return {
            name,
            options: {
                boundary: boundaryElement
            }
        };
    };

    useLayoutEffect(() => {
        if (!isNil(boundaryElement)) {
            boundaryElement.scrollTop = scrollTop;
        }
    }, [boundaryElement, scrollTop]);

    const createModifiers = () => {
        const modifiers = [];

        if (setPreventOverflowBoundaryElement) {
            modifiers.push(createModifier("preventOverflow"));
        }

        if (setFlipBoundaryElement) {
            modifiers.push(createModifier("flip"));
        }

        return modifiers;
    };

    return (
        <div className={styles.boundary} ref={setBoundaryElement}>
            <RedBoxPopper
                show
                popperModifiers={createModifiers()}
                {...rest}
            />
        </div>
    );
}

stories()
    .add("default", () =>
        <RedBoxPopper />
    )
    .add("show", () =>
        <RedBoxPopper show />
    )
    .add("default show", () =>
        <RedBoxPopper defaultShow />
    )
    .add("position auto", () =>
        <RedBoxPopper
            show
            position="auto"
        />
    )
    .add("position auto-start", () =>
        <RedBoxPopper
            show
            position="auto-start"
        />
    )
    .add("position auto-end", () =>
        <RedBoxPopper
            show
            position="auto-end"
        />
    )
    .add("position top", () =>
        <RedBoxPopper
            show
            position="top"
            pinned
        />
    )
    .add("position top-start", () =>
        <RedBoxPopper
            show
            position="top-start"
            pinned
        />
    )
    .add("position top-end", () =>
        <RedBoxPopper
            show
            position="top-end"
            pinned
        />
    )
    .add("position bottom", () =>
        <RedBoxPopper
            show
            position="bottom"
            pinned
        />
    )
    .add("position bottom-end", () =>
        <RedBoxPopper
            show
            position="bottom-end"
            pinned
        />
    )
    .add("position bottom-start", () =>
        <RedBoxPopper
            show
            position="bottom-start"
            pinned
        />
    )
    .add("position right", () =>
        <RedBoxPopper
            show
            position="right"
            pinned
        />
    )
    .add("position right", () =>
        <RedBoxPopper
            show
            position="right"
            pinned
        />
    )
    .add("position right-start", () =>
        <RedBoxPopper
            show
            position="right-start"
            pinned
        />
    )
    .add("position right-end", () =>
        <RedBoxPopper
            show
            position="right-end"
            pinned
        />
    )
    .add("position left", () =>
        <RedBoxPopper
            show
            position="left"
            pinned
        />
    )
    .add("position left-start", () =>
        <RedBoxPopper
            show
            position="left-start"
            pinned
        />
    )
    .add("position left-end", () =>
        <RedBoxPopper
            show
            position="left-end"
            pinned
        />
    )
    .add("fixed positioning", () =>
        <RedBoxPopper
            show
            popperOptions={{ strategy: "fixed" }}
        />
    )
    .add("no portal", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper noPortal />
            </div>
            <div>
                <RedBoxPopper
                    show
                    noPortal
                />
            </div>
        </div>
    )
    .add("custom portal container element", () =>
        <RedBoxPopper
            show
            portalContainerElement={window.document.getElementById("root")}
        />
    )
    .add("no wrap", () =>
        <RedBoxPopper
            show
            noWrap
        />
    )
    .add("no animation", () =>
        <RedBoxPopper
            show
            animate={false}
        />
    )
    .add("styling", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper
                    show
                    className="border-blue"
                />
            </div>
            <div>
                <RedBoxPopper
                    show
                    style={{ border: "1px solid blue" }}
                />
            </div>
        </div>
    )
    .add("can prevent overflow when not pinned", () =>
        <BoundedRedBoxPopper
            position="right"
            noPortal
            scrollTop={100}
            setPreventOverflowBoundaryElement
        />,
         paramsBuilder()
             .canvasLayout({ width: "40%" })
             .build()
    )
    .add("do not prevent overflow when pinned", () =>
        <BoundedRedBoxPopper
            position="right"
            noPortal
            scrollTop={100}
            pinned
        />,
         paramsBuilder()
             .canvasLayout({ width: "40%" })
             .build()
    )
    .add("can flip", () =>
        <BoundedRedBoxPopper
            position="top"
            noPortal
            scrollTop={100}
            setFlipBoundaryElement
        />
    )
    .add("do not flip when pinned", () =>
        <BoundedRedBoxPopper
            position="top"
            noPortal
            scrollTop={100}
            pinned
        />
    );

stories("/offsets/bottom")
    .add("left+positive", () =>
        <RedBoxPopper
            position="bottom-end"
            offset={[30, 30]}
            show
        />
    )
    .add("left+negative", () =>
        <RedBoxPopper
            position="bottom-end"
            offset={[-30, -30]}
            show
        />
    )
    .add("right+positive", () =>
        <RedBoxPopper
            position="bottom-start"
            offset={[30, 30]}
            show
        />
    )
    .add("right+negative", () =>
        <RedBoxPopper
            position="bottom-start"
            offset={[-30, -30]}
            show
        />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <RedBoxPopper
            position="top-end"
            offset={[30, 30]}
            show
        />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("left+negative", () =>
        <RedBoxPopper
            position="top-end"
            offset={[-30, -30]}
            show
        />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+positive", () =>
        <RedBoxPopper
            position="top-start"
            offset={[30, 30]}
            show
        />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+negative", () =>
        <RedBoxPopper
            position="top-start"
            offset={[-30, -30]}
            show
        />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    );

