import { ButtonAsLink } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ButtonAsLink")
        .segment(segment)
        .build();
}

createButtonTestSuite(<ButtonAsLink variant="solid" />, stories("/solid"));

createButtonTestSuite(<ButtonAsLink variant="outline" />, stories("/outline"));

createButtonTestSuite(<ButtonAsLink variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <ButtonAsLink className="bg-red">Button</ButtonAsLink>
            <ButtonAsLink style={{ backgroundColor: "red" }}>Button</ButtonAsLink>
        </Inline>
    );
