import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import RelatedSection from "../components/relatedSection"

const Post = ({data, pageContext}) => {
  const { id } = pageContext
  const { frontmatter, html } = data.allDropboxFolder.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark
  const { title } = frontmatter

  return (
    <Layout title={title} nav={true} className="post-template" >
      <section className="post-content container mt-16 mb-8">
        <div class="row">
          <header className="col-14 col-s-16 mb-8">
            <h1 className="text-large" >{title}</h1>
          </header>
          <div className="col-13 col-s-16 offset-3 offset-s-0" >
            <div className="post" dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>
      </section>
      <RelatedSection currentPostId={id} />
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

