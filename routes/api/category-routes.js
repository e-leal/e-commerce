const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');
const sequelize = require('../../config/connection');
//const { Sequelize } = require('sequelize/types');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    // attributes:[
    //   'id', 'category_name',
    // ],
    include: [
      {
        model: Product,
        attributes: ['id', 'category_id', 'product_name', 'price', 'stock']
        
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
    // },
    // include: [
    //   {
    //     model: Product,
    //     attributes: ['id', 'product_name', 'price', 'stock',
    //     [sequelize.literal('(SELCT product_name from product where category.id = product.category_id)'), 'products']]
    //   }
    // ]
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: 'No user found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData[0]){
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
