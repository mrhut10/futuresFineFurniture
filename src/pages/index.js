import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import TopMenu from '../components/topmenu';

const IndexPage = () => (
  <Layout showHero>
    <h1>Welcome</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
