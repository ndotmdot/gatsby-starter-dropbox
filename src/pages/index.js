import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"

const projectTeaser = project => {
  const heroImage = project.nodes[0].dropboxImage.filter(item => item.localFile.childImageSharp.fluid.originalName.toLowerCase().includes("hero"))[0]
  const slug = project.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter.Slug_
  const title = project.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter.Title

  return(
    <div className="w-50" key={title}>
      <Link to={slug}>
        <h2>{title}</h2>
        <Image fluid={heroImage} />
      </Link>
    </div>
  )
}

const IndexPage = ({data}) => {
  const { group: projects } = data.allDropboxFolder

  return(
    <Layout title="">
      <section>
        <div className="row">
          {
            projects.map(project => projectTeaser(project))
          }
        </div>
      </section>

    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    allDropboxFolder(filter: {name: {regex: "/Project/"}}) {
      group(field: name) {
        nodes {
          name
          dropboxMarkdown {
            localFile {
              childMarkdownRemark {
                frontmatter {
                  Slug_
                  Title
                }
              }
            }
          }
          dropboxImage {
            localFile {
              childImageSharp {
                fluid {
                  originalName
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`