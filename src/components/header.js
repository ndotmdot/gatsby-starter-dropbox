import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="site-header">
    <div className="container">
      <div className="row">
        <div className="col-6 page-title">
          <div className="mb-1">
            <div className="site-title p">
              {siteTitle}
            </div>
          </div>
          <nav className="p">
            <Link 
              to="/"
              activeClassName="active"
            >
              Projects
            </Link>
            <Link 
              to="/contact"
              activeClassName="active"
            >
              Contact
            </Link>
          </nav>
        </div>

      </div>
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
