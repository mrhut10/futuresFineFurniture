const dotenv = require('dotenv');
const resolveConfig = require('tailwindcss/resolveConfig');
const clientConfig = require('./client-config');
const tailwindConfig = require('./tailwind.config.js');

// Get colours for manifest directly from Tailwind
const fullConfig = resolveConfig(tailwindConfig);

const isProd = process.env.NODE_ENV === 'production';
const siteUrl = 'https://www.futuresfinefurnitureandbedding.com';

// Load variables from '.env' as soon as possible
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

module.exports = {
  siteMetadata: {
    title: 'Futures Fine Furniture and Bedding',
    description:
      'Mid North Coast Furniture & Mobility Store, Hastings & Macleay Valley',
    author: '@ahut10',
    snipCartApiKey: process.env.snipcart_api,
    siteUrl,
    address: 'Centerpoint Arcade, 14 Smith Street, Kempsey, NSW 2440',
    phone: 'tel:+61265626675',
    phoneFormatted: '(02) 6562 6675',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: 'UA-131726943-1',
    //   },
    // },
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: 'UA-131726943-1',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Futures Fine Furniture and Bedding',
        short_name: 'Futures Fine Furniture',
        start_url: '/',
        background_color: fullConfig.theme.colors.maroon['800'],
        theme_color: fullConfig.theme.colors.cream['200'],
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline', // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: [],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        exclude: [],
        createLinkInHead: true,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges
            .filter(edge => {
              const { path } = edge.node;
              return true;
            })
            .map(edge => ({
              url: `${siteUrl}${edge.node.path}`,
              changefreq: 'daily',
              priority: 0.7,
            })),
      },
    },
    {
      resolve: 'gatsby-plugin-snipcart',
      options: {
        apiKey:
          'ZWQ5YjMwNmEtMjE1OS00MmMyLWEzOWUtNDJjY2M4NTgyNTgzNjM2NzY2ODMyMDY2NzQzNzg2',
        autopop: true,
        js: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
        jquery: 'https://code.jquery.com/jquery-3.4.1.min.js',
        styles: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'src/images',
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
  ],
};
