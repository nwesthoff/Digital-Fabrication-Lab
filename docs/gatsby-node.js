const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");
const { resolve } = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: ASC }) {
        edges {
          next {
            frontmatter {
              path
              title
              subtitle
            }
          }
          node {
            fileAbsolutePath
            timeToRead
            frontmatter {
              path
              title
              date
            }
          }
        }
      }
    }
  `).catch(error => console.error(error));

  data.allMdx.edges.forEach(({ node, next }) => {
    const nextCtx = next ? next : undefined;

    createPage({
      path: `/posts${node.frontmatter.path}`,
      component: node.fileAbsolutePath,
      context: {
        node: node,
        next: nextCtx
      }
    });
  });
};
