import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Contact = ({data}) => {
  const {E_Mail, Phone } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark.frontmatter;
  const {html: description } = data.allDropboxMarkdown.nodes[0].localFile.childMarkdownRemark;

  return (
    <Layout title="Contact">
      <section className="container">
        <div class="row">
          <div className="offset-6 col-6 mb-4">
            <header className="mb-1">
              <h1>Contact</h1>
            </header>
            <div dangerouslySetInnerHTML={{__html: description}} />
            <div className="contact-details mt-1">
              <a className="p mb-1" href={`phoneto:${Phone}`}>M. {Phone}</a>
              <a className="p" href={`mailto:${E_Mail}`}>E. {E_Mail}</a>
            </div>
          </div>
        </div>
      </section> 

    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ContactPageQuery   {
    allDropboxMarkdown(filter: {name: {eq: "Contact.md"}}) {
      nodes {
        localFile {
          name
          childMarkdownRemark {
            html
            frontmatter {
              E_Mail
              Phone
            }
          }
        }
      }
    }
  }
`