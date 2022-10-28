import { Box } from "@components/box";
import { TextLink } from "@components/link";
import { forwardRef, useCallback, useMemo } from "react";
import { isNil, slot, useSlots } from "@components/shared";

export default {
    title: "Chromatic/Slots"
};

const Card = forwardRef(({ children, ...rest }, ref) => {
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

const Title = slot("title", forwardRef(({ className, style, children }, ref) => {
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

const Content = slot("content", forwardRef(({ className, style, children }, ref) => {
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

export const DefaultSlot = () =>
    <Card>
        <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
        <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
    </Card>;

export const DynamicSlot = () =>
    <Card>
        <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
        <Box slot="content" style={{ backgroundColor: "purple" }}>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Box>
    </Card>;

export const WrapStringContent = () =>
    <Card>
        Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.
    </Card>;

export const WrapMixedContent = () =>
    <Card>
        Early this morning (Oct. 20), SpaceX lit up the three <TextLink href="#">Raptor engines</TextLink> on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.
    </Card>;

export const UserPropsOnSlottedComponent = () =>
    <Card>
        <Title className="pa2">SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
        <Content className="pa2">Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
    </Card>;


const NoDefaultAndPassThroughCard = ({ children, ...rest }) => {
    const { content } = useSlots(children, useMemo(() => ({
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

export const NoDefaultCard = () =>
    <NoDefaultAndPassThroughCard>
        <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
    </NoDefaultAndPassThroughCard>;

export const SupportFragment = () =>
    <Card>
        <>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </>
    </Card>;

function FunctionalCard({ children, ...rest }) {
    const { content } = useSlots(children, {
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

export const SlotsFunctionalCard = () =>
    <FunctionalCard>
        <Content blue>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
    </FunctionalCard>;

function ConditionalCard({ children, ...rest }) {
    const { content } = useSlots(children, {
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

export const SupportConditionnalSlots = () =>
    <ConditionalCard>
        <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
        <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
    </ConditionalCard>;

DefaultSlot.storyName = "default slot";
DynamicSlot.storyName = "dynamic slot";
WrapStringContent.storyName = "wrap string";
WrapMixedContent.storyName = "wrap mixed";
UserPropsOnSlottedComponent.storyName = "user props";
NoDefaultCard.storyName = "no default";
SupportFragment.storyName = "support fragment";
SlotsFunctionalCard.storyName = "support functional";
SupportConditionnalSlots.storyName = "support conditional";
