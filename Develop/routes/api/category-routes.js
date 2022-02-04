const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getOneCategory = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!getOneCategory) {
      res.status(404).json({ msg: "No categories with that id" });
      return;
    }
    res.status(200).json(getOneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, { where: { id: req.params.id, },
  }).then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id, },
  }) .then((deleteCategory) => {
      res.json(deleteCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
