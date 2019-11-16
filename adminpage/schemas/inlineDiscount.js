export default {
  title: 'inline discount',
  name: 'inlineDiscount',
  type: 'object',
  fields: [
    {
      title: 'Method',
      name: 'method',
      type: 'string',
      options: {
        list: ['amount','percentage'],
        layout: 'radio',
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'amount',
      name: 'amount',
      type: 'number',
      validation: Rule => Rule.precision(2)
    },
  ],
};