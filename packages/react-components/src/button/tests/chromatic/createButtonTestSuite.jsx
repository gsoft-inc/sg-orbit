import { Counter } from "@react-components/counter";
import { IconList, SignoutIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
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
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading size="sm" element={element}>Button</Button>
                    <Button loading element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button condensed size="sm" element={element}>Button</Button>
                    <Button condensed element={element}>Button</Button>
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
                </Inline>
                <Inline verticalAlign="end">
                    <Button condensed size="sm" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button condensed element={element}>
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
        .add("end icon", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>
                        <Text>Button</Text>
                        <IconList slot="end-icon">
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconList>
                    </Button>
                    <Button element={element}>
                        <Text>Button</Text>
                        <IconList slot="end-icon">
                            <SignoutIcon /><SignoutIcon /><SignoutIcon />
                        </IconList>
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading size="sm" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button loading element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button condensed size="sm" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button condensed element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button disabled element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </div>
                <div>
                    <Button fluid element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </div>
            </Stack>
        )
        .add("counter", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                    <Button element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                    <Button loading element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button condensed size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                    <Button condensed element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Inline>
                <div>
                    <Button disabled element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <div>
                    <Button fluid element={element}>
                        <Text>Button</Text>
                        <Counter>15</Counter>
                    </Button>
                </div>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button color="primary" size="sm" element={element}>Button</Button>
                    <Button color="primary" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button color="primary" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button color="primary" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button color="primary" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active color="primary" element={element}>Button</Button>
                    <Button focus color="primary" element={element}>Button</Button>
                    <Button hover color="primary" element={element}>Button</Button>
                    <Button focus hover color="primary" element={element}>Button</Button>
                    <Button loading color="primary" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button color="secondary" size="sm" element={element}>Button</Button>
                    <Button color="secondary" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button color="secondary" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button color="secondary" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button color="secondary" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active color="secondary" element={element}>Button</Button>
                    <Button focus color="secondary" element={element}>Button</Button>
                    <Button hover color="secondary" element={element}>Button</Button>
                    <Button focus hover color="secondary" element={element}>Button</Button>
                    <Button loading color="secondary" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button color="danger" size="sm" element={element}>Button</Button>
                    <Button color="danger" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button color="danger" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button color="danger" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button color="danger" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active color="danger" element={element}>Button</Button>
                    <Button focus color="danger" element={element}>Button</Button>
                    <Button hover color="danger" element={element}>Button</Button>
                    <Button focus hover color="danger" element={element}>Button</Button>
                    <Button loading color="danger" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("inherit", () =>
            <Stack className="bg-sunray-50 sunray-900">
                <Inline verticalAlign="end">
                    <Button color="inherit" size="sm" element={element}>Button</Button>
                    <Button color="inherit" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button color="inherit" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button color="inherit" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button color="inherit" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active color="inherit" element={element}>Button</Button>
                    <Button focus color="inherit" element={element}>Button</Button>
                    <Button hover color="inherit" element={element}>Button</Button>
                    <Button focus hover color="inherit" element={element}>Button</Button>
                    <Button loading color="inherit" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button shape="circular" size="sm" element={element}>Aa</Button>
                    <Button shape="circular" element={element}>Aa</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading shape="circular" size="sm" element={element}>Aa</Button>
                    <Button loading shape="circular" element={element}>Aa</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button condensed shape="circular" size="sm" element={element}>Aa</Button>
                    <Button condensed shape="circular" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button shape="rounded" size="sm" element={element}>Aa</Button>
                    <Button shape="rounded" element={element}>Aa</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button loading shape="rounded" size="sm" element={element}>Aa</Button>
                    <Button loading shape="rounded" element={element}>Aa</Button>
                </Inline>
                <Inline>
                    <Button shape="rounded" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button shape="rounded" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button shape="rounded" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline verticalAlign="end">
                    <Button condensed shape="rounded" size="sm" element={element}>Aa</Button>
                    <Button condensed shape="rounded" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button active size="sm" element={element}>Button</Button>
                    <Button active element={element}>Button</Button>
                    <Button loading active element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button focus size="sm" element={element}>Button</Button>
                    <Button focus element={element}>Button</Button>
                    <Button loading focus element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button hover size="sm" element={element}>Button</Button>
                    <Button hover element={element}>Button</Button>
                    <Button loading hover element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button focus hover size="sm" element={element}>Button</Button>
                    <Button focus hover element={element}>Button</Button>
                    <Button loading focus hover element={element}>Button</Button>
                </Inline>
                <Inline verticalAlign="end">
                    <Button disabled size="sm" element={element}>Button</Button>
                    <Button disabled element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("as anchor", () =>
            <Button as="a" href="https://www.sharegate.com" target="_blank" element={element}>Button</Button>
        );
}
