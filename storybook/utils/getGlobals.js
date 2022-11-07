/**
 * The following function might not work on storybook@7.0.0
 * 
 * If it still works, remove this comment.
 * 
 * See https://github.com/storybookjs/storybook/issues/18477#issuecomment-1198852168
 * @param { import("@storybook/react").StoryContext | import("@storybook/addon-docs").DocsContextProps } context
 * @returns { Record<string, string> }
 */
export function getGlobals(context) {
    // If it's a DocsContextProps, we have to do this to get up-to-date globals
    // from the StoryContext.
    if (context.storyById && context.getStoryContext) {
        const story = context.storyById(context.id);
        const storyContext = context.getStoryContext(story);

        return storyContext.globals;
    }


    // If it's a StoryContext, the context already has the up-to-date globals.
    return context.globals;
}