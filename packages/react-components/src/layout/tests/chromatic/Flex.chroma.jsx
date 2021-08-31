import { Flex } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Flex")
        .segment(segment)
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
            <div className="w12">
                <Flex gap={0} fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="h10">
                <Flex direction="row" reverse fluid>
                    <div className="bg-cloud-6">Alpha</div>
                    <div className="bg-cloud-6">Bravo</div>
                    <div className="bg-cloud-6">Charlie</div>
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
            <div className="w12">
                <Flex direction="column" gap={0} fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            </div>
            <div className="w12 mr8">
                <Flex direction="column" reverse fluid>
                    <div className="bg-cloud-6">Alpha</div>
                    <div className="bg-cloud-6">Bravo</div>
                    <div className="bg-cloud-6">Charlie</div>
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
                    "sunray-1", "sunray-2", "sunray-3", "sunray-4", "sunray-5", "sunray-6", "sunray-7", "sunray-8", "sunray-9", "sunray-10",
                    "moonstone-1", "moonstone-2", "moonstone-3", "moonstone-4", "moonstone-5", "moonstone-6", "moonstone-7", "moonstone-8", "moonstone-9", "moonstone-10"
                ]
                    .map((x, index) =>
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: `var(--o-ui-global-${x})`
                            }}
                            key={index}
                        />
                    )
            }
        </Flex>
    )
    .add("fluid", () =>
        <Flex direction="column" gap={5}>
            <Flex fluid>
                <div className="bg-primary-500 w-100">Alpha</div>
            </Flex>
            <Flex direction="column" fluid>
                <div className="bg-primary-500 h12">Alpha</div>
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
