import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import LazyLoad from 'react-lazyload';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const contactPage = ({ data }) => (
  <Layout>
    <SEO title="Contact" />
    <div className="flex flex-wrap">
      <div className="px-4 py-12 w-full md:w-1/2">
        <h1 className="font-bold mb-4 text-2xl text-maroon-600">
          Get In Touch
        </h1>
        <p>
          we are always ready to meet and discuss how you can have quality
          furniture in your home for less.
        </p>
        <ul>
          <li>
            <a href={`${data.site.siteMetadata.phone}`}>
              <Button
                large
                className="fill-current mr-2 text-gray-700"
                icon={IconNames.MOBILE_PHONE}
                type="button"
              />
              <span className="text-blue-600">
                {data.site.siteMetadata.phoneFormatted}
              </span>
            </a>
          </li>
          <li>
            <a href="https://goo.gl/maps/z54jvbeejAt">
              <Button
                large
                className="fill-current mr-2 text-gray-700"
                icon={IconNames.MAP_MARKER}
                type="button"
              />
              <span className="text-blue-600">
                {data.site.siteMetadata.address}
              </span>
            </a>
            <div />
          </li>
        </ul>
        <p>
          Working Hours
          <ul>
            <li>Monday: 9am to 5pm</li>
            <li>Tuesday: 9am to 5pm</li>
            <li>Wednesday: 9am to 5pm</li>
            <li>Thursday: 9am to 5pm</li>
            <li>Friday: 9am to 5pm</li>
            <li>Saturday: 9am to 1pm</li>
          </ul>
        </p>
      </div>
      <div className="overflow-hidden w-full md:w-1/2">
        <LazyLoad height={450}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.076880963955!2d152.8386859508759!3d-31.07978838707053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9ddf8643294fa9%3A0x4fb64c39e261278a!2sFUTURES+FINE+FURNITURE+%26+BEDDING+Pty+Ltd!5e0!3m2!1sen!2sau!4v1561777106747!5m2!1sen!2sau"
            allowFullScreen
            className="rounded-br-lg w-full"
            frameBorder={0}
            height={450}
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
