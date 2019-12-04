import { animated, useSpring } from "react-spring";
import { any, bool } from "prop-types";

// Since the popup is not currently based on hooks, the animation must be in an external component.
export const FadeIn = ({ active, children, styles }) => {
    const AnimatedComponent = animated["div"];

    const transition = useSpring({
        opacity: active ? 1 : 0,
        display: active ? "block" : "none",
        ...styles
    });

    return (
        <AnimatedComponent style={transition}>
            {children}
        </AnimatedComponent>
    );
};

FadeIn.propTypes = {
    active: bool.isRequired,
    children: any.isRequired
};
