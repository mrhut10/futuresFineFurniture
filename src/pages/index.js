import React from 'react'
import { Link } from 'gatsby'
import { Speak } from 'libreact/lib/Speak';

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout showHero>
    <h1>Welcome</h1>
    <Speak text="welcome to futures Fine Furniture & Bedding" />
    <Link to="/delivery/">Delivered To Your Door</Link>
  </Layout>
)

export default IndexPage
