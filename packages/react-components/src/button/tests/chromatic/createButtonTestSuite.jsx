import { Counter } from "@react-components/counter";
import { IconGroup, SignoutIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function Button({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createButtonTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <Button size="mini" element={element}>Button</Button>
                    <Button size="tiny" element={element}>Button</Button>
                    <Button size="small" element={element}>Button</Button>
                    <Button element={element}>Button</Button>
                    <Button size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button loading size="mini" element={element}>Button</Button>
                    <Button loading size="tiny" element={element}>Button</Button>
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
                    <Button icon={<SignoutIcon />} size="mini" element={element}>Button</Button>
                    <Button icon={<SignoutIcon />} size="tiny" element={element}>Button</Button>
                    <Button icon={<SignoutIcon />} size="small" element={element}>Button</Button>
                    <Button icon={<SignoutIcon />} element={element}>Button</Button>
                    <Button icon={<SignoutIcon />} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button icon={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="mini" element={element}>Button</Button>
                    <Button icon={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="tiny" element={element}>Button</Button>
                    <Button icon={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="small" element={element}>Button</Button>
                    <Button icon={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} element={element}>Button</Button>
                    <Button icon={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button loading icon={<SignoutIcon />} size="mini" element={element}>Button</Button>
                    <Button loading icon={<SignoutIcon />} size="tiny" element={element}>Button</Button>
                    <Button loading icon={<SignoutIcon />} size="small" element={element}>Button</Button>
                    <Button loading icon={<SignoutIcon />} element={element}>Button</Button>
                    <Button loading icon={<SignoutIcon />} size="large" element={element}>Button</Button>
                </Inline>
                <div>
                    <Button disabled icon={<SignoutIcon />} element={element}>Button</Button>
                </div>
                <div>
                    <Button fluid icon={<SignoutIcon />} element={element}>Button</Button>
                </div>
            </Stack>
        )
        .add("counter", () =>
            <Stack>
                <Inline align="end">
                    <Button counter={<Counter>60</Counter>} size="mini" element={element}>Button</Button>
                    <Button counter={<Counter>60</Counter>} size="tiny" element={element}>Button</Button>
                    <Button counter={<Counter>60</Counter>} size="small" element={element}>Button</Button>
                    <Button counter={<Counter>60</Counter>} element={element}>Button</Button>
                    <Button counter={<Counter>60</Counter>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button loading counter={<Counter>60</Counter>} size="mini" element={element}>Button</Button>
                    <Button loading counter={<Counter>60</Counter>} size="tiny" element={element}>Button</Button>
                    <Button loading counter={<Counter>60</Counter>} size="small" element={element}>Button</Button>
                    <Button loading counter={<Counter>60</Counter>} element={element}>Button</Button>
                    <Button loading counter={<Counter>60</Counter>} size="large" element={element}>Button</Button>
                </Inline>
                <div>
                    <Button disabled counter={<Counter>60</Counter>} element={element}>Button</Button>
                </div>
                <div>
                    <Button fluid counter={<Counter>60</Counter>} element={element}>Button</Button>
                </div>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline align="end">
                    <Button color="primary" size="mini" element={element}>Button</Button>
                    <Button color="primary" size="tiny" element={element}>Button</Button>
                    <Button color="primary" size="small" element={element}>Button</Button>
                    <Button color="primary" element={element}>Button</Button>
                    <Button color="primary" size="large" element={element}>Button</Button>
                </Inline>
                <Inline>
                    <Button icon={<SignoutIcon />} color="primary" element={element}>Button</Button>
                    <Button loading color="primary" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline align="end">
                    <Button color="secondary" size="mini" element={element}>Button</Button>
                    <Button color="secondary" size="tiny" element={element}>Button</Button>
                    <Button color="secondary" size="small" element={element}>Button</Button>
                    <Button color="secondary" element={element}>Button</Button>
                    <Button color="secondary" size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button icon={<SignoutIcon />} color="secondary" element={element}>Button</Button>
                    <Button loading color="secondary" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline align="end">
                    <Button color="danger" size="mini" element={element}>Button</Button>
                    <Button color="danger" size="tiny" element={element}>Button</Button>
                    <Button color="danger" size="small" element={element}>Button</Button>
                    <Button color="danger" element={element}>Button</Button>
                    <Button color="danger" size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button icon={<SignoutIcon />} color="danger" element={element}>Button</Button>
                    <Button loading color="danger" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline align="end">
                    <Button shape="circular" size="mini" element={element}>Aa</Button>
                    <Button shape="circular" size="tiny" element={element}>Aa</Button>
                    <Button shape="circular" size="small" element={element}>Aa</Button>
                    <Button shape="circular" element={element}>Aa</Button>
                    <Button shape="circular" size="large" element={element}>Aa</Button>
                </Inline>
                <Inline align="end">
                    <Button loading shape="circular" size="mini" element={element}>Aa</Button>
                    <Button loading shape="circular" size="tiny" element={element}>Aa</Button>
                    <Button loading shape="circular" size="small" element={element}>Aa</Button>
                    <Button loading shape="circular" element={element}>Aa</Button>
                    <Button loading shape="circular" size="large" element={element}>Aa</Button>
                </Inline>
                <Inline align="end">
                    <Button shape="circular" size="mini" element={element}><SignoutIcon /></Button>
                    <Button shape="circular" size="tiny" element={element}><SignoutIcon /></Button>
                    <Button shape="circular" size="small" element={element}><SignoutIcon /></Button>
                    <Button shape="circular" element={element}><SignoutIcon /></Button>
                    <Button shape="circular" size="large" element={element}><SignoutIcon /></Button>
                </Inline>
                <Inline align="end">
                    <Button loading shape="circular" size="mini" element={element}><SignoutIcon /></Button>
                    <Button loading shape="circular" size="tiny" element={element}><SignoutIcon /></Button>
                    <Button loading shape="circular" size="small" element={element}><SignoutIcon /></Button>
                    <Button loading shape="circular" element={element}><SignoutIcon /></Button>
                    <Button loading shape="circular" size="large" element={element}><SignoutIcon /></Button>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline align="end">
                    <Button shape="rounded" size="mini" element={element}>Aa</Button>
                    <Button shape="rounded" size="tiny" element={element}>Aa</Button>
                    <Button shape="rounded" size="small" element={element}>Aa</Button>
                    <Button shape="rounded" element={element}>Aa</Button>
                    <Button shape="rounded" size="large" element={element}>Aa</Button>
                </Inline>
                <Inline align="end">
                    <Button loading shape="rounded" size="mini" element={element}>Aa</Button>
                    <Button loading shape="rounded" size="tiny" element={element}>Aa</Button>
                    <Button loading shape="rounded" size="small" element={element}>Aa</Button>
                    <Button loading shape="rounded" element={element}>Aa</Button>
                    <Button loading shape="rounded" size="large" element={element}>Aa</Button>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Button active size="mini" element={element}>Button</Button>
                    <Button active size="tiny" element={element}>Button</Button>
                    <Button active size="small" element={element}>Button</Button>
                    <Button active element={element}>Button</Button>
                    <Button active size="large" element={element}>Button</Button>
                    <Button loading active element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button focus size="mini" element={element}>Button</Button>
                    <Button focus size="tiny" element={element}>Button</Button>
                    <Button focus size="small" element={element}>Button</Button>
                    <Button focus element={element}>Button</Button>
                    <Button focus size="large" element={element}>Button</Button>
                    <Button loading focus element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button hover size="mini" element={element}>Button</Button>
                    <Button hover size="tiny" element={element}>Button</Button>
                    <Button hover size="small" element={element}>Button</Button>
                    <Button hover element={element}>Button</Button>
                    <Button hover size="large" element={element}>Button</Button>
                    <Button loading hover element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button focus hover size="mini" element={element}>Button</Button>
                    <Button focus hover size="tiny" element={element}>Button</Button>
                    <Button focus hover size="small" element={element}>Button</Button>
                    <Button focus hover element={element}>Button</Button>
                    <Button focus hover size="large" element={element}>Button</Button>
                    <Button loading focus hover element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button disabled size="mini" element={element}>Button</Button>
                    <Button disabled size="tiny" element={element}>Button</Button>
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
