import React from "react";

import LatestBlogPost from "../components/latest-blog-post";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <h1>Hi GPeople</h1>
        <p className="f4 ma0 pa0">Welcome to your new Gatsby site.</p>
        <p className="f4 ma0 pa0">Now go build something f*cking great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
        <LatestBlogPost />
    </Layout>
);

export default IndexPage;
