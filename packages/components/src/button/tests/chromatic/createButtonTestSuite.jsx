import { Counter } from "@components/counter";
import { Div } from "@components/html";
import { IconList, SignoutIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Text } from "@components/typography";
import { cloneElement } from "react";

function Button({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <Button size="sm" element={element}>Button</Button>
                    <Button element={element}>Button</Button>
                </Inline>
                <Inline alignY="end">
                    <Button loading size="sm" element={element}>Button</Button>
                    <Button loading element={element}>Button</Button>
                </Inline>
                <Inline alignY="end">
                    <Button condensed size="sm" element={element}>Button</Button>
                    <Button condensed element={element}>Button</Button>
                </Inline>
                <Div>
                    <Button fluid element={element}>Button</Button>
                </Div>
                <Div width="10%">
                    <Button fluid element={element}>Button</Button>
                </Div>
                <Div>
                    <Button loading fluid element={element}>Button</Button>
                </Div>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline alignY="end">
                    <Button size="sm" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Inline alignY="end">
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
                <Inline alignY="end">
                    <Button loading size="sm" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button loading element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Inline alignY="end">
                    <Button condensed size="sm" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button condensed element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Inline>
                <Div>
                    <Button disabled element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Div>
                <Div>
                    <Button fluid element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                </Div>
            </Stack>
        )
        .add("end icon", () =>
            <Stack>
                <Inline alignY="end">
                    <Button size="sm" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <Inline alignY="end">
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
                <Inline alignY="end">
                    <Button loading size="sm" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button loading element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <Inline alignY="end">
                    <Button condensed size="sm" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                    <Button condensed element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <Div>
                    <Button disabled element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Div>
                <Div>
                    <Button fluid element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Div>
            </Stack>
        )
        .add("counter", () =>
            <Stack>
                <Inline alignY="end">
                    <Button size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                    <Button element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Inline>
                <Inline alignY="end">
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
                <Inline alignY="end">
                    <Button loading size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                    <Button loading element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Inline>
                <Inline alignY="end">
                    <Button condensed size="sm" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                    <Button condensed element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Inline>
                <Div>
                    <Button disabled element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </Div>
                <Div>
                    <Button fluid element={element}>
                        <Text>Button</Text>
                        <Counter>15</Counter>
                    </Button>
                </Div>
            </Stack>
        )
        .add("basic", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button tone="basic" size="sm" element={element}>Button</Button>
                    <Button tone="basic" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button tone="basic" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button tone="basic" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button tone="basic" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active tone="basic" element={element}>Button</Button>
                    <Button focus tone="basic" element={element}>Button</Button>
                    <Button hover tone="basic" element={element}>Button</Button>
                    <Button focus hover tone="basic" element={element}>Button</Button>
                    <Button loading tone="basic" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("negative", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Button tone="negative" size="sm" element={element}>Button</Button>
                    <Button tone="negative" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button tone="negative" element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button tone="negative" element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button tone="negative" element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active tone="negative" element={element}>Button</Button>
                    <Button focus tone="negative" element={element}>Button</Button>
                    <Button hover tone="negative" element={element}>Button</Button>
                    <Button focus hover tone="negative" element={element}>Button</Button>
                    <Button loading tone="negative" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("inherit", () =>
            <Stack backgroundColor="warning-1" color="warning-7">
                <Inline verticalAlign="end">
                    <Button tone="basic" inherit size="sm" element={element}>Button</Button>
                    <Button tone="basic" inherit element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button tone="basic" inherit element={element}>
                        <SignoutIcon />
                        <Text>Button</Text>
                    </Button>
                    <Button tone="basic" inherit element={element}>
                        <Text>Button</Text>
                        <SignoutIcon slot="end-icon" />
                    </Button>
                </Inline>
                <div>
                    <Button tone="basic" inherit element={element}>
                        <Text>Button</Text>
                        <Counter variant="divider">15</Counter>
                    </Button>
                </div>
                <Inline>
                    <Button active tone="basic" inherit element={element}>Button</Button>
                    <Button focus tone="basic" inherit element={element}>Button</Button>
                    <Button hover tone="basic" inherit element={element}>Button</Button>
                    <Button focus hover tone="basic" inherit element={element}>Button</Button>
                    <Button loading tone="basic" inherit element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline alignY="end">
                    <Button shape="circular" size="sm" element={element}>Aa</Button>
                    <Button shape="circular" element={element}>Aa</Button>
                </Inline>
                <Inline alignY="end">
                    <Button loading shape="circular" size="sm" element={element}>Aa</Button>
                    <Button loading shape="circular" element={element}>Aa</Button>
                </Inline>
                <Inline alignY="end">
                    <Button condensed shape="circular" size="sm" element={element}>Aa</Button>
                    <Button condensed shape="circular" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Inline>
                <Stack>
                    <Inline alignY="end">
                        <Button active size="sm" element={element}>Button</Button>
                        <Button active element={element}>Button</Button>
                        <Button loading active element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button focus size="sm" element={element}>Button</Button>
                        <Button focus element={element}>Button</Button>
                        <Button loading focus element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button hover size="sm" element={element}>Button</Button>
                        <Button hover element={element}>Button</Button>
                        <Button loading hover element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button focus hover size="sm" element={element}>Button</Button>
                        <Button focus hover element={element}>Button</Button>
                        <Button loading focus hover element={element}>Button</Button>
                    </Inline>
                </Stack>
                <Stack>
                    <Inline alignY="end">
                        <Button disabled size="sm" element={element}>Button</Button>
                        <Button disabled element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button disabled active size="sm" element={element}>Button</Button>
                        <Button disabled active element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button disabled focus size="sm" element={element}>Button</Button>
                        <Button disabled focus element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button disabled hover size="sm" element={element}>Button</Button>
                        <Button disabled hover element={element}>Button</Button>
                    </Inline>
                    <Inline alignY="end">
                        <Button disabled focus hover size="sm" element={element}>Button</Button>
                        <Button disabled focus hover element={element}>Button</Button>
                    </Inline>
                </Stack>
            </Inline>
        )
        .add("zoom", () =>
            <Inline>
                <Div className="zoom-in">
                    <Button element={element}>Button</Button>
                </Div>
                <Div className="zoom-out'">
                    <Button element={element}>Button</Button>
                </Div>
            </Inline>
        );
}
