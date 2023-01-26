import { Box, BoxProps } from "@components/box";
import { TextLink } from "@components/link";
import { forwardRef, useCallback, useMemo } from "react";
import { isNil, slot, useSlots } from "@components/shared";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

//
// eslint-disable-next-line storybook/csf-component
export default {
    title: "Chromatic/Slots"
} as ComponentMeta<any>;

type SlotStory = ComponentStoryObj<any>;

const Card = forwardRef<any, BoxProps>(({ children, ...rest }, ref) => {
    const { title, content } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        content: {
            style: {
                backgroundColor: "blue",
                color: "white"
            }
        },
        optionnal: null,
        title: {
            className: "bg-red",
            style: {
                color: "white"
            }
        }
    }), []));

    return (
        <Box
            {...rest}
            ref={ref}
        >
            {title}
            {content}
        </Box>
    );
});

const Title = slot("title", forwardRef<any, BoxProps>(({ className, style, children }, ref) => {
    return (
        <Box
            className={className}
            style={style}
            ref={ref}
        >
            {children}
        </Box>
    );
}));

const Content = slot("content", forwardRef<any, BoxProps>(({ className, style, children }, ref) => {
    return (
        <Box
            className={className}
            style={style}
            ref={ref}
        >
            {children}
        </Box>
    );
}));

export const DefaultSlot: SlotStory = {
    storyName: "default slot",
    render: () => (
        <Card>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </Card>
    )
};

export const DynamicSlot: SlotStory = {
    storyName: "dynamic slot",
    render: () => (
        <Card>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Box slot="content" style={{ backgroundColor: "purple" }}>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Box>
        </Card>
    )
};

export const WrapStringContent: SlotStory = {
    storyName: "wrap string",
    render: () => (
        <Card>
        Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.
        </Card>
    )
};

export const WrapMixedContent: SlotStory = {
    storyName: "wrap mixed",
    render: () => (
        <Card>
        Early this morning (Oct. 20), SpaceX lit up the three <TextLink href="#">Raptor engines</TextLink> on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.
        </Card>
    )
};

export const UserPropsOnSlottedComponent: SlotStory = {
    storyName: "user props",
    render: () => (
        <Card>
            <Title className="pa2">SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content className="pa2">Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </Card>
    )
};

const NoDefaultAndPassThroughCard = ({ children, ...rest }: BoxProps) => {
    const { content } = useSlots(children, useMemo(() => ({
        _: {
        },
        content: {
            style: {
                backgroundColor: "blue",
                color: "white"
            }
        }
    }), []));

    return (
        <Box {...rest}>
            {content}
        </Box>
    );
};

export const NoDefaultCard: SlotStory = {
    storyName: "no default",
    render: () => (
        <NoDefaultAndPassThroughCard>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </NoDefaultAndPassThroughCard>
    )
};

export const SupportFragment: SlotStory = {
    storyName: "support fragment",
    render: () => (
        <Card>
            <>
                <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
                <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
            </>
        </Card>
    )
};

function FunctionalCard({ children, ...rest }: BoxProps) {
    const { content } = useSlots(children, {
        _: {
        },
        content: useCallback(slotElement => {
            return {
                className: !isNil(slotElement.props.blue) ? "bg-blue" : "bg-red"
            };
        }, []),
        title: null
    });

    return (
        <Box {...rest}>
            {content}
        </Box>
    );
}

export const SlotsFunctionalCard: SlotStory = {
    storyName: "support functional",
    render: () => (
        <FunctionalCard>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </FunctionalCard>
    )
};

function ConditionalCard({ children, ...rest }: BoxProps) {
    const { content } = useSlots(children, {
        _: {
        },
        content: useCallback((slotElement, allSlotElements) => {
            return {
                className: !isNil(allSlotElements.title) ? "bg-blue" : "bg-red"
            };
        }, []),
        title: null
    });

    return (
        <Box {...rest}>
            {content}
        </Box>
    );
}

export const SupportConditionnalSlots: SlotStory = {
    storyName: "support conditional",
    render: () => (
        <ConditionalCard>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </ConditionalCard>
    )
};
