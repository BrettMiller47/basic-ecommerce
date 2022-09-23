// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { belongsTo } = require('./Product');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'tag_ids'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
