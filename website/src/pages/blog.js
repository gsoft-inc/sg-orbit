import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import React from "react";

const Blog = ({ data }) => {
    return (
        <Layout>
            <div>
                <span className="flex mb5 f4 marine-800">
                    {data.allMarkdownRemark.totalCount} Article
                    {data.allMarkdownRemark.totalCount > 1 &&
          data.allMarkdownRemark.totalCount !== 0
                        ? "s"
                        : ""}
                </span>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                    <div key={node.id}>
                        <Link to={node.frontmatter.slug} className="no-underline">
                            <h3 className="ma0 mb2 apricot-900">{node.frontmatter.title}</h3>
                            <div className="fw6 marine-900">{node.frontmatter.date}</div>
                            <p className="f6 marine-900">{node.excerpt}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/blog/**/*.md" } }
      sort: { fields: [frontmatter___date], order: DESC }
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
`;

export default Blog;
