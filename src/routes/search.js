const express = require('express');
const Car = require('../models/car.js')

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('search');
  })
  .post(async (req, res) => {
    const carSearch = req.body.search_brand;
    const cars = await Car.find({ brand: new RegExp(carSearch, 'i') });
    try {
      await entry.save();
      // throw Error('You shall not pass');
      return res.redirect(`entries/${entry.id}`);
    }
    catch (err) {
      return res.render('entries/new', { errors: [err] });
    }
  });

module.exports = router;