import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import { Products } from '../components/products';
import NotAvaliable from '../components/NotAvaliable';
import Breadcrumb from '../components/breadcrumb';

const productRoute = ({ data, pageContext, location }) => {
  const product = Products({
    filters: [a => a.id === pageContext.productID],
    perPage: 1,
    pageNum: 1,
  })[0];

  const { name, variants, keywords, category, images, disable, range } = product;
  return (
    <Layout>
      <SEO title={name} keywords={keywords} />
      <Wrapper>
        {product ? (
          <div className="mb-8 text-center">
            <h1 className="font-bold text-3xl text-maroon-600">{name}</h1>
            {disable || !product ? (
              <NotAvaliable text="No Longer Avaliable" />
            ) : null}
          </div>
        ) : (
          <div className="mb-8 text-center">
            <NotAvaliable text="Product Not Found" />
          </div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default productRoute;
