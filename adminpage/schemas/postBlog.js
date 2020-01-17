import { IoMdFiling } from 'react-icons/io'

export default {
  title: 'Post Blog',
  name: 'postBlog',
  type: 'document',
  icon: IoMdFiling,
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'postAuthor'}]
    },
    {
      title: 'generic',
      name: 'generic',
      type: 'postGeneric',
    },
  ]
}