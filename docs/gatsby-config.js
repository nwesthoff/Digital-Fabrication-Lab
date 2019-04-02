module.exports = {
  siteMetadata: {
    title: "IO3040 - Software Report",
    description: "IO3040 - Software Report",
    keywords:
      "IO3040, Software, Software Report, Nils Westhoff, Avelien Husen, Annemar Marinissen"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-transformer-remark",
    "gatsby-image",
    "gatsby-plugin-sass",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-mdx`,
      options: {
        decks: [],
        defaultLayouts: {
          default: require.resolve("./src/components/postLayout.tsx")
        },
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 860,
              ratio: 1.77,
              related: false,
              noIframeBorder: true
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: {
                tsx: "tsx"
              },
              aliases: {}
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 860,
              quality: 80,
              showCaptions: true,
              linkImagesToOriginal: false,
              withWebP: process.env.NODE_ENV === "production" ? true : false
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
        ignore: ["**/.tsx*"]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "IO3040 - Software Report",
        short_name: "Software Report",
        start_url: "/",
        background_color: "#2D9CDB",
        theme_color: "#2D9CDB",
        display: "minimal-ui",
        icon: "src/images/vanberlo-logo.svg" // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
  ]
};
