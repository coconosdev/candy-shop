const express = require('express');
const router = express.Router();

const Sale = require('../models/sale');

router.get('/', async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

router.get('/:date', async (req, res) => {
  const date = req.params.date + 'T00:00:00.000Z';
  const sales = await Sale.find({
    fecha: {
      $gte : date,
    }
  });
  res.json(sales);
});

router.get('/:date1/:date2', async (req, res) => {
  const date1 = req.params.date1 + 'T00:00:00.000Z';
  const date2 = req.params.date2 + 'T00:00:00.000Z';
  const sales = await Sale.find({
    fecha: {
      $gte : date1,
      $lte : date2,
    }
  });
  res.json(sales);
});

/* router.get('/:id', async (req, res) => {
  const sale = await Sale.findOne({producto_id: req.params.id});
  res.json(sale);
}); */

router.post('/', async (req, res) => {
  const { producto_id, fecha, venta, valor } = req.body;
  const sale = new Sale({ producto_id, fecha, venta, valor });
  await sale.save();
  res.json({status: 'Sale saved'});
});

router.put('/:id', async (req, res) => {
  const { producto_id, fecha, venta, valor } = req.body;
  const newSale = { producto_id, fecha, venta, valor };
  await Sale.findOneAndUpdate({producto_id: req.params.id}, newSale);
  res.json({status: 'Sale updated'});
});

router.delete('/:id', async (req, res) => {
  await Sale.findOneAndRemove({producto_id: req.params.id});
  res.json({status: 'Sale deleted'});
});


module.exports = router;