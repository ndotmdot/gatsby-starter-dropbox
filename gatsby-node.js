async function createPostPages (graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    query projectQuery {
      allDropboxFolder(filter: {name: {regex: "/Post/"}}) {
        group(field: id) {
          nodes {
            name
            id
            dropboxMarkdown {
              localFile {
                childMarkdownRemark {
                  frontmatter {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectGroups = result.data.allDropboxFolder.group || []

  projectGroups.forEach(group => {
    const id = group.nodes[0].id
    const name = group.nodes[0].name
    const path = group.nodes[0].dropboxMarkdown[0].localFile.childMarkdownRemark.frontmatter.slug

    reporter.info(`Creating post page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/post.js'),
      context: {
        id,
        name
      }
    })
  })
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createPostPages(graphql, actions, reporter)
}