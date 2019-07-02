import { Link, StaticQuery, graphql } from "gatsby";
import React from "react";

export default () => (
    <StaticQuery
        query={graphql`
            query latestArticlesQuery {
                allMarkdownRemark(limit: 1, sort: { fields: [frontmatter___date], order: DESC }, filter: { fileAbsolutePath: { glob: "**/blog/**/*.md" } }) {
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
                <div className="bg-cloud-50 pa4 mt8">
                    <h1 className="ma0 mb3 pa0">Latest Article</h1>
                    {data.allMarkdownRemark.edges.map(({ node }) => (
                        <div key="node.id">
                            <h3 className="ma0 pa0">{node.frontmatter.title}</h3>
                            <p className="ma0 pa0 mb2 f5">{node.excerpt}</p>
                            <Link to={node.frontmatter.slug} className="no-underline apricot-900">
                                <p className="pa0 ma0 f4">Read More</p>
                            </Link>
                            <Link className="pa0 ma0 mt4 flex no-underline" to="/blog">
                                <p className="f4 pa0 ma0 marine-900">All articles ></p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )}
    />
);
