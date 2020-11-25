import { TextLink } from "@react-components/link";
import { Transition } from "@react-components/transition";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useEventCallback } from "@react-components/shared";
import { useState } from "react";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Transition"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function FadingCollapse() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useEventCallback(() => {
        setIsOpen(x => !x);
    });

    return (
        <>
            <TextLink as="button" onClick={handleClick}>
                {isOpen ? "Hide" : "Show"} content
            </TextLink>
            <Transition
                show={isOpen}
                enter="o-ui-fade-in"
                leave="o-ui-fade-out"
            >
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Transition>
        </>
    );
}

stories()
    .add("fade on initial mount", () =>
        <Transition
            show
            enter="o-ui-fade-in"
        >
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Transition>
    )
    .add("fade on trigger", () =>
        <FadingCollapse />
    )
    .add("animate first render", () =>
        <Transition
            show
            animateFirstRender
            enter="o-ui-fade-in"
        >
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Transition>
    );
