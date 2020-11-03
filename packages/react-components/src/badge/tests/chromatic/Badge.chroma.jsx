import { Badge } from "@react-components/badge";
import { CheckCircleIcon, EmailIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
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
        <Inline gap={8}>
            <SquareBadge>
                <Text>5</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>5+</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>50</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>500</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>500+</Text>
            </SquareBadge>
        </Inline>
    )
    .add("overlap", () =>
        <Inline gap={8}>
            <SquareBadge>
                <Text>50</Text>
            </SquareBadge>
            <CircleBadge>
                <Text>50</Text>
            </CircleBadge>
            <IconBadge>
                <Text>50</Text>
            </IconBadge>
        </Inline>
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
        <SquareBadge variant="dot" />
    )
    .add("overlap", () =>
        <Inline gap={8}>
            <SquareBadge variant="dot" />
            <CircleBadge variant="dot" />
            <IconBadge variant="dot" />
            <TextBadge variant="dot" />
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <SquareBadge variant="dot" className="border-red" />
            <SquareBadge variant="dot" style={{ border: "1px solid red" }} />
        </Inline>
    );

stories("/icon")
    .add("default", () =>
        <SquareBadge variant="icon">
            <CheckCircleIcon />
        </SquareBadge>
    )
    .add("overlap", () =>
        <Inline gap={8}>
            <SquareBadge variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
            <CircleBadge variant="icon">
                <CheckCircleIcon />
            </CircleBadge>
            <IconBadge variant="icon">
                <CheckCircleIcon />
            </IconBadge>
            <TextBadge variant="icon">
                <CheckCircleIcon />
            </TextBadge>
        </Inline>
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
