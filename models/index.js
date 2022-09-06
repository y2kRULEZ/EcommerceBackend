// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category,{
  foreign_key: 'category_id',
})

// Categories have many Products
Category.hasMany(Product,{
  foreign_key: 'category_id'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
  through:ProductTag,
  foreign_key: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through:ProductTag,
  foreign_key:'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
