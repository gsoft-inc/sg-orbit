import "./Preview.css";

import * as OrbitComponents from "@react-components";
import { CodeTheme, useFormattedCode } from "@stories/components";
import { DocsContext, SourceContext, getSourceProps } from "@storybook/addon-docs/blocks";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { arrayify } from "@react-components/shared";
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

function Editor({ code, language = "jsx", ...rest }) {
    const formattedCoded = useFormattedCode(code, language);

    return (
        <div className="o-ui-sb-preview sbdocs sbdocs-content">
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
                    <LivePreview />
                </div>
                <div className="o-ui-sb-preview-source">
                    <LiveEditor className="o-ui-sb-preview-editor" />
                    <LiveError className="o-ui-sb-preview-error" />
                </div>
            </LiveProvider>
        </div>
    );
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

    return <Editor code={code} language={language} />;
}

function StoryPreview({ language, children }) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const stories = arrayify(children).filter(x => x.props && (x.props.id || x.props.name));

    const { mdxComponentMeta, mdxStoryNameToKey } = docsContext;

    const targetIds = stories.map(x =>
        x.props.id || toId(
            mdxComponentMeta.id || mdxComponentMeta.title,
            storyNameFromExport(mdxStoryNameToKey[x.props.name])
        )
    );

    const { code, language: inferredLanguage } = getSourceProps({ ids: targetIds }, docsContext, sourceContext);

    return <Editor code={code} language={language ?? inferredLanguage} />;
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
