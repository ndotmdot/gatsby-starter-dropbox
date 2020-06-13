import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle, nav }) => {
  return (
    <header className="site-header container">
      <div className="row">
        <div className="col-7 col-s-12 mb-2">
          <Link to="/" className="site-title p">
            {siteTitle}
          </Link>
        </div>
        <div className="col-8 s-none">
          {nav &&
            <div className="site-nav p">
              <Link to="/" className="a-internal">
                Home
              </Link>
            </div>
          }
        </div>
        <a 
          className="github-icon" 
          href="https://github.com/niklas-may/gatsby-starter-dropbox" 
          target="_blank" rel="noopener noreferrer"
        >
          <svg viewBox="0 0 44 44"  xmlns="http://www.w3.org/2000/svg"><path d="M21.998 0C9.851 0 0 9.87 0 22.045c0 9.738 6.303 18.001 15.045 20.917 1.101.202 1.502-.479 1.502-1.063 0-.524-.019-1.91-.03-3.749-6.119 1.332-7.41-2.955-7.41-2.955-1-2.547-2.443-3.225-2.443-3.225-1.998-1.367.15-1.34.15-1.34 2.21.156 3.37 2.272 3.37 2.272 1.963 3.368 5.15 2.395 6.404 1.831.2-1.424.768-2.395 1.396-2.946-4.885-.558-10.021-2.448-10.021-10.895 0-2.408.858-4.374 2.265-5.915-.227-.558-.982-2.799.216-5.834 0 0 1.846-.593 6.05 2.258 1.753-.488 3.636-.732 5.507-.741 1.869.01 3.75.253 5.507.741 4.2-2.851 6.044-2.258 6.044-2.258 1.2 3.035.446 5.276.22 5.834 1.41 1.541 2.261 3.507 2.261 5.915 0 8.469-5.144 10.332-10.044 10.877.789.681 1.492 2.026 1.492 4.083 0 2.946-.027 5.324-.027 6.047 0 .59.397 1.276 1.513 1.06C37.702 40.039 44 31.783 44 22.046 44 9.869 34.149 0 21.998 0" /></svg>
        </a>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  nav: PropTypes.bool,
}

Header.defaultProps = {
  siteTitle: ``,
  nav: false
}

export default Header
