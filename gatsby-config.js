const path = require(`path`)
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: 'Futures Fine Furniture and Bedding',
    col_background: '#595b61', // gray background
    col_header: '',
    col_logoText: '',
    snipCartApiKey: process.env.snipcart_api,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-131726943-1',
        head: false,
        anonymize: true,
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Futures Fine Furniture', //gatsby-starter-default',
        short_name: 'FuturesFineFuniture',
        start_url: '/',
        background_color: '#595b61', //'#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contentImages',
        path: path.join(__dirname, 'static', 'images', 'uploads'),
      }
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
    'gatsby-transformer-json', // can get json data
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
  ],
}
