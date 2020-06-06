import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle, nav }) => (
  <header className="site-header">
    <div className="container">
      <div className="row">
        <div className="col-7 col-s-12 mb-2">
          <Link to="/" className="site-title p">
            {siteTitle}
          </Link>
        </div>
        {
          nav &&
          <div className="col-9 s-none">
            <div className="site-nav p">
              <Link to="/" className="a-internal">
                Home
              </Link>
            </div>
          </div>
        }
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  nav: PropTypes.bool,
}

Header.defaultProps = {
  siteTitle: ``,
  nav: false
}

export default Header
