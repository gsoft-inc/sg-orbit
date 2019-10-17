import { Component } from "react";
import { isNil } from "lodash";

/**
 * Custom stories container that also act as a custom ErrorBoundary because there is some errors that are not handled by the Storybook default error boundary.
 */
export class StoryContainer extends Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    componentDidCatch(error, info) {
        this.setState({
            error,
            errorInfo: info
        });

        console.error(error, info);
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }

    renderStory() {
        const { story, context } = this.props;
        const { parameters } = context;
        const { layout } = parameters;

        const params = (new URL(document.location)).searchParams;
        const isDocs = params.get("viewMode") === "docs";

        if (isDocs) {
            return story;
        }

        return (
            <div className="fixed top-0 left-0 right-0 mt10 flex items-center">
                <div className="center" style={layout}>
                    {story}
                </div>
            </div>
        );
    }

    renderError() {
        const { error, errorInfo } = this.state;

        return (
            <div className="fixed top-0 left-0 right-0 h-100 w-100 pl10 pt10 bg-alert-700 white">
                <h1 className="f3">Something went wrong</h1>
                <If condition={!isNil(error)}>
                    <pre className="f6">{ error.stack }</pre>
                </If>
                <If condition={!isNil(errorInfo)}>
                    <pre className="f6">
                        Stack: { errorInfo.componentStack }
                    </pre>
                </If>
            </div>
        );
    }

    render() {
        const { hasError } = this.state;

        if (hasError) {
            return this.renderError();
        }

        return this.renderStory();
    }
}
