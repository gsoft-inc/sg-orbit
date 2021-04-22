import { Box } from "@react-components/box";
import { TextLink } from "@react-components/link";
import { forwardRef, useCallback, useMemo } from "react";
import { isNil, slot, useSlots } from "@react-components/shared";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Slots")
        .segment(segment)
        .build();
}

const Card = forwardRef(({ children, ...rest }, ref) => {
    const { title, content } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        title: {
            className: "bg-red",
            style: {
                color: "white"
            }
        },
        content: {
            style: {
                backgroundColor: "blue",
                color: "white"
            }
        },
        optionnal: null
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

stories()
    .add("default slot", () =>
        <Card>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </Card>
    )
    .add("dynamic slot", () =>
        <Card>
            <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Box slot="content" style={{ backgroundColor: "purple" }}>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Box>
        </Card>
    )
    .add("wrap string content", () =>
        <Card>
            Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.
        </Card>
    )
    .add("wrap mixed content", () =>
        <Card>
            Early this morning (Oct. 20), SpaceX lit up the three <TextLink href="#">Raptor engines</TextLink> on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.
        </Card>
    )
    .add("user props on slotted component", () =>
        <Card>
            <Title className="pa2">SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
            <Content className="pa2">Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
        </Card>
    )
    .add("no default card", () => {
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

        return (
            <NoDefaultAndPassThroughCard>
                <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
            </NoDefaultAndPassThroughCard>
        );
    })
    .add("support fragment", () =>
        <Card>
            <>
                <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
                <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
            </>
        </Card>
    )
    .add("support functional slots", () => {
        function FunctionalCard({ children, ...rest }) {
            const { content } = useSlots(children, {
                title: null,
                content: useCallback(slotElement => {
                    return {
                        className: !isNil(slotElement.props.blue) ? "bg-blue" : "bg-red"
                    };
                }, [])
            });

            return (
                <Box {...rest}>
                    {content}
                </Box>
            );
        }

        return (
            <FunctionalCard>
                <Content blue>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
            </FunctionalCard>
        );
    })
    .add("support conditional slots", () => {
        function ConditionalCard({ children, ...rest }) {
            const { content } = useSlots(children, {
                title: null,
                content: useCallback((slotElement, allSlotElements) => {
                    return {
                        className: !isNil(allSlotElements.title) ? "bg-blue" : "bg-red"
                    };
                }, [])
            });

            return (
                <Box {...rest}>
                    {content}
                </Box>
            );
        }

        return (
            <ConditionalCard>
                <Title>SpaceX fires up 3-engine Starship SN8 prototype ahead of epic test flight</Title>
                <Content>Early this morning (Oct. 20), SpaceX lit up the three Raptor engines on its SN8 ("Serial No. 8") Starship prototype in a brief "static fire" test at the company's South Texas site, near the beachside village of Boca Chica.</Content>
            </ConditionalCard>
        );
    });
