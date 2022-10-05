# Answers Preparation 1

## B1

Command

```js
db.unicorns.find({
  loves: { $all: ["watermelon", "apple"] },
});
```

Result

```json
[
  {
    "_id": {
      "$oid": "5bbc54ca9fa5e40a39fffc4b"
    },
    "name": "Leia",
    "dob": {
      "$date": "2001-10-08T12:53:00.000Z"
    },
    "loves": ["apple", "watermelon"],
    "weight": 601,
    "gender": "f",
    "vampires": 33
  },
  {
    "_id": {
      "$oid": "5bbc54ca9fa5e40a39fffc4c"
    },
    "name": "Pilot",
    "dob": {
      "$date": "1997-03-01T04:03:00.000Z"
    },
    "loves": ["apple", "watermelon"],
    "weight": 650,
    "gender": "m",
    "vampires": 54
  }
]
```

The following is **dangerous**

```js
db.unicorns.find({ loves: ["apple", "watermelon"] });
```

It returns the same result because this matches the exact order (of `['apple', 'watermelon']`) and that is probably not what you want.

Imagine you've switched the order of the array (to be like `['watermelon', 'apple']`). So the command would be:

```js
db.unicorns.find({ loves: ["watermelon", "apple"] });
```

In this case the result will be none.

However, when using the `$all` operator the order doesn't matter.

```js
db.unicorns.find({
  loves: { $all: ["apple", "watermelon"] },
});
```

This would still get you the same result as the very first query.

## B2

Command

```js
db.unicorns.find({
  loves: { $size: 1 },
});
```

Result

```json
[
  {
    "_id": {
      "$oid": "5bbc54c99fa5e40a39fffc46"
    },
    "name": "Roooooodles",
    "dob": {
      "$date": "1979-08-18T16:44:00.000Z"
    },
    "loves": ["apple"],
    "weight": 575,
    "gender": "m",
    "vampires": 99
  }
]
```

## B3

The implicit `and` operation doesn't work on queries with multiple expressions with the same operator or the same field.

[See the reference of $and in the mongodb doc for some examples](https://docs.mongodb.com/manual/reference/operator/query/and/#examples)

## B4

Command

```js
db.unicorns.find({
  $or: [
    {
      $and: [{ loves: { $nin: ["apple"] } }, { vampires: { $lt: 50 } }],
    },
    { weight: 601 },
  ],
});
```

This also works (so the extra $and is not required in this situation)

```js
db.unicorns.find({
  $or: [
    {
      loves: { $nin: ["apple"] },
      vampires: { $lt: 50 },
    },
    {
      weight: 601,
    },
  ],
});
```

Result

```json
[
  {
    "_id": {
      "$oid": "5bbc54c99fa5e40a39fffc44"
    },
    "name": "Aurora",
    "dob": {
      "$date": "1991-01-24T12:00:00.000Z"
    },
    "loves": ["carrot", "grape"],
    "weight": 450,
    "gender": "f",
    "vampires": 43
  },
  {
    "_id": {
      "$oid": "5bbc54c99fa5e40a39fffc48"
    },
    "name": "Ayna",
    "dob": {
      "$date": "1998-03-07T07:30:00.000Z"
    },
    "loves": ["strawberry", "lemon"],
    "weight": 733,
    "gender": "f",
    "vampires": 40
  },
  {
    "_id": {
      "$oid": "5bbc54c99fa5e40a39fffc49"
    },
    "name": "Kenny",
    "dob": {
      "$date": "1997-07-01T08:42:00.000Z"
    },
    "loves": ["grape", "lemon"],
    "weight": 690,
    "gender": "m",
    "vampires": 39
  },
  {
    "_id": {
      "$oid": "5bbc54ca9fa5e40a39fffc4b"
    },
    "name": "Leia",
    "dob": {
      "$date": "2001-10-08T12:53:00.000Z"
    },
    "loves": ["apple", "watermelon"],
    "weight": 601,
    "gender": "f",
    "vampires": 33
  }
]
```
