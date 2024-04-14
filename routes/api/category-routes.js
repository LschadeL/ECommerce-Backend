const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const allCatData = await Category.findAll({
        include: [{
          model: Product
        }]
      });
      res.json(allCatData);
    } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catId = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!catId) {
      res.status(404).json({
        message: "ID not found"
      });
      return;
    }
    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    const catId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!catId) {
      res.status(404).json({ message: "ID not found" });
      return;
    }
    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCat = await Category.destroy({
      where : {
        id: req.params.id
      }
    });
    if (!destroyCat) {
      res.status(404).json({
        message: "Unable to destroy this cat"
      });
      return;
    }
    res.status(200).json({
      message: "Cat has been destroyed"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;