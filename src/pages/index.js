import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const { html: about } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark
  const { title } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark.frontmatter
  const { group: posts } = data.allDropboxFolder

  return(
    <Layout className="home-template">
      <section className="container">
        <div className="row">
          <div className="offset-7 offset-s-0 col-8 col-s-15 about">
            <div dangerouslySetInnerHTML={{__html: about}} />
          </div>
        </div>
        <div className="row pt-2 pb-4">
          <div className="col-4 col-s-16 offset-3 offset-s-0 mb-2">
            <p>Learn more:</p>
          </div>
          <div className="col-9 col-s-16">
            {
              posts.map(post => {
                const { title, slug } = post.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter
                return  <div className="d-block"><Link to={slug} key={slug} className="p a-internal">{title}</Link></div>
              }
              )
            }
          </div>
        </div>
      </section>
      <section className="home-title">
        <div className="container">
          <div className="row pt-x">
            <div className="col-15">
              <h1 className="text-large">{title}</h1>
            </div>
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
            frontmatter {
              title
            }
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