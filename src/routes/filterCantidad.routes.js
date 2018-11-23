const express = require('express');
const router = express.Router();

const Sale = require('../models/sale');

router.get('/', async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

router.get('/:cant1/:cant2', async (req, res) => {
  const cant1 = req.params.cant1;
  const cant2 = req.params.cant2;
  let sales = await Sale.find({
    venta: {
      $gte : cant1,
      $lte : cant2,
    }
  });
  sales = sales.sort((a,b) =>{
    if (a.venta<b.venta) {
      return 1;
    }
    if (a.venta>b.venta) {
      return -1;
    }
    if (a.venta==b.venta) {
      return 0;
    }
  });
  res.json(sales);
});

module.exports = router;