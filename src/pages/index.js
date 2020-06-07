import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const { html: about } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark
  const { title } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark.frontmatter
  const { group: posts } = data.allDropboxFolder

  const renderMore = () => (
    <>
      <div className="col-3 offset-3">
        <p>Learn more:</p>
      </div>
      <div className="col-10">
        {
          posts.map(post => {
            const { title, slug } = post.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter
            return  <div className="d-block"><Link to={slug} key={slug} className="p a-internal">{title}</Link></div>
          }
          )
        }
      </div>
    </>
  )

  return(
    <Layout className="home-template">
      <section className="container nav-offset">
        <div className="row">
          <div className="offset-6 offset-s-0 col-8 col-s-14 about">
            <div  dangerouslySetInnerHTML={{__html: about}} />
          </div>
        </div>
        <div className="row pt-2 pb-4">
          {renderMore()}
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
      <section className="mobile-articles">
        {renderMore()}
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