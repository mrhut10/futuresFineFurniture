import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import { Products, ProductGroupRender } from '../components/products';
import NotAvaliable from '../components/NotAvaliable';
import Breadcrumb from '../components/breadcrumb';
import { BuyArea } from '../components/Snipcart';

const productRoute = ({ data, pageContext, location }) => {
  const product = Products({
    filters: [a => a.id === pageContext.productID],
    perPage: 1,
    pageNum: 1,
  })[0];

  const { name, variants, keywords, category, images, disable, ranges, description } = product;
  return (
    <Layout>
      <SEO title={name} keywords={keywords} />
      <Wrapper>
        {product ? (
          <div className="mb-8 text-center">
            <h1 className="font-bold text-3xl text-maroon-600">{name}</h1>
            {disable ? <NotAvaliable text="No Longer Avaliable" /> : null}
            {ranges ? (
              <h3>
                <Link to={`/sanity/category/${category.slug.current}`.toLowerCase()}>{category.name}</Link> Category
                <br/>
                Within ranges : {ranges.map(range => <Link to={`/collections/?range=${range.slug}`.toLowerCase()}>{range.name}</Link>)}
              </h3>
            ) : null}
            <div className="flex flex-wrap">
              <div className="flex items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
                <img src={images && images[0] && images[0].src ? images[0].src : ''} alt="product" />
              </div>
              <div className="flex flex-1 w-full md:w-1/2">
                <BuyArea
                  name={name}
                  id={name}
                  image={images && images[0] && images[0].src ? images[0].src || '' : ''}
                  url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
                  description={undefined}
                  variants={variants.map(variant => ({
                    name: variant.name,
                    price: variant.price * 100,
                    disable: variant.disable,
                  }))}
                  disabled={disable}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <NotAvaliable text="Product Not Found" />
          </div>
        )}
        <div className="bg-white mt-12 px-4 py-12 rounded-lg shadow-md hover:shadow-lg">
          <div className="markdown max-w-md mx-auto">{description}</div>
        </div>
      </Wrapper>
      <div 
        id="relatedProducts"
        className="flex flex-col max-w-4xl mx-auto p-4 w-full"
      >
        <h3>Other Products In Range</h3>
        <ProductGroupRender
          products={Products({
            filters: [
              target =>
                target.ranges.some(targetRange =>
                  ranges.some(range => range.id === targetRange.id)
                ),
              target => (target.disable || false) !== true,
            ],
            pageNum: 1,
            perPage: 3,
          })}
        />
      </div>
    </Layout>
  );
};

export default productRoute;
