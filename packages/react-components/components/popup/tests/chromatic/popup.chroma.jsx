import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-popup/src";
import { RedBoxPopup } from "@react-components/popup/stories/popup/components";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popup"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .build()
        )
        .build();
}

stories()
    .add("close", () =>
        <RedBoxPopup closeOnBlur={false} />
    )
    .add("open", () =>
        <RedBoxPopup defaultOpen closeOnBlur={false} />
    )
    .add("bottom left", () =>
        <RedBoxPopup position={BOTTOM_LEFT} defaultOpen closeOnBlur={false} />
    )
    .add("bottom center", () =>
        <RedBoxPopup position={BOTTOM_CENTER} defaultOpen closeOnBlur={false} />
    )
    .add("bottom right", () =>
        <RedBoxPopup position={BOTTOM_RIGHT} defaultOpen closeOnBlur={false} />
    )
    .add("top left", () =>
        <RedBoxPopup position={TOP_LEFT} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("top center", () =>
        <RedBoxPopup position={TOP_CENTER} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("top right", () =>
        <RedBoxPopup position={TOP_RIGHT} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    );

stories("/offsets/bottom")
    .add("left+positive", () =>
        <RedBoxPopup position={BOTTOM_LEFT} offsets={["30px", "30px"]} defaultOpen closeOnBlur={false} />
    )
    .add("left+negative", () =>
        <RedBoxPopup position={BOTTOM_LEFT} offsets={["-30px", "-30px"]} defaultOpen closeOnBlur={false} />
    )
    .add("right+positive", () =>
        <RedBoxPopup position={BOTTOM_RIGHT} offsets={["30px", "30px"]} defaultOpen closeOnBlur={false} />
    )
    .add("right+negative", () =>
        <RedBoxPopup position={BOTTOM_RIGHT} offsets={["-30px", "-30px"]} defaultOpen closeOnBlur={false} />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <RedBoxPopup position={TOP_LEFT} offsets={["30px", "30px"]} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("left+negative", () =>
        <RedBoxPopup position={TOP_LEFT} offsets={["-30px", "-30px"]} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+positive", () =>
        <RedBoxPopup position={TOP_RIGHT} offsets={["30px", "30px"]} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+negative", () =>
        <RedBoxPopup position={TOP_RIGHT} offsets={["-30px", "-30px"]} defaultOpen closeOnBlur={false} />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    );

stories()
    .add("styling", () =>
        <div className="flex">
            <RedBoxPopup className="border-red mr5" closeOnBlur={false} />
            <RedBoxPopup style={{ border: "1px solid red" }} closeOnBlur={false} />
        </div>
    );


