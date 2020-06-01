import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Post = ({data}) => {
  const { frontmatter, html } = data.allDropboxFolder.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark
  const { title } = frontmatter

  return (
    <Layout title={title}>
      <section className="container post-template mt-16">
        <div class="row">
          <div className="">
            <header className="mb-8">
              <h1>{title}</h1>
            </header>
            <div className="col-13 offset-3" >
              <div className="post" dangerouslySetInnerHTML={{__html: html}} />
            </div>
          </div>
        </div>
      </section>      
    </Layout>
  )
}

export default Post

export const query = graphql`
  query PostPageQuery($id: String) {
    allDropboxFolder(filter: {id: {eq: $id}}) {
      nodes {
        dropboxMarkdown {
          localFile {
            childMarkdownRemark {
              frontmatter {
                slug
                title
              }
              html
            }
          }
        }
      }
    }
  }
`

