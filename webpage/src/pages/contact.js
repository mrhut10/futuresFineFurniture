import React from 'react';
import PropTypes from 'prop-types';
import { MdPhone, MdLocationOn } from 'react-icons/md';
import LazyLoad from 'react-lazyload';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const contactPage = ({ data }) => (
  <Layout>
    <SEO title="Contact" />
    <div className="flex flex-wrap">
      <div className="w-full px-4 py-12 md:w-1/2">
        <h1 className="text-2xl font-bold text-maroon-600">Get In Touch</h1>
        <p className="mt-2">
          we are always ready to meet and discuss how you can have quality
          furniture in your home for less.
        </p>
        <ul className="mt-4">
          <li>
            <a
              className="flex items-center group text-maroon-700 hover:text-maroon-500"
              href={`${data.site.siteMetadata.phone}`}
            >
              <MdPhone className="mr-2 group-hover:text-maroon-400" />
              <span className="font-bold hover:underline">
                {data.site.siteMetadata.phoneFormatted}
              </span>
            </a>
          </li>
          <li className="mt-2">
            <a
              className="flex items-center text-maroon-700 hover:text-maroon-500"
              href="https://goo.gl/maps/z54jvbeejAt"
            >
              <MdLocationOn className="mr-2 group-hover:text-maroon-400" />
              <span className="font-bold hover:underline">
                {data.site.siteMetadata.address}
              </span>
            </a>
          </li>
        </ul>
        <table className="mt-8">
          <thead>
            <th className="block mb-2 text-xl font-bold text-maroon-600">
              Trading Hours
            </th>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>9am – 5pm</td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>9am – 5pm</td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>9am – 5pm</td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>9am – 5pm</td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>9am – 5pm</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>9am – 1pm</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>Closed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full overflow-hidden md:w-1/2">
        <LazyLoad>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.076880963955!2d152.8386859508759!3d-31.07978838707053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9ddf8643294fa9%3A0x4fb64c39e261278a!2sFUTURES+FINE+FURNITURE+%26+BEDDING+Pty+Ltd!5e0!3m2!1sen!2sau!4v1561777106747!5m2!1sen!2sau"
            allowFullScreen
            className="w-full h-64 rounded-br-lg md:h-full"
            frameBorder={0}
            title="location"
          />
        </LazyLoad>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        address
        phone
        phoneFormatted
      }
    }
  }
`;

contactPage.propTypes = {
  data: PropTypes.any,
};
export default contactPage;
