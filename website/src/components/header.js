import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
    <header
        style={{
            background: `var(--marine-500)`,
            marginBottom: `1.45rem`,
        }}
    >
        <div
            className="flex"
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h1 style={{ margin: 0 }}>
                <Link
                    className="mr4"
                    to="/"
                    style={{
                        color: `white`,
                        textDecoration: `none`,
                    }}
                >
                    {siteTitle}
                </Link>
                <div>
                    <Link to="/blog" className="no-underline">
                        <span className="hover-cloud-200 white f7">Blog</span>
                    </Link>
                    <Link to="/docs" className="no-underline ml4">
                        <span className="hover-cloud-200 white f7 no-underline">Docs</span>
                    </Link>
                </div>
            </h1>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
