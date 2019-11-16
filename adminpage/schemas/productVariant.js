import React from 'react'

export default {
  title: 'Product Variant',
  name: 'productvariant',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
      validation: Rule => Rule.precision(2)
    },
    {
      title: 'Discount',
      name: 'discount',
      type: 'inlineDiscount',
      options: {collapsible: false }
    },
    {
      title: 'Disable',
      name: 'disable',
      type: 'boolean',
      options: {
        layout: 'checkbox'
      }
    },
  ],
  preview: {
    select: {
      name: 'name',
      rrp: 'price',
      discountType: 'discount.method',
      discountAmount: 'discount.amount',
    },
    prepare(selection) {
      const {name, rrp, discountType, discountAmount} = selection;
      let discountValue = 0;
      if (discountType && discountAmount){
        if (discountType === 'percentage'){
          discountValue = discountAmount / 100 * rrp
        }
        if (discountType === 'amount'){
          discountValue = discountAmount
        }
      }
      return {
        title: name || 'default',
        subtitle: 
          `RRP: $${
            rrp.toFixed(2)
          }, ${
            discountType === 'percentage' && discountAmount ? `Discount: ${discountAmount.toFixed(2)}%, ` : ''
          }${
            discountType === 'amount' && discountAmount ? `Discount: $${discountAmount.toFixed(2)}, ` : ''
          }Price: $${(rrp - discountValue).toFixed(2)}`,
      }
    }
  },
};