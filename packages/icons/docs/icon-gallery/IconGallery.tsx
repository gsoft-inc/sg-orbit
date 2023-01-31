import { Flex, FlexProps } from "@components/layout";

export function IconGallery({ children, ...rest }: FlexProps) {
    return (
        <Flex wrap="wrap" {...rest}>
            {children}
        </Flex>
    );
}
