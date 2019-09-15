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
      title: 'Disable',
      name: 'disable',
      type: 'boolean',
      options: {
        layout: 'checkbox'
      }
    }
  ],
};