// This is a custom Jest transformer turning svgr imports into mocks.
// http://facebook.github.io/jest/docs/en/webpack.html
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/jest/fileTransform.js

const React = require("react");

module.exports = {
    ReactComponent: React.forwardRef(function(props, ref) {
        return {
            $$typeof: Symbol.for("react.element"),
            type: "svg",
            ref: ref,
            key: null,
            props
        };
    })
};
