import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Project = ({data}) => {

  const content = data.allDropboxFolder.group[0].nodes[0]
  console.log("Project -> content", content)

  const {Titel, Author } = content.dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter
  
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{Titel}</h1>
    </Layout>
  )
}

export default Project

export const query = graphql`
  query ProjectPageQuery($name: String) {
    allDropboxFolder(filter: {name: {eq: $name}}) {
      group(field: name) {
        nodes {
          dropboxImage {
            localFile {
              childImageSharp {
                fluid {
                  originalName
                }
              }
            }
          }
          dropboxMarkdown {
            localFile {
              childMarkdownRemark {
                frontmatter {
                  Author
                  Slug_
                  Titel
                }
                html
              }
            }
          }
        }
      }
    }
  }
`

