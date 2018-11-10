import React from 'react'
import { Link } from 'gatsby'
import RedHeart from '../components/redHeart'
import Layout from '../components/layout'
//import icon_heart from '../images/icon_heart.svg'

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
    <h2>Welcome</h2>
    <p>
      You'll find the widest rnage of new and end of line furniture, everything you'll need to fill a home.
      We've been providing quality furniture with <RedHeart /> to the Macleay and surounding area's for over 30 years.
    </p>
    <ul style={{ maxWidth: "40rem", fontSize: '1.1rem' }} >
      <ListofLove love="Quality">
        Find widest range of Quality Furniture in the Macleay
      </ListofLove>
      <ListofLove love="Beauty">
        Be inspirered by the beauty, function and form
      </ListofLove>
      <ListofLove love="Accessibillity">
        Find the Best Value Quality Furniture,
        <br /> with Inovative and flexible <Link to="/payment">payment options</Link>
        <br /> and we do <Link to="/delivery">delivery</Link>
      </ListofLove>

    </ul>
  </Layout>
)

export default IndexPage
