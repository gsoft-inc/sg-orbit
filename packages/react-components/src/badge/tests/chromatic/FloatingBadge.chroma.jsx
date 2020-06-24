import { Badge, FloatingBadge } from "@react-components/badge";
import { SIZE } from "@react-components/shared";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Badge/floating"))
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
    .add("dot", () =>
        <div className="flex flex-column">
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <BadgedRedSquare badge={<Badge dot size={SIZE.micro} />} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.mini} />} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.tiny} />} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.small} />} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.medium} />} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.large} />} />
            </div>
            <div className="flex items-end">
                <BadgedRedSquare badge={<Badge dot size={SIZE.small}>5</Badge>} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.medium}>5</Badge>} className="mr5" />
                <BadgedRedSquare badge={<Badge dot size={SIZE.large}>5</Badge>} />
            </div>
        </div>
    )
    .add("pill", () =>
        <div className="flex flex-column">
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <BadgedRedSquare badge={<Badge pill size={SIZE.small}>5</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge pill size={SIZE.medium}>5</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge pill size={SIZE.large}>5</Badge>} />
            </div>
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <BadgedRedSquare badge={<Badge pill size={SIZE.small}>100</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge pill size={SIZE.medium}>100</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge pill size={SIZE.large}>100</Badge>} />
            </div>
            <div className="flex items-end">
                <BadgedRedSquare badge={<Badge pill max={99} size={SIZE.small}>100</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge pill max={99} size={SIZE.medium}>100</Badge>} className="mr10" />
                <BadgedRedSquare badge={<Badge pill max={99} size={SIZE.large}>100</Badge>} />
            </div>
        </div>
    );
