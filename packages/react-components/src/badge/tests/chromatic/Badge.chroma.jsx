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
            .chromaticDelay(100)
            .build())
        .build();
}

// TODO:
// - overlap (square, circle, icon, text)

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
            <EmailIcon size="large" />
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
            <Inline gap={8} align="end">
                <SquareBadge size="small">
                    <Text>5</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>5</Text>
                </SquareBadge>
                <SquareBadge size="large">
                    <Text>5</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} align="end">
                <SquareBadge size="small">
                    <Text>5+</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>5+</Text>
                </SquareBadge>
                <SquareBadge size="large">
                    <Text>5+</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} align="end">
                <SquareBadge size="small">
                    <Text>50</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>50</Text>
                </SquareBadge>
                <SquareBadge size="large">
                    <Text>50</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} align="end">
                <SquareBadge size="small">
                    <Text>500</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>500</Text>
                </SquareBadge>
                <SquareBadge size="large">
                    <Text>500</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} align="end">
                <SquareBadge size="small">
                    <Text>500+</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>500+</Text>
                </SquareBadge>
                <SquareBadge size="large">
                    <Text>500+</Text>
                </SquareBadge>
            </Inline>
        </Stack>
    )
    .add("overlap", () =>
        <Stack gap={8}>
            <Inline gap={8} align="end">
                <SquareBadge size="small">
                    <Text>50</Text>
                </SquareBadge>
                <SquareBadge>
                    <Text>50</Text>
                </SquareBadge>
                <SquareBadge size="large">
                    <Text>50</Text>
                </SquareBadge>
            </Inline>
            <Inline gap={8} align="end">
                <CircleBadge size="small">
                    <Text>50</Text>
                </CircleBadge>
                <CircleBadge>
                    <Text>50</Text>
                </CircleBadge>
                <CircleBadge size="large">
                    <Text>50</Text>
                </CircleBadge>
            </Inline>
            <Inline gap={8} align="end">
                <IconBadge size="small">
                    <Text>50</Text>
                </IconBadge>
                <IconBadge>
                    <Text>50</Text>
                </IconBadge>
                <IconBadge size="large">
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
        <Inline gap={8} align="end">
            <SquareBadge variant="dot" size="small" />
            <SquareBadge variant="dot" />
            <SquareBadge variant="dot" size="large" />
        </Inline>
    )
    .add("overlap", () =>
        <Stack gap={8}>
            <Inline gap={8} align="end">
                <SquareBadge variant="dot" size="small" />
                <SquareBadge variant="dot" />
                <SquareBadge variant="dot" size="large" />
            </Inline>
            <Inline gap={8} align="end">
                <CircleBadge variant="dot" size="small" />
                <CircleBadge variant="dot" />
                <CircleBadge variant="dot" size="large" />
            </Inline>
            <Inline gap={8} align="end">
                <IconBadge variant="dot" size="small" />
                <IconBadge variant="dot" />
                <IconBadge variant="dot" size="large" />
            </Inline>
            <Inline gap={8} align="end">
                <TextBadge variant="dot" size="small" />
                <TextBadge variant="dot" />
                <TextBadge variant="dot" size="large" />
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
        <Inline gap={8} align="end">
            <SquareBadge variant="icon" size="small">
                <CheckCircleIcon />
            </SquareBadge>
            <SquareBadge variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
            <SquareBadge variant="icon" size="large">
                <CheckCircleIcon />
            </SquareBadge>
        </Inline>
    )
    .add("overlap", () =>
        <Stack gap={8}>
            <Inline gap={8} align="end">
                <SquareBadge variant="icon" size="small">
                    <CheckCircleIcon />
                </SquareBadge>
                <SquareBadge variant="icon">
                    <CheckCircleIcon />
                </SquareBadge>
                <SquareBadge variant="icon" size="large">
                    <CheckCircleIcon />
                </SquareBadge>
            </Inline>
            <Inline gap={8} align="end">
                <CircleBadge variant="icon" size="small">
                    <CheckCircleIcon />
                </CircleBadge>
                <CircleBadge variant="icon">
                    <CheckCircleIcon />
                </CircleBadge>
                <CircleBadge variant="icon" size="large">
                    <CheckCircleIcon />
                </CircleBadge>
            </Inline>
            <Inline gap={8} align="end">
                <IconBadge variant="icon" size="small">
                    <CheckCircleIcon />
                </IconBadge>
                <IconBadge variant="icon">
                    <CheckCircleIcon />
                </IconBadge>
                <IconBadge variant="icon" size="large">
                    <CheckCircleIcon />
                </IconBadge>
            </Inline>
            <Inline gap={8} align="end">
                <TextBadge variant="icon" size="small">
                    <CheckCircleIcon />
                </TextBadge>
                <TextBadge variant="icon">
                    <CheckCircleIcon />
                </TextBadge>
                <TextBadge variant="icon" size="large">
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
