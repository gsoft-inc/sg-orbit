export default {
  title: "ShareGate Components",
  base: "docs",
  ignore: ["**/blog/**", "**/components/**", "readme.md"],
  menu: ["Introduction", "Atoms", "Components"],
  description: "This is my awesome documentation",
  codeSandbox: false,
  linesToScrollEditor: 16,
  themeConfig: {
    radii: "4px",
    colors: {
      primary: `#566077`,
    },
    styles: {
      h1: `
        font-size: 72px;
        margin-bottom: 16px;
        `,
      h2: `
        font-size: 24px;
        margin-bottom: 16px;
        margin-top: 24px;
        `,
      paragraph: `
        font-size: 20px;
        margin-bottom: 24px;
        `,
    },
  },
}
