const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getOneTag = await Tag.findByPk(req.params.id, {
      includes: [{ module: Product }],
    });

    if (!getOneTag) {
      res.status(404).json({ message: "No tag with that id!" });
      return;
    }

    res.status(200).json(getOneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id, }, 
  })
  .then((updateTag) => {
    res.json(updateTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where:{ id:req.params.id }})
  .then((deleteTag) => {
    res.json(deleteTag);
  })
  .catch((err) => {
    res.json(err);
  });

});

module.exports = router;
