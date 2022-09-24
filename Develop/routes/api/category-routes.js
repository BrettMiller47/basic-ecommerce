const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categoryData = await Category.findAll({
    // JOIN with Product, using the ProductTag through table
    include: Product
  });
  
  res.json(categoryData);
});

router.get('/:id', async (req, res) => {
 // find one category by its `id` value
 const categoryData = await Category.findByPk(req.params.id, {
    // JOIN with Product, using the ProductTag through table
    include: Product
  });

  if (!categoryData) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
  }
  
  res.json(categoryData);
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = await Category.create(
    {
      'category_name': req.body.category_name
    }
  );
  
  res.send(categoryData);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
      category_name: req.body.category_name
    },
    { where: {
        id: req.params.id
      }
    }).then((updatedCategory) => res.json(updatedCategory))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
  }).then((deletedCategory) => res.json(deletedCategory))
});

module.exports = router;
