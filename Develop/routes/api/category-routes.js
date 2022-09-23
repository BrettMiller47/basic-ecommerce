const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    // JOIN with Product, using the ProductTag through table
    include: Product
  });
  
  res.json(categoryData);
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
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

// create a new category
router.post('/', async (req, res) => {
  const categoryData = await Category.create(
    {
      'category_name': req.body.category_name
    }
  );
  
  res.send(categoryData);
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
      category_name: req.body.category_name
    },
    { where: {
        id: req.params.id
      }
    }).then((updatedCategory) => res.json(updatedCategory))
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id
      }
  }).then((deletedCategory) => res.json(deletedCategory))
});

module.exports = router;
