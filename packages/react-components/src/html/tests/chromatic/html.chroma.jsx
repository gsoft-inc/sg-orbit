import { A } from "@react-components/html";
import { StyleProvider } from "@react-components/shared";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Html")
        .segment(segment)
        .parameters(paramsBuilder()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <A href="#">Google</A>
    )
    .add("support style context", () => {
        const StyledAnchor = ({ children }) => {
            return (
                <StyleProvider
                    value={{
                        "html-a": {
                            color: "red"
                        }
                    }}
                >
                    <A href="#">{children}</A>
                </StyleProvider>
            );
        };

        return (
            <StyledAnchor>Google</StyledAnchor>
        );
    });
