/* eslint-disable react/forbid-foreign-prop-types */

import { MessageButton } from "./button";
import { MessageContext } from "./context";
import { MessageIcon } from "./icon";
import { Ref, Message as SemanticMessage } from "semantic-ui-react";
import { bool, func, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large", "big"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["as", "attached", "color", "content", "header", "icon", "list"];

const propTypes = {
    columns: bool,
    /**
     * A message can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    columns: false,
    size: DEFAULT_SIZE
};

export function PureMessage(props) {
    const { columns, size, children, className, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderMessage()}
            </Ref>
        );
    };

    const renderMessage = () => {
        const classes = mergeClasses(
            columns && "with-columns",
            className
        );

        return (
            <MessageContext.Provider value={{ size: size }}>
                <SemanticMessage
                    size={size}
                    className={classes}
                    {...rest}
                >
                    {children}
                </SemanticMessage>
            </MessageContext.Provider>
        );
    };

    return isNil(forwardedRef) ? renderMessage() : renderWithRef();
}

PureMessage.propTypes = propTypes;
PureMessage.defaultProps = defaultProps;

export const Message = forwardRef((props, ref) => (
    <PureMessage { ...props } forwardedRef={ref} />
));

[PureMessage, Message].forEach(x => {
    x.Icon = MessageIcon;
    x.Button = MessageButton;
    x.Content = SemanticMessage.Content;
    x.Header = SemanticMessage.Header;
    x.Item = SemanticMessage.Item;
    x.List = SemanticMessage.List;
});

if (!isNil(SemanticMessage.propTypes)) {
    SemanticMessage.propTypes.size = oneOf(SIZES);
}
