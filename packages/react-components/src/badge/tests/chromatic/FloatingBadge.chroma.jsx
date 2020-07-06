import { Badge, FloatingBadge } from "@react-components/badge";
import { CheckIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("FloatingBadge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

function BadgedRedSquare({ badge, ...rest }) {
    return (
        <FloatingBadge
            {...rest}
            badge={badge}
        >
            <div className="bg-red" style={{ width: "35px", height: "35px" }}></div>
        </FloatingBadge>
    );
}

stories()
    .add("pill", () =>
        <div className="flex flex-column">
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <BadgedRedSquare badge={<Badge size="small">5</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge size="medium">5</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge size="large">5</Badge>} />
            </div>
            <div className="flex items-end">
                <BadgedRedSquare badge={<Badge size="small">100</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge size="medium">100</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge size="large">100</Badge>} />
            </div>
        </div>
    )
    .add("dot", () =>
        <div className="flex items-end" style={{ marginBottom: "50px" }}>
            <BadgedRedSquare badge={<Badge variant="dot" size="micro" />} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="dot" size="mini" />} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="dot" size="tiny" />} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="dot" size="small" />} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="dot" size="medium" />} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="dot" size="large" />} />
        </div>
    )
    .add("icon", () =>
        <div className="flex items-end">
            <BadgedRedSquare badge={<Badge variant="icon" size="micro"><CheckIcon /></Badge>} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="icon" size="mini"><CheckIcon /></Badge>} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="icon" size="tiny"><CheckIcon /></Badge>} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="icon" size="small"><CheckIcon /></Badge>} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="icon" size="medium"><CheckIcon /></Badge>} className="mr5" />
            <BadgedRedSquare badge={<Badge variant="icon" size="large"><CheckIcon /></Badge>} />
        </div>
    );
