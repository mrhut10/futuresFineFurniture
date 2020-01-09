import customSlugify from './customSlugify';
// import { IoIosBowtie } from 'react-icons/io';

export default {
  title: 'Promotion',
  name: 'Promotion',
  type: 'document',
  // icon: IoIosBowtie,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'slug',
      name: 'slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        readOnly: true,
        source: 'name',
        description: 'url safe name, make lower case please',
        slugify: customSlugify
      }
    },
    {
      title: 'Start Date',
      name: 'dateStart',
      type: 'date',
      validation: Rule => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
      }
    },
    {
      title: 'End Date',
      name: 'dateEnd',
      type: 'date',
      validation: Rule => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
      }
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{type: "string"}],
    },
    {
      title: 'disable', 
      name: 'disable',
      type: 'boolean',
    },
    {
      title: 'image',
      name: 'image',
      type: 'image',
      validation: Rule => Rule.required(),
      fields: [{
        name: 'caption',
        type: 'string',
        title: 'Caption',
        options: {
          isHighlighted: true,
        }}
      ]
    },
    {
      title: 'Attachment',
      name: 'attachment',
      type: 'file',
      fields: [{
        name: 'downloadable',
        title: 'Downloadable',
        type: 'boolean',
      }]
    }
  ]
};