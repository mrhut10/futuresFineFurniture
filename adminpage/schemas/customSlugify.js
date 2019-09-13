import slugify from 'slugify';

export default (input, type) =>
  slugify(input, {lower: true})