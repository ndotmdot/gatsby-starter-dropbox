import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Header from "./header"
import "../css/normalize.css"
import "../css/layout.css"

const Layout = ({ children, title, nav, className }) => {
  const data = useStaticQuery(graphql`
    {
      allSite {
        nodes {
          siteMetadata {
            description
            keywords
            author
            siteName
          }
        }
      }
    }
  `)

  const {
    siteName,
    keywords,
    description,
    author,
  } = data.allSite.nodes[0].siteMetadata


  return (
    <div className="main-wrapper">
      <SEO
        title={title}
        siteName={siteName}
        keywords={keywords}
        description={description}
        author={author}
        lang="en"
      />
      <main className={className} >
        <Header siteTitle={siteName} nav={nav} />
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
