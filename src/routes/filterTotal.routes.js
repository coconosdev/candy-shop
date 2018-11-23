const express = require('express');
const router = express.Router();

const Sale = require('../models/sale');

router.get('/', async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

router.get('/:tot1/:tot2', async (req, res) => {
  const tot1 = req.params.tot1;
  const tot2 = req.params.tot2;
  let sales = await Sale.find({
    valor: {
      $gte : tot1,
      $lte : tot2,
    }
  });
  sales = sales.sort((a,b) =>{
    if (a.valor<b.valor) {
      return 1;
    }
    if (a.valor>b.valor) {
      return -1;
    }
    if (a.valor==b.valor) {
      return 0;
    }
  });
  res.json(sales);
});

module.exports = router;