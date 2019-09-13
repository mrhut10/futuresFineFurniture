export default {
  title: 'Image Object',
  name: 'imageObject',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette'],
      }
    },
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
}