import { storiesOfBuilder } from "@stories/utils";
import { useStyledSystem } from "@react-components/shared";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/useStyledSystem")
        .segment(segment)
        .build();
}

const Box = props => {
    const { className, style } = useStyledSystem(props);

    return (
        <div
            className={className}
            style={style}
        >
            Hey hey!
        </div>
    );
};

stories()
    .add("default", () =>
        <Box backgroundColor="sunray-3" />
    );
