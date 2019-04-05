import React from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import LazyLoad from 'react-lazyload';
import {graphql} from 'gatsby'
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';

const SecondPage = ({ data }) => (
  <Layout>
    <div className="flex flex-wrap">
      <div className="p-4 w-full md:w-1/2">
        <h1>Get In Touch</h1>
        <p>
          we are always ready to meet and discuss how you can have quality
          furniture in your home for less.
        </p>
        <ul className="list-reset">
          <li>
            <a href={`${data.site.siteMetadata.phone}`}>
              <Button
                large
                className="fill-current mr-2 text-grey-darker"
                icon={IconNames.MOBILE_PHONE}
                type="button"
              />
              <span className="text-blue-dark">
                {data.site.siteMetadata.phoneFormatted}
              </span>
            </a>
          </li>
          <li>
            <a href="https://goo.gl/maps/z54jvbeejAt">
              <Button
                large
                className="fill-current mr-2 text-grey-darker"
                icon={IconNames.MAP_MARKER}
                type="button"
              />
              <span className="text-blue-dark">
                {data.site.siteMetadata.address}
              </span>
            </a>
            <div />
          </li>
        </ul>
        <p>Don't be a stranger!</p>
      </div>
      <div className="w-full md:w-1/2">
        <LazyLoad height={450}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.0768809607753!2d152.8386913141883!3d-31.07978838715898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9ddf8643294fa9%3A0x4fb64c39e261278a!2sFUTURES+FINE+FURNITURE+%26+BEDDING+Pty+Ltd!5e0!3m2!1sen!2sau!4v1542370777195"
            allowFullScreen
            className="w-full"
            frameBorder={0}
            height={450}
            style={{ border: 0 }}
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

export default SecondPage;
