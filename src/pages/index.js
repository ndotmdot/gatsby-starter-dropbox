import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const { html: about } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark
  const { title } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark.frontmatter
  const { group: posts } = data.allDropboxFolder

  const renderMore = () => (
    <>
      <div className="my-2">
        <p>Learn more:</p>
      </div>
      {
        posts.map(post => {
          const { title, slug } = post.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter
          return  <Link to={slug} key={slug} className="p a-internal">{title}</Link>
        }
        )
      }
    </>
  )

  return(
    <Layout className="home-template">
      <section className="container nav-offset">
        <div className="row pb-4">
          <div className="offset-6 offset-s-0 col-8 col-s-14 about">
            <div  dangerouslySetInnerHTML={{__html: about}} />
            <div className="s-none">
              {renderMore()}
            </div>
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