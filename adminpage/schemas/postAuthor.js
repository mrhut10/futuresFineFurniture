import { IoIosContact } from 'react-icons/io';

export default {
  title: 'Post Author',
  name: 'postAuthor',
  type: 'document',
  icon: IoIosContact,
  fields: [
    {
      title: 'Full Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'About Me',
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }
  ]
}