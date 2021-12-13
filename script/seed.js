"use strict";

const {
  db,
  models: { Customer, HotSauce, Order, OrderHotSauce, Guest },
} = require("../server/db");

const {
  customerData,
  hotSaucesData,
  orderData,
  guestData,
} = require("./seedFile");

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

  // Creating Guests
  const guests = await Promise.all(
    guestData.map((guest) => {
      return Guest.create(guest);
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

  //Creating instances for orderHotSauces
  for (let i = 0; i < orders.length; i++) {
    const randomIndex1 = Math.floor(Math.random() * hotSauces.length - 1) + 1;
    let randomIndex2 = Math.floor(Math.random() * hotSauces.length - 1) + 1;
    const randomQuantity = Math.floor(Math.random() * 10) + 1;
    const order = orders[i];
    if (randomIndex1 === randomIndex2) {
      randomIndex2 = randomIndex2 + 1;
    }
    const hotSauce = hotSauces[randomIndex1];
    const hotSauce2 = hotSauces[randomIndex2];
    await OrderHotSauce.create({
      quantity: randomQuantity,
      orderId: order.id,
      hotSauceId: hotSauce.id,
    });
    await OrderHotSauce.create({
      quantity: randomQuantity,
      orderId: order.id,
      hotSauceId: hotSauce2.id,
    });
    // add each order to a random customer
    await customers[Math.floor(Math.random() * customers.length)].addOrder(
      order
    );
  }

  console.log(`seeded ${customers.length} customers`);
  console.log(`seeded ${guests.length} guests`);
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
