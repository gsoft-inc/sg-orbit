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
              route
              internal {
                description
              }
              headings {
                value
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <div className="bg-cloud-50 pa4 mt8">
          <h1 className="ma0 mb3 pa0">Latest Doc update</h1>
          {data.allDoczEntries.edges.map(({ node }) => (
            <div key={node.id}>
              <Link className="no-underline marine-400" to={node.route}>
                <h3 className="ma0 pa0">{node.name}</h3>
              </Link>
              <ul className="list ma0 pa0">
                {node.headings.map((item, key) => (
                  <li key={key} className="pa0 pl2  ma0">
                    <Link
                        className="no-underline f5 marine-400"
                        to={`${node.route}#${item.slug}`}
                    >
                        {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
              <p>{node.internal.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  />
)
