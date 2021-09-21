import { Flex } from "@react-components/layout";

export function IconGallery({ children }) {
    return (
        <Flex wrap="wrap">
            {children}
        </Flex>
    );
}
