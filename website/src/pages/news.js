import { Link } from "gatsby";
import Files from "src/components/myfiles";
import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = () => {
    return (
        <Layout>
            <SEO title="News" />
            <p>News</p>
            <Files></Files>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default SecondPage;
