import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Post = ({data}) => {
  console.log("Post -> data", data)
  const { frontmatter, html } = data.allDropboxFolder.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark
  // console.log("Post -> content", content)
  const { title } = frontmatter

  return (
    <Layout title={title}>
      <section className="container">
        <div class="row">
          <div className="offset-6 col-6 mb-4">
            <header className="mb-1">
              <h1>{title}</h1>
            </header>
            <div dangerouslySetInnerHTML={{__html: html}} />
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

