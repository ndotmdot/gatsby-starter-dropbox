import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"

const projectTeaser = project => {
  const heroImage = project.nodes[0].dropboxImage.filter(item => item.localFile.childImageSharp.fluid.originalName.toLowerCase().includes("hero"))[0]
  const slug = project.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter.Slug_
  const title = project.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter.Title

  return(
    <div className="col-7 project-teaser mb-1" key={title}>
      <Link to={slug}>
        <header className="mb-1">
          <h2>{title}</h2>
          <div className="p arrow">→</div>
        </header>
        <div className="image">
          <Image fluid={heroImage} />
        </div>
      </Link>
    </div>
  )
}

const IndexPage = ({data}) => {
  const { group: projects } = data.allDropboxFolder
  const { html: about } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark

  return(
    <Layout>
      <section className="container">
        <div className="row">
          <div className="offset-6 col-6 mt-2 mb-4 about" dangerouslySetInnerHTML={{__html: about}} />
        </div>
        <div className="row offset-2">
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
    allDropboxMarkdown(filter: {name: {eq: "About.md"}}) {
      nodes {
        localFile {
          name
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`