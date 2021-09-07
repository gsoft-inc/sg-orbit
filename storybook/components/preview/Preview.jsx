import "./Preview.css";

import { Box } from "@react-components/box";
import { CodeTheme, useFormattedCode } from "@stories/components";
import { Div, Span } from "@react-components/html";
import { DocsContext, SourceContext, getSourceProps, storyBlockIdFromId } from "@storybook/addon-docs";
import { Editor as JarleEditor, Error as JarleError, Preview as JarlePreview, Provider as JarleProvider } from "jarle";
import { KnownScope } from "./scopes";
import { applyHooks, defaultDecorateStory } from "@storybook/client-api";
import { as, isNil } from "@react-components/shared";
import { object, string } from "prop-types";
import { storyNameFromExport, toId } from "@storybook/csf";
import { useContext, useState } from "react";

const propTypes = {
    filePath: string,
    language: string,
    scope: object
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

    const decorators = docsContext.storyStore._globalMetadata.decorators;

    // "applyHooks" is required otherwise we get: "Error: Storybook preview hooks can only be called inside decorators and story functions."
    // it is because decorators contains a few decorators which are not compatible with how this preview block works.
    // Removing these decorators, when possible should do the trick.
    const decorateStory = applyHooks(defaultDecorateStory);

    return decorators
        ? decorateStory(() => <StyledJarlePreview {...rest} />, decorators)(docsContext)
        : <StyledJarlePreview {...rest} />;
}

function FilePreview({ filePath, language, scope, noInline, ...rest }) {
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

function lookupStoryId(storyName, { mdxStoryNameToKey, mdxComponentMeta }) {
    return toId(
        mdxComponentMeta.id || mdxComponentMeta.title,
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
