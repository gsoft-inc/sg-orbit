import { Badge } from "@react-components/badge";
import { CheckCircleIcon, CrossIcon, IconGroup, LightbulbIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function Tag({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <Tag size="small" element={element}>Falcon 9</Tag>
                    <Tag element={element}>Falcon 9</Tag>
                    <Tag size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline>
                    <Tag fluid element={element}>Falcon 9</Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid element={element}>Falcon 9</Tag>
                </Inline>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline align="end">
                    <Tag iconLeft={<CheckCircleIcon />} size="small" element={element}>Falcon 9</Tag>
                    <Tag iconLeft={<CheckCircleIcon />} element={element}>Falcon 9</Tag>
                    <Tag iconLeft={<CheckCircleIcon />} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag iconLeft={<IconGroup><CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon /></IconGroup>} size="small" element={element}>Falcon 9</Tag>
                    <Tag iconLeft={<IconGroup><CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon /></IconGroup>} element={element}>Falcon 9</Tag>
                    <Tag iconLeft={<IconGroup><CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon /></IconGroup>} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag iconRight={<CheckCircleIcon />} size="small" element={element}>Falcon 9</Tag>
                    <Tag iconRight={<CheckCircleIcon />} element={element}>Falcon 9</Tag>
                    <Tag iconRight={<CheckCircleIcon />} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag iconRight={<IconGroup><CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon /></IconGroup>} size="small" element={element}>Falcon 9</Tag>
                    <Tag iconRight={<IconGroup><CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon /></IconGroup>} element={element}>Falcon 9</Tag>
                    <Tag iconRight={<IconGroup><CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon /></IconGroup>} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag iconLeft={<CheckCircleIcon />} iconRight={<LightbulbIcon />} size="small" element={element}>Falcon 9</Tag>
                    <Tag iconLeft={<CheckCircleIcon />} iconRight={<LightbulbIcon />} element={element}>Falcon 9</Tag>
                    <Tag iconLeft={<CheckCircleIcon />} iconRight={<LightbulbIcon />} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline>
                    <Tag fluid iconLeft={<CheckCircleIcon />} iconRight={<LightbulbIcon />} element={element}>Falcon 9</Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid iconLeft={<CheckCircleIcon />} iconRight={<LightbulbIcon />} element={element}>Falcon 9</Tag>
                </Inline>
            </Stack>
        )
        .add("badge", () =>
            <Stack>
                <Inline align="end">
                    <Tag badgeLeft={<Badge variant="dot" />} size="small" element={element}>Falcon 9</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} element={element}>Falcon 9</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag badgeLeft={<Badge>60</Badge>} size="small" element={element}>Falcon 9</Tag>
                    <Tag badgeLeft={<Badge>60</Badge>} element={element}>Falcon 9</Tag>
                    <Tag badgeLeft={<Badge>60</Badge>} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag badgeRight={<Badge variant="dot" />} size="small" element={element}>Falcon 9</Tag>
                    <Tag badgeRight={<Badge variant="dot" />} element={element}>Falcon 9</Tag>
                    <Tag badgeRight={<Badge variant="dot" />} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag badgeRight={<Badge>60</Badge>} size="small" element={element}>Falcon 9</Tag>
                    <Tag badgeRight={<Badge>60</Badge>} element={element}>Falcon 9</Tag>
                    <Tag badgeRight={<Badge>60</Badge>} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline align="end">
                    <Tag badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="small" element={element}>Falcon 9</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Falcon 9</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline>
                    <Tag fluid badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Falcon 9</Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>60</Badge>} element={element}>Falcon 9</Tag>
                </Inline>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <Inline align="end">
                    <Tag button={<IconButton><CrossIcon /></IconButton>} size="small" element={element}>Falcon 9</Tag>
                    <Tag button={<IconButton><CrossIcon /></IconButton>} element={element}>Falcon 9</Tag>
                    <Tag button={<IconButton><CrossIcon /></IconButton>} size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline>
                    <Tag fluid button={<IconButton><CrossIcon /></IconButton>} element={element}>Falcon 9</Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid button={<IconButton><CrossIcon /></IconButton>} element={element}>Falcon 9</Tag>
                </Inline>
            </Stack>
        )
        .add("as link", () =>
            <Inline>
                <Tag as="a" element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" active element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" focus element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" hover element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" focus hover element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" disabled element={element} href="#a">Falcon 9</Tag>
            </Inline>
        )
        .add("as button", () =>
            <Inline>
                <Tag as="button" element={element} href="#a">Falcon 9</Tag>
                <Tag as="button" active element={element} href="#a">Falcon 9</Tag>
                <Tag as="button" focus element={element} href="#a">Falcon 9</Tag>
                <Tag as="button" hover element={element} href="#a">Falcon 9</Tag>
                <Tag as="button" focus hover element={element} href="#a">Falcon 9</Tag>
                <Tag as="button" disabled element={element} href="#a">Falcon 9</Tag>
            </Inline>
        );
}
