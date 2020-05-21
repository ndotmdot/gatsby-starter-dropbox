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
      <section>
        <div className="row">
          <div className="w-50">
            <Image fluid={heroImage}  />
          </div>
          <div className="w-50">
            <h1>{Title}</h1>
            <div dangerouslySetInnerHTML={{__html: description}} />
            <p>© {Author}</p>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          {
            contentImages.map(image => {
              return(
                <Image 
                  key={image.localFile.childImageSharp.fluid.originalName}
                  fluid={image} 
                />
              )
            })
          }
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

