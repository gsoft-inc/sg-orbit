import { ButtonAsLink } from "@components/button";
import { Inline } from "@components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ButtonAsLink")
        .segment(segment)
        .build();
}

createButtonTestSuite(<ButtonAsLink color="primary" />, stories("/primary"));

createButtonTestSuite(<ButtonAsLink color="secondary" />, stories("/secondary"));

createButtonTestSuite(<ButtonAsLink color="tertiary" />, stories("/tertiary"));

createButtonTestSuite(<ButtonAsLink color="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <ButtonAsLink border="warning-7" color="secondary">Button</ButtonAsLink>
            <ButtonAsLink className="bg-red" color="secondary">Button</ButtonAsLink>
            <ButtonAsLink style={{ backgroundColor: "red" }} color="secondary">Button</ButtonAsLink>
        </Inline>
    );
