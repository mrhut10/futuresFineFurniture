import customSlugify from './customSlugify';
import { IoMdBarcode } from 'react-icons/io'

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  icon: IoMdBarcode,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'slug',
      name: 'slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        readOnly: true,
        source: 'name',
        description: 'url safe name',
        slugify: customSlugify
      }
    },
    {
     title: 'Category',
     name: 'category',
     type: 'reference',
     to: [{type: 'category'}],
     //type: 'array',
     //of: [{
     //  type: 'reference',
     //  to: [{type: 'category'}]
     //}],
     //validation: Rule => Rule.required().min(1).unique(),
    },
    {
      title: 'Range',
      name: 'range',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'range'}]
      }]
    },
    {
      title: 'images',
      name: 'images',
      type: 'array',
      of: [{type: 'imageObject'}]
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{type: "string"}],
    },
    {
      title: 'Common',
      name: 'common',
      type: 'documentCommon',
    },
    {
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [{type: 'productvariant'}],
      validation: Rule => Rule.required().unique().min(1)
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 30,
    }
  ]
};