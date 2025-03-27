const stripe = require("stripe")(
  "sk_test_51QlEG8KVl4I8RJEmoFm6R9bn96TNZAaPjYwbMXoqIjSoVkLqGrg0BkSVnx9U7HKKv1Wyto8yaZyShf6VIAsmOsKq00Vs0Q3cb3",
);

stripe.products
  .create({
    name: "Starter Subscription",
    description: "$12/Month subscription",
  })
  .then((product) => {
    stripe.prices
      .create({
        unit_amount: 1200,
        currency: "usd",
        recurring: {
          interval: "month",
        },
        product: product.id,
      })
      .then((price) => {
        console.log(
          "Success! Here is your starter subscription product id: " +
            product.id,
        );
        console.log(
          "Success! Here is your starter subscription price id: " + price.id,
        );
      });
  });
