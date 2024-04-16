const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{
        model: Product
      }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!tagId) {
      res.status(404).json({
        message: `Product ${req.params.id} not found`
      });
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id:req.params.id
      }
    });

    const alteredTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!alteredTag) {
      res.status(404).json({
        message: `Product ${req.params.id} not found`
      });
      return;
    }
    res.status(200).json(alteredTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(404).json({
        message: `Product ${req.params.id} not found`
      });
      return;
    }
    res.status(200).json({
      message: `Product ${req.params.id} deleted`
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;