import { ReactNode, Component } from "react";

// React logs errors to the console when an error is thrown, even when a boundary exists. Silence it temporarily.
// https://github.com/facebook/react/issues/15520
function muteConsoleErrors(patterns: string[]) {
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

function throwOnConsoleLogs() {
    console.error = message => {
        throw message instanceof Error ? message : new Error(message);
    };

    console.warn = message => {
        throw message instanceof Error ? message : new Error(message);
    };
}


interface ErrorBoundaryProps {
    onError: (error: Error) => void;
    children?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error: Error) {
        const { onError } = this.props;

        onError(error);
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return null;
        }

        const { children } = this.props;

        return children;
    }
}

export { muteConsoleErrors, ErrorBoundary, throwOnConsoleLogs };
