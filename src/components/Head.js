import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const Head = ({ data }) => (
  <Helmet
    title={data.site.siteMetadata.title}
    meta={[
      {
        name: 'description',
        content: 'Furniture and Mobility Provider for the mid north coast',
      },
      {
        name: 'keywords',
        content:
          "Mid North Coast, Furniture, Mobility, Timber, Beds, Lift Beds, Adjustable Beds, Lift Chairs, Mattress, Mattress's, Kempsey, Port Macquarie, Macksville, Coffs Harbour",
      },
    ]}
  >
    <html lang="en" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js" />
    <script id="mcjs">
      {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/4ef8471ffe4887c7437198f2e/fa1103d389ef79306e0e4a1f7.js");`}
    </script>
    <script
      src="https://cdn.snipcart.com/scripts/2.0/snipcart.js"
      id="snipcart"
      data-api-key="ZWQ5YjMwNmEtMjE1OS00MmMyLWEzOWUtNDJjY2M4NTgyNTgzNjM2NzY2ODMyMDY2NzQzNzg2"
    />
    <link
      href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css"
      type="text/css"
      rel="stylesheet"
    />
  </Helmet>
);
Head.propTypes = {
  data: PropTypes.object,
};

export default Head;
