import customSlugify from './customSlugify';
import { IoIosAlbums } from 'react-icons/io'

export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  icon: IoIosAlbums,
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
      title: 'Parent Category',
      name: 'parentCategory',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'a Value here will make the category a sub category of its parent category'
    },
    {
      title: 'Cover',
      name: 'cover',
      type: 'image',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
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