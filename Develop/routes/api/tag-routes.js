const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findAll({
      include: [{
        model: Product,
        as: 'products'
      }]
    })
    res.json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {

    const tagInfo = await Tag.findByPk(req.params.id,
      {
        include: [{
          model: Product,
          as: "products"
        }]
      }
    );
    res.json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(201).json(createTag);
  } catch (error) {
    res.status(500).json('{"message": "Error adding tag"}')
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // try {
  //   const tagUpdate = await Category.update(req.body, {
  //     where: {
  //       id: req.params.id
  //     }
  //   });
  //   res.status(201).json(tagUpdate);
  // } catch (error) {
  //   res.status(500).json({ message: "Error updating tag" })
  // }
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((tag)=>res.status(200).json(tag))
  .catch((error)=>res.status(404).json(error))
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(201).json(deleteTag);
  } catch (error) {
    res.status(500).json({ message: `Error deleting ${deleteTag}` })
  }
});

module.exports = router;
