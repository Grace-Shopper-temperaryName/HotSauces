"use strict";

const {
  db,
  models: { Customer, HotSauce, Order, OrderHotSauce },
} = require("../server/db");

const { customerData, hotSaucesData, orderData } = require("./seedFile");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Customers
  const customers = await Promise.all(
    customerData.map((customer) => {
      return Customer.create(customer);
    })
  );

  // Creating HotSauces
  const hotSauces = await Promise.all(
    hotSaucesData.map((hotSauce) => {
      return HotSauce.create(hotSauce);
    })
  );

  // Creating Orders
  const orders = await Promise.all(
    orderData.map((order) => {
      return Order.create(order);
    })
  );

  // How to see all Magic Methods
  // console.log("MAGIC METHODS", Object.keys(Order.prototype));

  /*
  Waiting for clarification from Johanna on Magic Methods

  for (let i = 0; i < orders.length; i++) {
    const randomIndex = Math.floor(Math.random() * hotSauces.length - 1) + 1;
    const randomQuantity = Math.floor(Math.random() * 10) + 1;
    const order = orders[i];
    const hotSauce = hotSauces[randomIndex];
    await OrderHotSauce.create({
      quantity: randomQuantity,
      orderId: order.id,
      hotSauceId: hotSauce.id,
    });
  }

  for (let i = 0; i < orders.length; i++) {
    const randomIndex = Math.floor(Math.random() * hotSauces.length - 1) + 1;
    const randomQuantity = Math.floor(Math.random() * 10) + 1;
    const order = orders[i];
    const hotSauce = hotSauces[randomIndex];
    await OrderHotSauce.create({
      quantity: randomQuantity,
      orderId: order.id,
      hotSauceId: hotSauce.id,
    });
  }
  */

  console.log(`seeded ${customers.length} customers`);
  console.log(`seeded ${hotSauces.length} hot sauces`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
