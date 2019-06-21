import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import React from "react"

const Blog = ({ data }) => {
  return (
    <Layout>
      <div>
        {data.allMarkdownRemark.totalCount} Article
        {data.allMarkdownRemark.totalCount > 1 &&
        data.allMarkdownRemark.totalCount !== 0
          ? "s"
          : ""}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.frontmatter.slug}>
              <h3>{node.frontmatter.title}</h3>
              <div>{node.frontmatter.date}</div>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/blog/**/*.md" } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            slug
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default Blog
