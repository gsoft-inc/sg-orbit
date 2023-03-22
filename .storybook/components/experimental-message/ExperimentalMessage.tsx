import { Message, MessageProps } from "@components/message";
import { Content } from "@components/placeholders";
import { Heading, Text } from "@components/typography";

interface ExperimentalMessageProps extends MessageProps{
    noDoc?: boolean;
    noTests?: boolean;
    noVisualTesting?: boolean;
    noFinalDesign?: boolean;
    noMobileSupport?: boolean;
}

export function ExperimentalMessage({ noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport, ...rest }: ExperimentalMessageProps) {
    const hasDetails = [noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport].some(validation => validation);

    return (
        <Message variant="negative" fontSize={4} {...rest}>
            <Content>
                <Heading>Experimental</Heading>
                <Text size="lg">
                    This component and its documentation is in development. There could be breaking changes made to it in a non-major release. Please use with caution
                    {hasDetails && <ul>
                        {noDoc && <li>Documentation is missing</li>}
	@@ -26,8 +14,7 @@ export function ExperimentalMessage({ noDoc, noTests, noVisualTesting, noFinalDe
                        {noFinalDesign && <li>The Design is not final</li>}
                        {noMobileSupport && <li>Mobile support is missing</li>}
                    </ul>}
                </Text>
            </Content>
        </Message>
    );
}
