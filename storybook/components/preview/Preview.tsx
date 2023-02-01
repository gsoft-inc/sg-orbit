import "./Preview.css";

import { CodeTheme, useFormattedCode } from "@stories/components";
import { Div, Span } from "@components/html";
import { DocsContext, DocsContextProps, SourceContext, getSourceProps, storyBlockIdFromId } from "@storybook/addon-docs";
import { Editor as JarleEditor, Error as JarleError, Preview as JarlePreview, Provider as JarleProvider } from "jarle";
import { applyHooks, defaultDecorateStory } from "@storybook/client-api";
import { as, isNil } from "@components/shared";
import { storyNameFromExport, toId } from "@storybook/csf";
import { ComponentProps, ReactElement, useContext, useState } from "react";

import { Box } from "@components/box";
import { KnownScope } from "./scopes";


const StyledJarlePreview = as(Box, JarlePreview);
type JarleProviderProps = ComponentProps<typeof JarleProvider>;

interface CodeEditorProps extends JarleProviderProps {
    children: any;
    additionalScope?: any;
}

function CodeEditor({
    code,
    language = "jsx",
    scope: additionalScope = {},
    children,
    ...rest
}: CodeEditorProps) {
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

type DecoratedLivePreviewProps = ComponentProps<typeof StyledJarlePreview>;

function DecoratedLivePreview(props: DecoratedLivePreviewProps): JSX.Element {
    const docsContext = useContext(DocsContext);

    // @ts-ignore
    const storyStore = window.__STORYBOOK_STORY_STORE__;

    const decorators = storyStore.projectAnnotations.decorators;


    if (decorators) {
        // Decorators must be applied otherwise functionnalities like the color schemes switcher won't work.
        const decorateStory = applyHooks(defaultDecorateStory);
        const decoratedStory = decorateStory(() => <StyledJarlePreview {...props} />, decorators)(docsContext as any);

        return decoratedStory as JSX.Element;
    } else {
        return <StyledJarlePreview {...props} />;
    }
}

interface FilePreviewProps extends Pick<ComponentProps<typeof CodeEditor>, "language">, DecoratedLivePreviewProps {
    filePath?: string;
    features?: boolean;
}

function FilePreview({ filePath, language, scope, features = false, ...rest }: FilePreviewProps) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        if (!features) {
            import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/components/src${filePath}.sample.jsx`)
                .then(module => {
                    setCode(module.default);
                });
        } else {
            import(/* webpackMode: "eager" */ `!!raw-loader!@root/docs/features/${filePath}.sample.jsx`)
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
        >
            <DecoratedLivePreview {...rest} />
        </CodeEditor>
    );
}

export interface MdxSourcePreviewProps extends Pick<ComponentProps<typeof CodeEditor>, "language">, DecoratedLivePreviewProps {
    mdxSource?: string;
}

function MdxSourcePreview({ mdxSource, language, scope, ...rest }: MdxSourcePreviewProps) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const { code, language: inferredLanguage } = getSourceProps({ code: decodeURI(mdxSource) }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
            scope={scope}
        >
            <DecoratedLivePreview {...rest} />
        </CodeEditor>
    );
}

function lookupStoryId(storyName: string, { mdxStoryNameToKey, mdxComponentAnnotations }: DocsContextProps) {
    return toId(
        mdxComponentAnnotations.id || mdxComponentAnnotations.title,
        storyNameFromExport(mdxStoryNameToKey[storyName])
    );
}

interface StoryPreviewProps extends Pick<ComponentProps<typeof CodeEditor>, "language">, DecoratedLivePreviewProps {
    children?: ReactElement;
}

function StoryPreview({ language, scope, children, ...rest }: StoryPreviewProps) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const storyId = children.props.id || lookupStoryId(children.props.name, docsContext);

    const { code, language: inferredLanguage } = getSourceProps({ ids: [storyId] }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
            scope={scope}
        >
            <Div id={storyBlockIdFromId(storyId)}>
                <DecoratedLivePreview {...rest} />
            </Div>
        </CodeEditor>
    );
}

export interface PreviewProps {
    filePath?: string;
    language?: string;
    scope?: string;
    features?: boolean;
    mdxSource?: string;
    children?: ReactElement;
}

export function Preview({
    filePath,
    mdxSource,
    language,
    scope,
    children,
    ...rest
}: PreviewProps) {
    if (!isNil(filePath)) {
        return (
            <FilePreview
                {...rest}
                filePath={filePath}
                language={language}
                scope={scope}
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
            />
        );
    }

    return (
        <StoryPreview
            {...rest}
            language={language}
            scope={scope}
        >
            {children}
        </StoryPreview>
    );
}
