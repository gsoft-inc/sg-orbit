import "./Preview.css";

import { CodeTheme, useFormattedCode } from "@stories/components";
import { Div, Span } from "@components/html";
import { DocsContext, SourceContext, getSourceProps, storyBlockIdFromId } from "@storybook/addon-docs";
import { Editor as JarleEditor, Error as JarleError, Preview as JarlePreview, Provider as JarleProvider } from "jarle";
import { applyHooks, defaultDecorateStory } from "@storybook/client-api";
import { as, isNil } from "@components/shared";
import { bool, object, string } from "prop-types";
import { storyNameFromExport, toId } from "@storybook/csf";
import { useContext, useState } from "react";

import { Box } from "@components/box";
import { KnownScope } from "./scopes";

const propTypes = {
    filePath: string,
    language: string,
    scope: object,
    features: bool
};

const StyledJarlePreview = as(Box, JarlePreview);

function CodeEditor({
    code,
    language = "jsx",
    scope: additionalScope = {},
    children,
    ...rest
}) {
    const formattedCoded = useFormattedCode(code, language);

    return (
        <Div className="o-ui-sb-preview sbdocs sbdocs-preview">
            <JarleProvider
                code={formattedCoded}
                language={language}
                theme={CodeTheme}
                scope={{
                    ...KnownScope,
                    ...additionalScope
                }}
                showImports={false}
                {...rest}
            >
                <Div className="o-ui-sb-preview-story docs-story">
                    {children}
                </Div>
                <Div className="o-ui-sb-preview-source">
                    <Span className="o-ui-sb-preview-editable-label">Editable example</Span>
                    <JarleEditor className="o-ui-sb-preview-editor" />
                    <JarleError className="o-ui-sb-preview-error" />
                </Div>
            </JarleProvider>
        </Div>
    );
}

function DecoratedLivePreview({ ...rest }) {
    const docsContext = useContext(DocsContext);

    const storyStore = window.__STORYBOOK_STORY_STORE__;

    const decorators = storyStore.projectAnnotations.decorators;

    // Decorators must be applied otherwise functionnalities like the color schemes switcher won't work.
    const decorateStory = applyHooks(defaultDecorateStory);

    return decorators
        ? decorateStory(() => <StyledJarlePreview {...rest} />, decorators)(docsContext)
        : <StyledJarlePreview {...rest} />;
}

function FilePreview({ filePath, language, scope, features = false, noInline, ...rest }) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        if (!features) {
            import(/* webpackMode: "eager" */ `@root/packages/components/src${filePath}.sample.jsx?raw`)
                .then(module => {
                    setCode(module.default);
                });
        } else {
            import(/* webpackMode: "eager" */ `@root/docs/features/${filePath}.sample.jsx?raw`)
                .then(module => {
                    setCode(module.default);
                });
        }

        return null;
    }

    return (
        <CodeEditor
            code={code}
            language={language}
            scope={scope}
            noInline={noInline}
        >
            <DecoratedLivePreview {...rest} />
        </CodeEditor>
    );
}

function MdxSourcePreview({ mdxSource, language, scope, noInline, ...rest }) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const { code, language: inferredLanguage } = getSourceProps({ code: decodeURI(mdxSource) }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
            scope={scope}
            noInline={noInline}
        >
            <DecoratedLivePreview {...rest} />
        </CodeEditor>
    );
}

function lookupStoryId(storyName, { mdxStoryNameToKey, mdxComponentAnnotations }) {
    return toId(
        mdxComponentAnnotations.id || mdxComponentAnnotations.title,
        storyNameFromExport(mdxStoryNameToKey[storyName])
    );
}

function StoryPreview({ language, scope, noInline, children, ...rest }) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const storyId = children.props.id || lookupStoryId(children.props.name, docsContext);

    const { code, language: inferredLanguage } = getSourceProps({ ids: [storyId] }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
            scope={scope}
            noInline={noInline}
        >
            <Div id={storyBlockIdFromId(storyId)}>
                <DecoratedLivePreview {...rest} />
            </Div>
        </CodeEditor>
    );
}

export function Preview({
    filePath,
    mdxSource,
    language,
    scope,
    noInline,
    children,
    ...rest
}) {
    if (!isNil(filePath)) {
        return (
            <FilePreview
                {...rest}
                filePath={filePath}
                language={language}
                scope={scope}
                noInline={noInline}
            />
        );
    }

    if (!isNil(mdxSource)) {
        return (
            <MdxSourcePreview
                {...rest}
                mdxSource={mdxSource}
                language={language}
                scope={scope}
                noInline={noInline}
            />
        );
    }

    return (
        <StoryPreview
            {...rest}
            language={language}
            scope={scope}
            noInline={noInline}
        >
            {children}
        </StoryPreview>
    );
}

Preview.propTypes = propTypes;
