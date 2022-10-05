# Answer – Database Modelling

```js
cart = {
  _id: ObjectId,
  user: string,
  status: string, // either 'active' or 'complete'
  products: [
    {
      name: string,
      quantity: number,
      price: number, // price of the product at the moment added to the cart
      /*
      product: ObjectId, // optional: a link to the product, in this case not needed
      */
    },
  ],
};

products = {
  _id: ObjectId,
  name: string,
  quantity: number,
  price: number,
};
```
