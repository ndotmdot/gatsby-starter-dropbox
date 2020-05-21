const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/project.js`)

  return graphql(`
    query projectQuery {
      allDropboxFolder(filter: {name: {regex: "/Project/"}}) {
        group(field: name) {
          nodes {
            name
            dropboxMarkdown {
              localFile {
                childMarkdownRemark {
                  frontmatter {
                    Slug_
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {

    // Create project pages.
    result.data.allDropboxFolder.group.forEach(group => {
      createPage({
        // Path for this page — required
        path: `${group.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter.Slug_}`,
        component: projectTemplate,
        context: {
          name:group.nodes[0].name
        },
      })
    })
  })
}