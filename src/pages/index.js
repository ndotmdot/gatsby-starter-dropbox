import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const { html: about } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark
  const { group: posts } = data.allDropboxFolder

  return(
    <Layout>
      <section className="container">
        <div className="row">
          <div className="offset-6 col-6 about">
            <div  dangerouslySetInnerHTML={{__html: about}} />
            {
              posts.map(post => {
                const { title, slug } = post.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter
                return  <div className="p" key={title}> <Link to={slug}>{title}</Link></div>
              }
              )
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
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
    allDropboxFolder(filter: {name: {regex: "/Post/"}}) {
      group(field: name) {
        nodes {
          dropboxMarkdown {
            localFile {
              childMarkdownRemark {
                frontmatter {
                  slug
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`