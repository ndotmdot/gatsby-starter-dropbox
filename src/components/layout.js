/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Header from "./header"
import "./layout.css"

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
    <>
      <SEO
        title={title}
        siteName={Site_Name}
        keywords={Keywords}
        description={Description}
        author={Author}
        lang={Language}
      />
      <Header siteTitle={Site_Name} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
