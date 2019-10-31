import { IoIosCash } from 'react-icons/io'

export default {
  title: 'productDiscount',
  name: 'productDiscount',
  type: 'document',
  icon: IoIosCash,
  fields: [
    {
      title: 'Target product/Category/Range',
      name: 'target',
      type: 'reference',
      to: [
        {type:'product'},
        {type:'range'},
        {type:'category'},
      ]
    },
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
      description: 'if method is amount, this is the amount in dollars of the discount\nif method is percentage this is the percentage of the discount',
    }
  ]
};