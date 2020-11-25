import { Flex } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Flex"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("row", () =>
        <div className="flex flex-column">
            <div className="h10">
                <Flex fluid>
                    <div className="bg-primary-500">Alpha</div>
                    <div className="bg-primary-500">Bravo</div>
                    <div className="bg-primary-500">Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex alignContent="end" justifyContent="end" wrap="wrap" fluid>
                    <div>Alpha<br /> Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex alignContent="center" justifyContent="center" wrap="wrap" fluid>
                    <div>Alpha<br /> Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex alignItems="end" justifyContent="end" wrap="wrap" fluid>
                    <div>Alpha<br /> Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex alignItems="center" justifyContent="center" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex gap={10} fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex gap="200px" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex direction="row" reverse fluid>
                    <div className="bg-cloud-500">Alpha</div>
                    <div className="bg-cloud-500">Bravo</div>
                    <div className="bg-cloud-500">Charlie</div>
                </Flex>
            </div>
        </div>
    )
    .add("column", () =>
        <div className="flex" style={{ height: "300px" }}>
            <div className="w12 mr8">
                <Flex direction="column" fluid>
                    <div className="bg-primary-500">Alpha</div>
                    <div className="bg-primary-500">Bravo</div>
                    <div className="bg-primary-500">Charlie</div>
                </Flex>
            </div>
            <div className="w12 mr8">
                <Flex direction="column" alignContent="end" justifyContent="end" wrap="wrap" fluid>
                    <div>Alpha<br />Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12 mr8">
                <Flex direction="column" alignContent="center" justifyContent="center" wrap="wrap" fluid>
                    <div>Alpha<br />Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12 mr8">
                <Flex direction="column" alignItems="end" justifyContent="end" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12 mr8">
                <Flex direction="column" alignItems="center" justifyContent="center" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12">
                <Flex direction="column" gap={10} fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12">
                <Flex direction="column" gap="200px" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12 mr8">
                <Flex direction="column" reverse fluid>
                    <div className="bg-cloud-500">Alpha</div>
                    <div className="bg-cloud-500">Bravo</div>
                    <div className="bg-cloud-500">Charlie</div>
                </Flex>
            </div>
        </div>
    )
    .add("nested", () =>
        <Flex direction="column" gap={12}>
            <Flex gap={5}>
                {[1, 2, 3].map((x, index) =>
                    <div
                        className="pa8 tc bg-primary-500"
                        key={index}
                    >
                        {x}
                    </div>
                )}
            </Flex>
            <Flex gap={1}>
                {[1, 2, 3].map((x, index) =>
                    <div
                        className="pa8 tc bg-primary-500"
                        key={index}
                    >
                        {x}
                    </div>
                )}
            </Flex>
        </Flex>
    )
    .add("wrap", () =>
        <Flex
            wrap="wrap"
            gap="10px"
            style={{
                width: "300px"
            }}
        >
            {
                [
                    "sunray-50", "sunray-100", "sunray-200", "sunray-300", "sunray-400", "sunray-500", "sunray-600", "sunray-700", "sunray-800", "sunray-900",
                    "moonstone-50", "moonstone-100", "moonstone-200", "moonstone-300", "moonstone-400", "moonstone-500", "moonstone-600", "moonstone-700", "moonstone-800", "moonstone-900"
                ]
                    .map((x, index) =>
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: `var(--${x})`
                            }}
                            key={index}
                        />
                    )
            }
        </Flex>
    )
    .add("wrap children", () =>
        <div className="h10">
            <Flex wrapChildren gap={1} fluid>
                <div className="bg-primary-500 h10">Alpha</div>
                <div className="bg-primary-500">Bravo</div>
                <div className="bg-primary-500">Charlie</div>
            </Flex>
        </div>
    )
    .add("no-gap", () =>
        <Flex gap={1} direction="column">
            <Flex gap={1} noGap>
                <div>Alpha</div>
                <div>Bravo</div>
                <div>Charlie</div>
            </Flex>
            <Flex gap={1} noGap direction="column">
                <div>Alpha</div>
                <div>Bravo</div>
                <div>Charlie</div>
            </Flex>
        </Flex>
    )
    .add("inline", () =>
        <Flex inline direction="column" alignItems="end">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Flex>
    );
