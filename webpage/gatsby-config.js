module.exports = {
  siteMetadata: {
    title: `Futures Fine Furniture and Bedding`,
    description: `Mid North Coast Furniture & Mobility Store, Hastings & Macleay Valley`,
    author: `@ahut10`,
    snipCartApiKey: process.env.snipcart_api,
    siteUrl: `https://www.futuresfinefurnitureandbedding.com/`,
    address: `Centerpoint Arcade, 14 Smith Street, Kempsey, NSW 2440`,
    phone: `tel:+61265626675`,
    phoneFormatted: `(02) 6562 6675`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contentImages`,
        path: `${__dirname}/static/images/uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/collections/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `productCategory`,
        path: `${__dirname}/collections/productCats`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `productRange`,
        path: `${__dirname}/collections/productRange`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `product`,
        path: `${__dirname}/collections/product`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Futures Fine Furniture and Bedding`,
        short_name: `Futures Fine Furniture`,
        start_url: `/`,
        background_color: `#522224`,
        theme_color: `#FEF7C4`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/tailwind.css`],
      },
    },
    `gatsby-plugin-offline`, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-sitemap`,
  ],
};