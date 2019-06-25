export const imports = {
  'docs/button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-button" */ 'docs/button.mdx'
    ),
  'docs/colours.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-colours" */ 'docs/colours.mdx'
    ),
  'docs/dropdown.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-dropdown" */ 'docs/dropdown.mdx'
    ),
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
}
