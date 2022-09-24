const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'product_ids' }]
  });
  
  res.json(tagData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagData = await Tag.findByPk({
    include: [{model: Product, through: ProductTag, as: 'product_ids'}]
  });

  res.json(tagData);
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then((createdTag) => res.json(createdTag));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }).then((updatedTag) => res.json(updatedTag));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.body.id
    }
  }).then((deletedTag) => res.json(deletedTag));
});

module.exports = router;
