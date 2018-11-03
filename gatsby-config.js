const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: 'Futures Fine Furniture and Bedding',
    col_background: '#595b61',
    col_header: '',
    col_logoText: '',
  },
  plugins: [
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
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
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
        name: `blog`,
        path: `${__dirname}/collections/blog`,
      }
    },
    'gatsby-transformer-json', // can get json data
    //'gatsby-transformer-sharp',
    //'gatsby-plugin-sharp',
    /*
    {
      resolve: 'gatsby-plugin-snipcart',
      //https://www.gatsbyjs.org/packages/gatsby-plugin-snipcart/
      options: {
        apiKey: process.env.SNIPCART_APIKEY || "YzUxMzk5NTItOThmOC00NzM3LWE5NmUtNGViMGVmNDNhNTdkNjM2NzY2ODMyMDY2NzQzNzg2",
        //autopop: Whether or not the cart will open once a product is added. (Defaults to false)
        //js: A Snipcart JavaScript file. (Defaults to https://cdn.snipcart.com/scripts/2.0/snipcart.js)
        //jquery: A jQuery file to link to. Set to false for none. (Defaults to https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js)
        //styles: A stylesheet file to link to. Set to false for none. (Defaults to https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css)
      }
    }
    */
  ],
}
