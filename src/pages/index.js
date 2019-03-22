import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RangeDisplay from '../components/range'

import RedHeart from '../components/redHeart'
import { Card } from "@blueprintjs/core";

const ListofLove = ({ love, children, rot="0deg" }) => (
  <Card elevation={1}
  style={{ padding: '10px', listStyle: `none`, transform:rot, }}
  >
    <h4 style={{ marginBottom: '0.1rem', textAlign:'center' }}>We <RedHeart /> {love}</h4>
    <br/>
    <div style={{ transform: 'translateX(10px)' }}>
      {children}
    </div>
  </Card>
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
    <div style={{ 
      display:'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '15px',
      maxWidth: "40rem",
      fontSize: '1.1rem',
      margin: '1em auto'
    }} >
      <ListofLove love="Accessibillity" rot="15deg">
        <ul style={{listStyle:'none'}}>
          <li>Lowest Prices</li>
          <li><Link to="/payment">Flexible payments</Link></li>
          <li><span style={{fontsize:'1.5rem',color:'red'}}>Free Delivery</span>*</li>
        </ul>
        * within Macleay Vally - March 2019
      </ListofLove> 
      <ListofLove love="Quality">
        <ul style={{listStyle:'none'}}>
          <li>Highest Quality</li>
          <li>Best Functionality</li>
          <li>Beauty to Inspire</li>
        </ul>
      </ListofLove>
    </div>
    <div>
      <h2>Be Inspired </h2>
      <RangeDisplay.Categories/>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

    </div>
  </Layout>
)

export default IndexPage
