import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Header from "./header"
import "../css/normalize.css"
import "../css/layout.css"

const Layout = ({ children, title, }) => {
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
      <div className="container grid-overlay">
        <div className="row">
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
          <div className="col-1"><div className="dummy" /></div>
        </div>
      </div>
      <Header siteTitle={siteName} />
      <main>
        {children}
        <footer className="container mt-4">
          <div className="row">
            <div className="col-6">
              <div className="p-small">© {new Date().getFullYear()}, {author}</div>
            </div>
            <div className="col-6">
              <div className="p-small">
                Build with <a href="http://www.gatsby.org">Gatsby</a> and <a href="https://github.com/niklas-may/gatsby-starter-dropbox">Gatsby Starter Dropbox</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
