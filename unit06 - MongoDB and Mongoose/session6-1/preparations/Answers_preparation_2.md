# Answers Preparation 2

## B1

The question doesn't specify exactly what should happen if the item `'yogurt'` is already present in the `loves` array. You can read this question in two different ways:

1. **Always** add the item `'yogurt'` to the `loves` array. Hence, you could have two `'yogurt'` items if one is already present in the `loves` array; _or_
1. **Only** add the item `'yogurt'` to the `loves` array if it doesn't contain the item `'yogurt'` yet.

**Note:** In the following answers we use the `update()` command which - by default - only updates one document. You can add an extra parameter `{multi: true}` to tell MongoDB to update multiple documents. Starting from version 3.4 you can also use the `updateMany()` command (and for symmetry there is also a `updateOne()` command).

### Always add item

Command

```js
db.unicorns.update({}, { $push: { loves: "yogurt" } }, { multi: true });
```

This will **always** add the item `'yogurt'` to the field `loves` (even if a value of `'yogurt'` already exists in the array). If you execute this command multiple times, there will be multiple `'yogurt'` items in the `loves` array.

The following is _not_ correct:

```js
db.unicorns.update({}, { $push: { loves: ["yogurt"] } }, { multi: true });
```

This adds the **array** `['yogurt']` as an item to the `loves` array. So, when the value of field `loves` is `['carrot', 'apple']`, then after the update this will be `['carrot', 'apple', ['yogurt']]`. Notice that the last item is an array.

However, we could use the `$each` modifier here.

```js
db.unicorns.update(
  {},
  { $push: { loves: { $each: ["yogurt"] } } },
  { multi: true }
);
```

### Only add item if not present

To ensure we don't add duplicate values, we have to treat the array like a set. We can do so by using the `$addToSet` operator.

Command

```js
db.unicorns.update({}, { $addToSet: { loves: "yogurt" } }, { multi: true });
```

Note that you can also use updateMany to update multiple documents:

```js
db.unicorns.updateMany({}, { $addToSet: { loves: "yogurt" } };
```

When using an array to specify the new items you can use the `$each` modifier.

```js
db.unicorns.update(
  {},
  { $addToSet: { loves: { $each: ["yogurt"] } } },
  { multi: true }
);
```

## B2

Command

```js
db.unicorns.update(
  {},
  { $push: { loves: { $each: [], $sort: 1 } } },
  { multi: true }
);
```

The `$sort` modifier can only be used when we also specify the `$each` modifier. Luckily we can specify an empty array `[]` for the `$each` modifier. Effectively nothing will be pushed to the array.

**Note:** Notice how the result will say it modified all documents. Even when you execute the command multiple times and the `loves` array is already sorted. This is because of the `$each: []` modifier which touches upon every document.

## B1 and B2 at once

Command

```js
db.unicorns.update(
  {},
  { $push: { loves: { $each: ["yogurt"], $sort: 1 } } },
  { multi: true }
);
```

This only works if no unicorn loves yogurt.
