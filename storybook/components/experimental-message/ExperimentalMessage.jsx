import { Message } from "@components/message";
import { Content } from "@components/placeholders";
import { Heading, Text } from "@components/typography";

export function ExperimentalMessage({ noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport, ...rest }) {
    const hasDetails = [noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport].some(validation => validation);

    return (
        <Message variant="negative" fontSize={4} {...rest}>
            <Content>
                <Heading>Experimental</Heading>
                <Text size="lg">
                    This component and its documentation is in development. There could be breaking changes made to it in a non-major release. Please use with caution
                    {hasDetails && <ul>
                        {noDoc && <li>Documentation is missing</li>}
                        {noTests && <li>Tests are missing</li>}
                        {noVisualTesting && <li>Visual testing is missing</li>}
                        {noFinalDesign && <li>The Design is not final</li>}
                        {noMobileSupport && <li>Mobile support is missing</li>}
                    </ul>}
                </Text>
            </Content>
        </Message>
    );
}
