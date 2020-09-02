import { IconGroup, SignoutIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Button({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createButtonTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <Button size="small" element={element}>Button</Button>
                    <Button element={element}>Button</Button>
                    <Button size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button loading size="small" element={element}>Button</Button>
                    <Button loading element={element}>Button</Button>
                    <Button loading size="large" element={element}>Button</Button>
                </Inline>
                <div>
                    <Button fluid element={element}>Button</Button>
                </div>
                <div className="w-10">
                    <Button fluid element={element}>Button</Button>
                </div>
                <div>
                    <Button loading fluid element={element}>Button</Button>
                </div>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline align="end">
                    <Button size="small" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button size="large" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Inline align="end">
                    <Button size="small" element={element}>
                        <IconGroup>
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconGroup>
                        <Text>Button</Text>
                    </Button>
                    <Button element={element}>
                        <IconGroup>
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconGroup>
                        <Text>Button</Text>
                    </Button>
                    <Button size="large" element={element}>
                        <IconGroup>
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconGroup>
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Inline align="end">
                    <Button loading size="small" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading size="large" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <div>
                    <Button disabled element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </div>
                <div>
                    <Button fluid element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </div>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline align="end">
                    <Button color="primary" size="small" element={element}>Button</Button>
                    <Button color="primary" element={element}>Button</Button>
                    <Button color="primary" size="large" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button color="primary" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading color="primary" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline align="end">
                    <Button color="secondary" size="small" element={element}>Button</Button>
                    <Button color="secondary" element={element}>Button</Button>
                    <Button color="secondary" size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button color="secondary" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading color="secondary" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline align="end">
                    <Button color="danger" size="small" element={element}>Button</Button>
                    <Button color="danger" element={element}>Button</Button>
                    <Button color="danger" size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button color="danger" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading color="danger" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline align="end">
                    <Button shape="circular" size="small" element={element}>Aa</Button>
                    <Button shape="circular" element={element}>Aa</Button>
                    <Button shape="circular" size="large" element={element}>Aa</Button>
                </Inline>
                <Inline align="end">
                    <Button loading shape="circular" size="small" element={element}>Aa</Button>
                    <Button loading shape="circular" element={element}>Aa</Button>
                    <Button loading shape="circular" size="large" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline align="end">
                    <Button shape="rounded" size="small" element={element}>Aa</Button>
                    <Button shape="rounded" element={element}>Aa</Button>
                    <Button shape="rounded" size="large" element={element}>Aa</Button>
                </Inline>
                <Inline align="end">
                    <Button loading shape="rounded" size="small" element={element}>Aa</Button>
                    <Button loading shape="rounded" element={element}>Aa</Button>
                    <Button loading shape="rounded" size="large" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Button active size="small" element={element}>Button</Button>
                    <Button active element={element}>Button</Button>
                    <Button active size="large" element={element}>Button</Button>
                    <Button loading active element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button focus size="small" element={element}>Button</Button>
                    <Button focus element={element}>Button</Button>
                    <Button focus size="large" element={element}>Button</Button>
                    <Button loading focus element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button hover size="small" element={element}>Button</Button>
                    <Button hover element={element}>Button</Button>
                    <Button hover size="large" element={element}>Button</Button>
                    <Button loading hover element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button focus hover size="small" element={element}>Button</Button>
                    <Button focus hover element={element}>Button</Button>
                    <Button focus hover size="large" element={element}>Button</Button>
                    <Button loading focus hover element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button disabled size="small" element={element}>Button</Button>
                    <Button disabled element={element}>Button</Button>
                    <Button disabled size="large" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("as anchor", () =>
            <Button as="a" href="https://www.sharegate.com" target="_blank" element={element}>Button</Button>
        );
}
