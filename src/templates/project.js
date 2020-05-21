import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"

const Project = ({data}) => {
  const content = data.allDropboxFolder.group[0].nodes[0]

  const {Title, Author } = content.dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter;
  const { html: description } = content.dropboxMarkdown[0].localFile.childMarkdownRemark;
  const heroImage = content.dropboxImage.filter(item => item.localFile.childImageSharp.fluid.originalName.toLowerCase().includes("hero"))[0]
  const contentImages = content.dropboxImage.filter(item => item.localFile.childImageSharp.fluid.originalName.toLowerCase().includes("content"))

  return (
    <Layout title={Title}>
      <section className="container">
        <div class="row">
          <div className="offset-6 col-6 mb-4">
            <header className="mb-1">
              <h1>{Title}</h1>
            </header>
            <div dangerouslySetInnerHTML={{__html: description}} />
          </div>
        </div>
        <div className="row">
          <div className="col-14 offset-2">
            <Image fluid={heroImage}  />
            {
            contentImages.map(image => {
              return(
                <Image 
                  key={image.localFile.childImageSharp.fluid.originalName}
                  fluid={image} 
                  className="mb-1"
                />
              )
            })
          }
          </div>
        </div>
      </section>      
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
                  ...GatsbyImageSharpFluid
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
                  Title
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

