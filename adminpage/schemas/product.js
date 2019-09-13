import customSlugify from './customSlugify';

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
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
     type: 'array',
     of: [{
       type: 'reference',
       to: [{type: 'category'}]
     }],
     validation: Rule => Rule.required().min(1).unique(),
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
      of: [{
        type: 'image',
        options: {
          hotspot: true,
          metadata: ['palette'],
        },
        fields: [
          {
            title: 'Caption',
            name: 'caption',
            type: 'string',
          },
          {
            title: 'varientName',
            name: 'varientName',
            type: 'string',
          }
        ]
      }]
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
    }
  ]
};