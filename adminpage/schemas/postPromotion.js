import { IoMdNutrition } from 'react-icons/io'
export default {
  title: 'Post Promotion',
  name: 'postPromotion',
  type: 'document',
  icon: IoMdNutrition,
  fields: [
    {
      title: 'generic',
      name: 'generic',
      type: 'postGeneric',
    },
    {
      title: 'Promotion Start Date',
      name: 'datePromotionStart',
      type: 'datetime'
    },
    {
      title: 'Promotion End Date',
      name: 'datePromotionEnd',
      type: 'datetime'
    },
  ]
}