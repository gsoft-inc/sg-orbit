const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-blog-post-js": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\src\\templates\\blog-post.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\src\\pages\\404.js"))),
  "component---src-pages-blog-js": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\src\\pages\\blog.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\src\\pages\\index.js"))),
  "component---src-pages-news-js": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\src\\pages\\news.js"))),
  "component---docs-colours-mdx": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\docs\\colours.mdx"))),
  "component---docs-index-mdx": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\docs\\index.mdx"))),
  "component---docs-button-mdx": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\docs\\button.mdx"))),
  "component---docs-dropdown-mdx": hot(preferDefault(require("C:\\Dev\\20_gsoft\\sg-brand\\website\\docs\\dropdown.mdx")))
}

