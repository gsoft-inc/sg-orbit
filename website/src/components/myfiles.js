import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "./image"

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        allFile {
          edges {
            node {
              id
              name
              relativePath
              prettySize
              extension
              birthTime
            }
          }
        }
      }
    `}
    render={data => (
      <header>
        <div className="mw5 mv4">
          <Image></Image>
        </div>
        <h1>Files</h1>
        {data.allFile.edges.map(({ node }, index) => (
          <tr key={index}>
            <td>{node.relativePath}</td>
            <td>{node.prettySize}</td>
            <td>{node.extension}</td>
            <td>{node.birthTime}</td>
          </tr>
        ))}
      </header>
    )}
  />
)
