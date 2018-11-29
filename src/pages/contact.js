import React from 'react'
import { WindowSizeSensor } from 'libreact/lib/WindowSizeSensor';


import Layout from '../components/layout'


const map = (size = 200) => `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.0768809607753!2d152.8386913141883!3d-31.07978838715898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9ddf8643294fa9%3A0x4fb64c39e261278a!2sFUTURES+FINE+FURNITURE+%26+BEDDING+Pty+Ltd!5e0!3m2!1sen!2sau!4v1542370777195" width="${size}" height="${size}" frameborder="0" style="border:0" allowfullscreen></iframe>`

const singleColumSize = 600

const SecondPage = () => (
  <Layout showHero>
    <WindowSizeSensor>{({ width, height }) => (
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: width > singleColumSize ? '1fr 1fr' : '1fr',
        gridTemplateAreas: width > singleColumSize ? '"left right"' : '"left" "right"',
        textAlign: 'center'
      }}>
        <div style={{
          gridArea: 'left',
        }}>
          <h1>Get In Touch</h1>
          <p>we are always ready to meet and discuse how you can have quality furniture in your home for less</p>
          <ul style={{ textAlign: 'left' }}>
            <li><a href="tel:+61265626675">Phone: 65626675</a></li>
            <li>
              Address: Centerpoint Arcade, 14 Smith Street, Kempsey, NSW 2440
              <div style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: map(250) }} />
            </li>
          </ul>
        </div>
        <div style={{ gridArea: 'right', margin: '10px 5px' }}>
          <p>Don't be a stranger</p>

        </div>
      </div>

    )
    }</WindowSizeSensor>
  </Layout>
)


// "<div dangerouslySetInnerHTML={{ __html: post.html }} />"

export default SecondPage
