const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],

    })

    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPK(req.params.id, {
      include: [{ model: Product }]

    }
    );
    if (!tags) {
      res.status(404).json({ message: 'No tags found with this id!' });
      return;
    }
    res.status(200).json(tags)

  } catch (err) {
    res.status(500).json(err)
  }

});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Product.update(
    {
      // All the fields you can update and the data attached to the request body.
      product_name: req.body.product_name,
    },
    {
      // Gets a category based on the id given in the request parameters
      where: {
        product_id: req.params.id,
      },
    }
  )
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
