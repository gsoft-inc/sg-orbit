import { IconList, SignoutIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Button({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>Button</Button>
                    <Button element={element}>Button</Button>
                    <Button size="lg" element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading size="sm" element={element}>Button</Button>
                    <Button loading element={element}>Button</Button>
                    <Button loading size="lg" element={element}>Button</Button>
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
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button size="lg" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>
                        <IconList>
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconList>
                        <Text>Button</Text>
                    </Button>
                    <Button element={element}>
                        <IconList>
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconList>
                        <Text>Button</Text>
                    </Button>
                    <Button size="lg" element={element}>
                        <IconList>
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconList>
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading size="sm" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading size="lg" element={element}>
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
                <Inline verticalAlign="end">
                    <Button color="primary" size="sm" element={element}>Button</Button>
                    <Button color="primary" element={element}>Button</Button>
                    <Button color="primary" size="lg" element={element}>Button</Button>
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
                <Inline verticalAlign="end">
                    <Button color="secondary" size="sm" element={element}>Button</Button>
                    <Button color="secondary" element={element}>Button</Button>
                    <Button color="secondary" size="lg" element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
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
                <Inline verticalAlign="end">
                    <Button color="danger" size="sm" element={element}>Button</Button>
                    <Button color="danger" element={element}>Button</Button>
                    <Button color="danger" size="lg" element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button color="danger" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading color="danger" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("inherit", () =>
            <Stack>
                <Inline verticalAlign="end" className="bg-sunray-50 sunray-900">
                    <Button color="inherit" size="sm" element={element}>Button</Button>
                    <Button color="inherit" element={element}>Button</Button>
                    <Button color="inherit" size="lg" element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end" className="bg-sunray-50 sunray-900">
                    <Button color="inherit" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading color="inherit" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button shape="circular" size="sm" element={element}>Aa</Button>
                    <Button shape="circular" element={element}>Aa</Button>
                    <Button shape="circular" size="lg" element={element}>Aa</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading shape="circular" size="sm" element={element}>Aa</Button>
                    <Button loading shape="circular" element={element}>Aa</Button>
                    <Button loading shape="circular" size="lg" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button shape="rounded" size="sm" element={element}>Aa</Button>
                    <Button shape="rounded" element={element}>Aa</Button>
                    <Button shape="rounded" size="lg" element={element}>Aa</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading shape="rounded" size="sm" element={element}>Aa</Button>
                    <Button loading shape="rounded" element={element}>Aa</Button>
                    <Button loading shape="rounded" size="lg" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button active size="sm" element={element}>Button</Button>
                    <Button active element={element}>Button</Button>
                    <Button active size="lg" element={element}>Button</Button>
                    <Button loading active element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button focus size="sm" element={element}>Button</Button>
                    <Button focus element={element}>Button</Button>
                    <Button focus size="lg" element={element}>Button</Button>
                    <Button loading focus element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button hover size="sm" element={element}>Button</Button>
                    <Button hover element={element}>Button</Button>
                    <Button hover size="lg" element={element}>Button</Button>
                    <Button loading hover element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button focus hover size="sm" element={element}>Button</Button>
                    <Button focus hover element={element}>Button</Button>
                    <Button focus hover size="lg" element={element}>Button</Button>
                    <Button loading focus hover element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button disabled size="sm" element={element}>Button</Button>
                    <Button disabled element={element}>Button</Button>
                    <Button disabled size="lg" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("as anchor", () =>
            <Button as="a" href="https://www.sharegate.com" target="_blank" element={element}>Button</Button>
        );
}
