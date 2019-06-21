import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query latestDocQuery {
        allDoczEntries(limit: 1) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <div className="bg-apricot-50 pa4 mt8">
          <h1 className="ma0 mb3 pa0">Last Doc update</h1>
          {data.allDoczEntries.edges.map(({ node }) => (
            <div>
              <h3 className="ma0 pa0">{node.frontmatter.title}</h3>
              <p>{node.id}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  />
)
