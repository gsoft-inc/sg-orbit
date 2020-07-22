import { Badge } from "@react-components/badge";
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
                    <Button iconLeft={<SignoutIcon />} size="mini" element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} size="tiny" element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} size="small" element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button iconLeft={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="mini" element={element}>Button</Button>
                    <Button iconLeft={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="tiny" element={element}>Button</Button>
                    <Button iconLeft={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="small" element={element}>Button</Button>
                    <Button iconLeft={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} element={element}>Button</Button>
                    <Button iconLeft={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button iconRight={<SignoutIcon />} size="mini" element={element}>Button</Button>
                    <Button iconRight={<SignoutIcon />} size="tiny" element={element}>Button</Button>
                    <Button iconRight={<SignoutIcon />} size="small" element={element}>Button</Button>
                    <Button iconRight={<SignoutIcon />} element={element}>Button</Button>
                    <Button iconRight={<SignoutIcon />} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button iconRight={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="mini" element={element}>Button</Button>
                    <Button iconRight={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="tiny" element={element}>Button</Button>
                    <Button iconRight={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="small" element={element}>Button</Button>
                    <Button iconRight={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} element={element}>Button</Button>
                    <Button iconRight={<IconGroup><SignoutIcon /><SignoutIcon /><SignoutIcon /></IconGroup>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="mini" element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="tiny" element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="small" element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} element={element}>Button</Button>
                    <Button iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button loading iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="mini" element={element}>Button</Button>
                    <Button loading iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="tiny" element={element}>Button</Button>
                    <Button loading iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="small" element={element}>Button</Button>
                    <Button loading iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} element={element}>Button</Button>
                    <Button loading iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} size="large" element={element}>Button</Button>
                </Inline>
                <div>
                    <Button disabled iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} element={element}>Button</Button>
                </div>
                <div>
                    <Button fluid iconLeft={<SignoutIcon />} iconRight={<SignoutIcon />} element={element}>Button</Button>
                </div>
            </Stack>
        )
        .add("badge", () =>
            <Stack>
                <Inline align="end">
                    <Button badgeLeft={<Badge variant="dot" />} size="mini" element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} size="tiny" element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} size="small" element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button badgeLeft={<Badge>60</Badge>} size="mini" element={element}>Button</Button>
                    <Button badgeLeft={<Badge>60</Badge>} size="tiny" element={element}>Button</Button>
                    <Button badgeLeft={<Badge>60</Badge>} size="small" element={element}>Button</Button>
                    <Button badgeLeft={<Badge>60</Badge>} element={element}>Button</Button>
                    <Button badgeLeft={<Badge>60</Badge>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button badgeRight={<Badge variant="dot" />} size="mini" element={element}>Button</Button>
                    <Button badgeRight={<Badge variant="dot" />} size="tiny" element={element}>Button</Button>
                    <Button badgeRight={<Badge variant="dot" />} size="small" element={element}>Button</Button>
                    <Button badgeRight={<Badge variant="dot" />} element={element}>Button</Button>
                    <Button badgeRight={<Badge variant="dot" />} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button badgeRight={<Badge>60</Badge>} size="mini" element={element}>Button</Button>
                    <Button badgeRight={<Badge>60</Badge>} size="tiny" element={element}>Button</Button>
                    <Button badgeRight={<Badge>60</Badge>} size="small" element={element}>Button</Button>
                    <Button badgeRight={<Badge>60</Badge>} element={element}>Button</Button>
                    <Button badgeRight={<Badge>60</Badge>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="mini" element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="tiny" element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="small" element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Button</Button>
                    <Button badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="large" element={element}>Button</Button>
                </Inline>
                <Inline align="end">
                    <Button loading badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="mini" element={element}>Button</Button>
                    <Button loading badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="tiny" element={element}>Button</Button>
                    <Button loading badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="small" element={element}>Button</Button>
                    <Button loading badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Button</Button>
                    <Button loading badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="large" element={element}>Button</Button>
                </Inline>
                <div>
                    <Button disabled badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Button</Button>
                </div>
                <div>
                    <Button fluid badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Button</Button>
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
                <Inline align="end">
                    <Button loading color="primary" size="mini" element={element}>Button</Button>
                    <Button loading color="primary" size="tiny" element={element}>Button</Button>
                    <Button loading color="primary" size="small" element={element}>Button</Button>
                    <Button loading color="primary" element={element}>Button</Button>
                    <Button loading color="primary" size="large" element={element}>Button</Button>
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
                    <Button loading color="secondary" size="mini" element={element}>Button</Button>
                    <Button loading color="secondary" size="tiny" element={element}>Button</Button>
                    <Button loading color="secondary" size="small" element={element}>Button</Button>
                    <Button loading color="secondary" element={element}>Button</Button>
                    <Button loading color="secondary" size="large" element={element}>Button</Button>
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
                    <Button loading color="danger" size="mini" element={element}>Button</Button>
                    <Button loading color="danger" size="tiny" element={element}>Button</Button>
                    <Button loading color="danger" size="small" element={element}>Button</Button>
                    <Button loading color="danger" element={element}>Button</Button>
                    <Button loading color="danger" size="large" element={element}>Button</Button>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline align="end">
                    <Button circular size="mini" element={element}>Aa</Button>
                    <Button circular size="tiny" element={element}>Aa</Button>
                    <Button circular size="small" element={element}>Aa</Button>
                    <Button circular element={element}>Aa</Button>
                    <Button circular size="large" element={element}>Aa</Button>
                </Inline>
                <Inline align="end">
                    <Button loading circular size="mini" element={element}>Aa</Button>
                    <Button loading circular size="tiny" element={element}>Aa</Button>
                    <Button loading circular size="small" element={element}>Aa</Button>
                    <Button loading circular element={element}>Aa</Button>
                    <Button loading circular size="large" element={element}>Aa</Button>
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
                <div>
                    <Button fluid active element={element}>Button</Button>
                </div>
                <Inline align="end">
                    <Button focus size="mini" element={element}>Button</Button>
                    <Button focus size="tiny" element={element}>Button</Button>
                    <Button focus size="small" element={element}>Button</Button>
                    <Button focus element={element}>Button</Button>
                    <Button focus size="large" element={element}>Button</Button>
                    <Button loading focus element={element}>Button</Button>
                </Inline>
                <div>
                    <Button fluid focus element={element}>Button</Button>
                </div>
                <Inline align="end">
                    <Button hover size="mini" element={element}>Button</Button>
                    <Button hover size="tiny" element={element}>Button</Button>
                    <Button hover size="small" element={element}>Button</Button>
                    <Button hover element={element}>Button</Button>
                    <Button hover size="large" element={element}>Button</Button>
                    <Button loading hover element={element}>Button</Button>
                </Inline>
                <div>
                    <Button fluid hover element={element}>Button</Button>
                </div>
                <Inline align="end">
                    <Button focus hover size="mini" element={element}>Button</Button>
                    <Button focus hover size="tiny" element={element}>Button</Button>
                    <Button focus hover size="small" element={element}>Button</Button>
                    <Button focus hover element={element}>Button</Button>
                    <Button focus hover size="large" element={element}>Button</Button>
                    <Button loading focus hover element={element}>Button</Button>
                </Inline>
                <div>
                    <Button fluid focus hover element={element}>Button</Button>
                </div>
                <Inline align="end">
                    <Button disabled size="mini" element={element}>Button</Button>
                    <Button disabled size="tiny" element={element}>Button</Button>
                    <Button disabled size="small" element={element}>Button</Button>
                    <Button disabled element={element}>Button</Button>
                    <Button disabled size="large" element={element}>Button</Button>
                    <Button loading disabled element={element}>Button</Button>
                </Inline>
                <div>
                    <Button fluid disabled element={element}>Button</Button>
                </div>
            </Stack>
        )
        .add("styling", () =>
            <Inline>
                <Button className="bg-red" element={element}>Button</Button>
                <Button style={{ backgroundColor: "red" }} element={element}>Button</Button>
            </Inline>
        )
        .add("as anchor", () =>
            <Button as="a" href="https://www.sharegate.com" target="_blank" element={element}>Button</Button>
        );
}
