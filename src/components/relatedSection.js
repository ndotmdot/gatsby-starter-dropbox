import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const RelatedSection = ({currentPostId}) => {
  const data = useStaticQuery(graphql`
    {
      allPosts: allDropboxFolder(filter: {name: {regex: "/Post/"}}) {
        nodes {
          id
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
  `)

  const relatedPosts = data.allPosts.nodes.filter(node => node.id !== currentPostId)

  return (
    <section className="related container pb-1 pt-1 pt-s-2">
      <div className="row pb-16 pb-s-1">
        <div className="col-9">
          <h2 className="text-large" >More</h2>
        </div>
      </div>
      <div className="row">
      <div className="col-7 col-s-16 pb-s-8 link-list">
          {
            relatedPosts.map(post => {
              const {slug, title } = post.dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter
              return (
                <Link to={slug} key={slug} className="text-medium a-internal">
                  {title}
                </Link>
              )
            })
          }
        </div>
        <div className="col-9 col-s-16 link-list pt-1">
          <Link to="/" className="p a-internal" >
            Home
          </Link>
          <a href="https://github.com/niklas-may/gatsby-starter-dropbox" target="_blank" className="p a-internal">Github</a>
        </div>
      </div>
    </section>
  )
}

export default RelatedSection