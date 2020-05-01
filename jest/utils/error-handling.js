const React = require("react");

// React logs errors to the console when an error is thrown, even when a boundary exists. Silence it temporarily.
// https://github.com/facebook/react/issues/15520
function muteConsoleErrors(patterns) {
    const nativeConsoleError = console.error.bind(console);

    console.error = message => {
        if (!patterns.some(x => message.includes(x))) {
            nativeConsoleError(message);
        }
    };

    return () => {
        console.error = nativeConsoleError;
    };
}

class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
        const { onError } = this.props;

        onError(error);
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

module.exports = {
    muteConsoleErrors,
    ErrorBoundary
};
