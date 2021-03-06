/* eslint-disable prefer-template */
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const dbConnect = require('./dbConnect.js');
const Car = require('./src/models/car');
const Deal = require('./src/models/deal');

dbConnect();

const gearbox = ['manual', 'automatic'];

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

/* SEED машинок
async function seeder() {
  for (let index = 0; index < 20; index += 1) {
    const priceDay = randomInteger(1000, 5000);
    let car = new Car({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      gearbox: gearbox[randomInteger(0, 1)],
      ac: String(faker.random.boolean()),
      seats: String(randomInteger(2, 7)),
      type: faker.vehicle.type(),
      color: faker.vehicle.color(),
      year: String(randomInteger(1980, 2020)),
      description: faker.commerce.productDescription(),
      price: {
        day: priceDay,
        week: Math.floor(priceDay * 0.9),
        month: Math.floor(priceDay * 0.8),
      },
    });

    await car.save();
  }
}

seeder();
*/

const carsArray = [];
async function deals() {
  for (let index = 0; index < 20; index += 1) {
    const priceDay = randomInteger(1000, 5000);
    const car1 = new Car({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      gearbox: gearbox[randomInteger(0, 1)],
      ac: String(faker.random.boolean()),
      seats: String(randomInteger(2, 7)),
      type: faker.vehicle.type(),
      color: faker.vehicle.color(),
      year: String(randomInteger(1980, 2020)),
      description: faker.commerce.productDescription(),
      price: {
        day: priceDay,
        week: Math.floor(priceDay * 0.9),
        month: Math.floor(priceDay * 0.8),
      },
      location: [
        Number('55.' + String(randomInteger(1, 99999999999999))),
        Number('37.' + String(randomInteger(1, 99999999999999))),
      ],
    });
    carsArray.push(car1);
    // eslint-disable-next-line no-await-in-loop
    await car1.save();
  }

  const deal1 = new Deal({
    donor: '5f5a65d8fbe484959ef500cc', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f592379292b58a1a86c9429', // сюда тоже
    car: carsArray[0],
    signingDate: new Date('2020-09-05T03:24:00'),
    rentStart: new Date('2020-09-15T03:24:00'),
    rentStop: new Date('2020-09-26T03:24:00'),
  });
  await deal1.save();

  const deal2 = new Deal({
    donor: '5f5a65d8fbe484959ef500cc', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f592379292b58a1a86c9429', // сюда тоже
    car: carsArray[4],
    signingDate: new Date('2020-09-06T03:24:00'),
    rentStart: new Date('2020-10-15T03:24:00'),
    rentStop: new Date('2020-10-30T03:24:00'),
  });
  await deal2.save();

  const deal3 = new Deal({
    donor: '5f592379292b58a1a86c9429', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f5a65d8fbe484959ef500cc', // сюда тоже
    car: carsArray[6],
    signingDate: new Date('2020-09-01T03:24:00'),
    rentStart: new Date('2020-11-01T03:24:00'),
    rentStop: new Date('2020-11-25T03:24:00'),
  });
  await deal3.save();

  const deal4 = new Deal({
    donor: '5f5b76fbee1b043eae5bef24', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f5b78828194bb0fcce41dd0', // сюда тоже
    car: carsArray[8],
    signingDate: new Date('2020-09-01T03:24:00'),
    rentStart: new Date('2020-11-01T03:24:00'),
    rentStop: new Date('2020-11-25T03:24:00'),
  });
  await deal4.save();
}

deals();
