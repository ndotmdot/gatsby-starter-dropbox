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
      allDropboxMarkdown(filter: {name: {eq: "Metadata.md"}}) {
        nodes {
          localFile {
            name
            childMarkdownRemark {
              frontmatter {
                Site_Name
                Keywords
                Description
                Author
                Language
              }
            }
          }
        }
      }
    }
  `)

  const {
    Site_Name,
    Keywords,
    Description,
    Author,
    Language
  } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark.frontmatter


  return (
    <div className="main-wrapper">
      <SEO
        title={title}
        siteName={Site_Name}
        keywords={Keywords}
        description={Description}
        author={Author}
        lang={Language}
      />
      <Header siteTitle={Site_Name} />
      <main>
        {children}
        <footer className="container mt-4">
          <div className="row">
            <div className="col-6">
              <div className="p-small">© {new Date().getFullYear()}, {Author}</div>
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
