import { Badge } from "@react-components/badge";
import { CheckCircleIcon, EmailIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Badge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function SquareBadge({ children, ...rest }) {
    return (
        <Badge {...rest}>
            {children}
            <div className="bg-primary-500" style={{ width: "45px", height: "45px" }} />
        </Badge>
    );
}

function CircleBadge({ children, ...rest }) {
    return (
        <Badge
            {...rest}
            overlap="circle"
        >
            {children}
            <div className="bg-primary-500 br-100" style={{ width: "45px", height: "45px" }} />
        </Badge>
    );
}

function IconBadge({ children, ...rest }) {
    return (
        <Badge
            {...rest}
            overlap="icon"
        >
            {children}
            <EmailIcon size="lg" />
        </Badge>
    );
}

function TextBadge({ children, ...rest }) {
    return (
        <Badge {...rest}>
            {children}
            Notifications
        </Badge>
    );
}

stories("/count")
    .add("default", () =>
        <Stack gap={8}>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge size="sm">
                    <Text>5</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>5</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge size="sm">
                    <Text>5+</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>5+</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge size="sm">
                    <Text>50</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>50</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge size="sm">
                    <Text>500</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>500</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge size="sm">
                    <Text>500+</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>500+</Text>
                </SquareBadge>
            </Inline>
        </Stack>
    )
    .add("overlap", () =>
        <Stack gap={8}>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge size="sm">
                    <Text>50</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>50</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <CircleBadge size="sm">
                    <Text>50</Text>
                </CircleBadge>
                <CircleBadge>
                    <Text>50</Text>
                </CircleBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <IconBadge size="sm">
                    <Text>50</Text>
                </IconBadge>
                <IconBadge>
                    <Text>50</Text>
                </IconBadge>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline gap={8}>
            <SquareBadge className="border-red">
                <Text>100</Text>
            </SquareBadge>
            <SquareBadge style={{ border: "1px solid red" }}>
                <Text>100</Text>
            </SquareBadge>
        </Inline>
    );

stories("/dot")
    .add("default", () =>
        <Inline gap={8} verticalAlign="end">
            <SquareBadge variant="dot" size="sm" />
            <SquareBadge variant="dot" />
        </Inline>
    )
    .add("overlap", () =>
        <Stack gap={8}>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge variant="dot" size="sm" />
                <SquareBadge variant="dot" />
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <CircleBadge variant="dot" size="sm" />
                <CircleBadge variant="dot" />
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <IconBadge variant="dot" size="sm" />
                <IconBadge variant="dot" />
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <TextBadge variant="dot" size="sm" />
                <TextBadge variant="dot" />
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <SquareBadge variant="dot" className="border-red" />
            <SquareBadge variant="dot" style={{ border: "1px solid red" }} />
        </Inline>
    );

stories("/icon")
    .add("default", () =>
        <Inline gap={8} verticalAlign="end">
            <SquareBadge variant="icon" size="sm">
                <CheckCircleIcon />
            </SquareBadge>
            <SquareBadge variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
        </Inline>
    )
    .add("overlap", () =>
        <Stack gap={8}>
            <Inline gap={8} verticalAlign="end">
                <SquareBadge variant="icon" size="sm">
                    <CheckCircleIcon />
                </SquareBadge>
                <SquareBadge variant="icon">
                    <CheckCircleIcon />
                </SquareBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <CircleBadge variant="icon" size="sm">
                    <CheckCircleIcon />
                </CircleBadge>
                <CircleBadge variant="icon">
                    <CheckCircleIcon />
                </CircleBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <IconBadge variant="icon" size="sm">
                    <CheckCircleIcon />
                </IconBadge>
                <IconBadge variant="icon">
                    <CheckCircleIcon />
                </IconBadge>
            </Inline>
            <Inline gap={8} verticalAlign="end">
                <TextBadge variant="icon" size="sm">
                    <CheckCircleIcon />
                </TextBadge>
                <TextBadge variant="icon">
                    <CheckCircleIcon />
                </TextBadge>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <SquareBadge className="border-red" variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
            <SquareBadge style={{ border: "1px solid red" }} variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
        </Inline>
    );
