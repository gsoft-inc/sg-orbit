import "./Preview.css";

import * as OrbitComponents from "@react-components";
import { CodeTheme, useFormattedCode } from "@stories/components";
import { DocsContext, SourceContext, getSourceProps, storyBlockIdFromId } from "@storybook/addon-docs/blocks";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { defaultDecorateStory } from "@storybook/client-api";
import { isNil } from "lodash";
import { storyNameFromExport, toId } from "@storybook/csf";
import { string } from "prop-types";
import { useCallback, useContext, useDebugValue, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";

const propTypes = {
    filePath: string,
    language: string
};

const ReactHooks = {
    useState,
    useEffect,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
    useDebugValue
};

function CodeEditor({
    code,
    language = "jsx",
    children,
    ...rest
}) {
    const formattedCoded = useFormattedCode(code, language);

    return (
        <div className="o-ui-sb-preview sbdocs sbdocs-preview">
            <LiveProvider
                code={formattedCoded}
                language={language}
                theme={CodeTheme}
                scope={{
                    ...OrbitComponents,
                    ...ReactHooks
                }}
                {...rest}
            >
                <div className="o-ui-sb-preview-story docs-story">
                    {children}
                </div>
                <div className="o-ui-sb-preview-source">
                    <LiveEditor className="o-ui-sb-preview-editor" />
                    <LiveError className="o-ui-sb-preview-error" />
                </div>
            </LiveProvider>
        </div>
    );
}

function DecoratedLivePreview() {
    const docsContext = useContext(DocsContext);

    const decorators = docsContext.storyStore._globalMetadata.decorators;

    return decorators
        ? defaultDecorateStory(() => <LivePreview />, decorators)(docsContext)
        : <LivePreview />;
}

function FilePreview({ filePath, language = "javascript" }) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setCode(module.default);
            });

        return null;
    }

    return (
        <CodeEditor
            code={code}
            language={language}
        >
            <DecoratedLivePreview />
        </CodeEditor>
    );
}

function lookupStoryId(storyName, { mdxStoryNameToKey, mdxComponentMeta }) {
    return toId(
        mdxComponentMeta.id || mdxComponentMeta.title,
        storyNameFromExport(mdxStoryNameToKey[storyName])
    );
}

function StoryPreview({ language, children }) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const storyId = children.props.id || lookupStoryId(children.props.name, docsContext);

    const { code, language: inferredLanguage } = getSourceProps({ ids: [storyId] }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
        >
            <div id={storyBlockIdFromId(storyId)}>
                <DecoratedLivePreview />
            </div>
        </CodeEditor>
    );
}

export function Preview({ filePath, language, children }) {
    if (!isNil(filePath)) {
        return <FilePreview filePath={filePath} language={language} />;
    }

    return (
        <StoryPreview language={language}>
            {children}
        </StoryPreview>
    );
}

Preview.propTypes = propTypes;
