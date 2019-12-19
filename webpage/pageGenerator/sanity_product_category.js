const query = `
{
  allSanityCategory{
    edges{node{
      _id
      slug{current}
    }}
  }
}`;

exports.query = query;
