import { animated, useSpring } from "react-spring";
import { any, bool, string } from "prop-types";
import { isUndefined } from "lodash";

// Since the DateRangePicker is currently not based on hooks, the animation must be developed in an external component.
export const FadeIn = ({ active, elementType, children, className }) => {
    const AnimatedComponent = animated[elementType];

    if (isUndefined(AnimatedComponent)) {
        throw new Error(`SlideInTop - elementType ${elementType} is invalid`);
    }

    const transition = useSpring({
        opacity: active ? 1 : 0,
        display: active ? "block" : "none"
    });

    return (
        <AnimatedComponent style={transition} className={className}>
            {children}
        </AnimatedComponent>
    );
};

FadeIn.propTypes = {
    active: bool.isRequired,
    elementType: string,
    children: any.isRequired
};

FadeIn.defaultProps = {
    elementType: "div"
};
