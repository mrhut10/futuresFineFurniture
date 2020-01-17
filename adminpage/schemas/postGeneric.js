import customSlugify from './customSlugify';
import { IoIosImage } from 'react-icons/io';

export default {
  title: 'Post Generic',
  name: 'postGeneric',
  type: 'object',
  fields: [
    {
      title: "Title",
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: Rule => Rule.required().lowercase(),
      options: {
        readOnly: true,
        source: 'name',
        description: 'url safe name, make lower case please',
        slugify: customSlugify
      }
    },
    {
      title: 'Disable',
      name: 'disable',
      type: 'boolean',
    },
    {
      title: "Date Release",
      name: 'dateRelease',
      type: 'datetime',
      validation: Rule => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      }
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{
        type: 'string',
        validation: Rule => Rule.min(1),
      }]
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', icon: IoIosImage},
      ]
    },
  ],
};