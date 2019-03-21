module.exports = {
  siteMetadata: {
    title: 'Futures Fine Furniture and Bedding',
    description: 
      `Mid North Coast Furniture & Mobility Store, Hastings & Macleay Valley`,
    author: `@ahut10`,
    col_background: '#595b61', // gray background
    col_header: '',
    col_logoText: '',
    snipCartApiKey: process.env.snipcart_api,
    siteUrl:'https://www.futuresfinefurnitureandbedding.com/'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contentImages',
        path: `${__dirname}/static/images/uploads`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `blog`,
        path: `${__dirname}/collections/blog`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `productCategory`,
        path: `${__dirname}/collections/productCats`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `productRange`,
        path: `${__dirname}/collections/productRange`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `product`,
        path: `${__dirname}/collections/product`,
      }
    },
    'gatsby-transformer-remark',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Futures Fine Furniture and Bedding`,
        short_name: `Futures Fine Furniture`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
    `gatsby-plugin-sitemap`,
  ],
}
