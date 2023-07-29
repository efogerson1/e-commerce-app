const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [{
        model: Product
      }]
    })
    res.json(categoryInfo);
  } catch (err){
    res.status(500).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    res.json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(201).json(createCategory);
  } catch (error) {
    res.status(500).json(`{"message: "Error creating category"}`)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try {
const categoryUpdate = await Category.update(
  {
category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }
);
res.status(201).json(categoryUpdate);
  } catch (error) {
    res.status(500).json(`{"message: "Error updating category"}`)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try {
const categoryUpdate = await Category.destroy({
where: {id: req.params.id}
}
);
res.status(201).json(categoryUpdate);
  } catch (error) {
    res.status(500).json(`{"message: "Error deleting category"}`)
}
});

module.exports = router;
