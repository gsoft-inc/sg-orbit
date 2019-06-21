import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query latestArticlesQuery {
        allMarkdownRemark(
          limit: 1
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { glob: "**/blog/**/*.md" } }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 160)
              html
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                description
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <div className="bg-apricot-50 pa4 mt8">
          <h1 className="ma0 mb3 pa0">Latest Article</h1>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div>
              <h3 className="ma0 pa0">{node.frontmatter.title}</h3>
              <p>{node.excerpt}</p>
              <Link
                to={node.frontmatter.slug}
                className="no-underline apricot-900"
              >
                <p class="pa0 ma0">Read More</p>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/blog">
          <p class="pa4 ma0 apricot-900">All articles</p>
        </Link>
      </div>
    )}
  />
)
