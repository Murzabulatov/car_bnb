const express = require('express');
const Car = require('../models/car.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('search', { isSearch: true, yandexAPI: process.env.API });
  })
  .post(async (req, res) => {
    let objSearch = {};
    for (const reqKey in req.body) {
      if (
        /например|выберите/i.test(req.body[reqKey]) ||
        req.body[reqKey] === '' ||
        reqKey === 'location' ||
        reqKey === 'distance'
      ) {
        // ничего не делаем
      } else if (typeof req.body[reqKey] === 'boolean') {
        objSearch[reqKey] = req.body[reqKey];
      } else if (reqKey === 'price') {
        // сложная логика
        const regEx = /\d+/gim;
        const priceArr = req.body[reqKey].match(regEx);
        const priceStart = Number(priceArr[0]);
        const priceEnd = Number(priceArr[1]);

        objSearch['price.day'] = { $gte: priceStart, $lte: priceEnd };
      } else {
        objSearch[reqKey] = new RegExp(req.body[reqKey], 'i');
      }
    }

    let foundCars = await Car.find(objSearch);
    // Если результат поиска пустой - останавливаем работу.
    if (foundCars.length === 0) return res.end();

    // YANDEX.MAP
    if (req.body.location?.length && req.body.distance.length) {
      foundCars = findCarsWithLoc(
        req.body.location,
        Number(req.body.distance),
        foundCars
      );
      console.log('findCarsWithLoc', foundCars);
    }
    // console.log('==result==', foundCars);

    return res.json(JSON.stringify(foundCars));
  });

// ФУНКЦИИ
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function findCarsWithLoc(center, distance, arrayOfCars) {
  // center = [xx.xxxx,yy.yyyy]
  let lon1 =
    center[0] - distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0); // 1 градус широты = 111 км
  let lon2 =
    center[0] + distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0);

  let lat1 = center[1] - distance / 111.0;
  let lat2 = center[1] + distance / 111.0;

  arrayOfCars = arrayOfCars.filter((car) => {
    return car.location[0] > lon1 && car.location[0] < lon2;
  });
  arrayOfCars = arrayOfCars.filter((car) => {
    return car.location[1] > lat1 && car.location[1] < lat2;
  });

  return arrayOfCars;
}

module.exports = router;
