import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RangeDisplay from '../components/range'

import RedHeart from '../components/redHeart'

const ListofLove = ({ love, children }) => (
  <li style={{ padding: '10px', listStyle: `none` }}>
    <h4 style={{ marginBottom: '0.1rem' }}>We <RedHeart /> {love}</h4>
    <div style={{ transform: 'translateX(10px)' }}>
      {children}
    </div>
  </li>
)


const IndexPage = () => (
  <Layout showHero>
    <SEO title="Home" keywords={[
      `Quality Furniture`,
      `Mobility Products`,
      `kempsey`,
      'port macquarie',
      'macksville'
    ]} />
    <h1>Welcome</h1>
    <p style={{fontSize:'1.01rem'}}>
    In Store you'll find the widest range of new and end of line furniture, <br/>
      everything you'll need to fill a home.<br/>
    </p>
    <ul style={{ maxWidth: "40rem", fontSize: '1.1rem' }} >
      <ListofLove love="Quality">
        widest range of Quality Furniture in the Macleay
      </ListofLove>
      <ListofLove love="Beauty">
        inspirering beauty, function and form
      </ListofLove>
      <ListofLove love="Accessibillity">
        Best Value Quality Furniture, flexible <Link to="/payment">payment options</Link>
        <br /> <span style={{fontsize:'1.5rem',color:'red'}}>Free Delivery </span> (within Macleay Vally for March 2019 Only)
      </ListofLove>

    </ul>
    <div>
      <h2>Be Inspired </h2>
      <RangeDisplay.Categories/>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

    </div>
  </Layout>
)

export default IndexPage
