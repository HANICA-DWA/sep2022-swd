# Unit 6: MongoDB and Mongoose

## Table of Contents <!-- omit in toc -->

- [Session 6-1: Introduction to MongoDB](#session-6-1-introduction-to-mongodb)
  - [Preparation 1: MongoDB Basics](#preparation-1-mongodb-basics)
    - [Reading](#reading)
    - [Exercises](#exercises)
  - [Preparation 2: MongoDB Updating](#preparation-2-mongodb-updating)
    - [Reading](#reading-1)
    - [Exercises](#exercises-1)
  - [Preparation 3: MongoDB Finding](#preparation-3-mongodb-finding)
    - [Reading](#reading-2)
    - [Questions](#questions)
  - [Preparation 4: MongoDB](#preparation-4-mongodb)
    - [Reading](#reading-3)
    - [Questions](#questions-1)
  - [Preparation 5: Embed or link](#preparation-5-embed-or-link)
    - [One to one relation](#one-to-one-relation)
    - [One to many relation](#one-to-many-relation)
    - [Many to many relation](#many-to-many-relation)
  - [Preparation 6: Q & A](#preparation-6-q--a)
- [Session 6-2: Mongo in Node with Mongoose](#session-6-2-mongo-in-node-with-mongoose)
  - [Preparation 1: Kittens](#preparation-1-kittens)
    - [Connecting to the database](#connecting-to-the-database)
    - [Saving to the database](#saving-to-the-database)
    - [Adding methods](#adding-methods)
  - [Preparation 2: Assignment Unit 6 - 'ICA Adventure in Mongoose'](#preparation-2-assignment-unit-6---ica-adventure-in-mongoose)
    - [A1) Create a schema for `Location`](#a1-create-a-schema-for-location)
    - [A2) Create a Mongoose Model and test it](#a2-create-a-mongoose-model-and-test-it)
    - [A3) Add validation](#a3-add-validation)
    - [B1) Create a schema definition and a model for `Player`](#b1-create-a-schema-definition-and-a-model-for-player)
    - [B2) Test it](#b2-test-it)
    - [C1) Implement `GET /where` route handler](#c1-implement-get-where-route-handler)
    - [C2) Test it](#c2-test-it)
  - [Preparation 3: Q & A](#preparation-3-q--a)
  - [Classroom activities](#classroom-activities)
    - [Assignment unit 6B - 'Implementing `getLocationInformation`'](#assignment-unit-6b---implementing-getlocationinformation)
    - [Assignment unit 6C - 'Implementing `goToLocation`'](#assignment-unit-6c---implementing-gotolocation)
- [Session 6-3: Small-test](#session-6-3-small-test)
  - [Preparation](#preparation)

## Objectives <!-- omit in toc -->

- MongoDB basics
- Hands on CRUD with MongoDB
- Using MongoDB in an Express app
- Designing a MongoDB database: to embed or to reference

## Session 6-1: Introduction to MongoDB

### Preparation 1: MongoDB Basics

- Get [The Little MongoDB Book](http://openmymind.net/mongodb.pdf). You can also find this book in the 'studenten' folder of this repo.
- Import the unicorns database in Robo 3T. [See the video clip ImportUnicorns.m4v for some (silent) instructions on how to do this.](./ImportUnicorns.m4v)

#### Reading

Read Chapter 1 - The Basics (page 11) of [The Little MongoDB Book](http://openmymind.net/mongodb.pdf) and make sure you understand all of the code samples. I recommend trying some of them for yourself and figure out what the general structure of an insert operation is.

Of course this isn't supposed to be a typing exercise, so we've collected the insert operations (on page 14 and 15). You can find the file [here](./session6-1/unicorns.txt). Copy and paste the contents of this file in the mongoshell to create a database with some initial data.

#### Exercises

Do the following exercises using [the query operator reference](http://docs.mongodb.org/manual/reference/operator/query/).

_Hint:_ you can add use `.pretty()` to make the output more readable. For example:
`db.unicorns.find({}).pretty()`

- **B1:** find all unicorns that love 'watermelon' and 'apple'.
- **B2:** find all unicorns that love only one item.
- **B3:** if you want to `AND` two conditions you use a comma. There is also an `$and` operator; when would you need that?
- **B4:** find all unicorns that don't love 'apple' and killed less than 50 vampires _or_ weigh exactly 601.

[Submit your answers here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

### Preparation 2: MongoDB Updating

#### Reading

Read chapter 2 - Updating (page 19) of [The Little MongoDB Book](http://openmymind.net/mongodb.pdf).

#### Exercises

Answer the following questions using [the update operator reference](http://docs.mongodb.org/manual/reference/operator/update/)

_Hint:_ it is possible to complete both exercises with one query, however, that approach also has a drawback.

- **B1** add "yogurt" to the loves-array of all unicorns
- **B2** sort all items in the loves-array of all unicorns alphabetically.

[Submit your answers here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

### Preparation 3: MongoDB Finding

#### Reading

Read chapter 3 - Mastering Find (page 25) of [The Little MongoDB Book](http://openmymind.net/mongodb.pdf).

#### Questions

Answer these questions based on what you just read:

- **B1** What is the name of the 'thing' that the method `find` returns?
- **B2** What is the most important property of this 'thing'?
- **B3** What name does MongoDB use for specifying the fields you want to return from a `find()`?

[Submit your answers here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

### Preparation 4: MongoDB

#### Reading

Read chapter 4 of [The Little MongoDB Book](http://openmymind.net/mongodb.pdf).

#### Questions

- **B1** Does MongoDB support joins?
- **B2** Does MongoDB support schemas?
- **B3** Which important design decision do you need to make when designing a MongoDB database with multiple collections?

[Submit your answers here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

### Preparation 5: Embed or link

For each data model below decide whether you would like to embed one collection in the other (or both), or to link them using references.

Motivate your answer. You are free to use [6 Rules of Thumb for MongoDB Schema Design](http://blog.mongodb.org/post/88473035333/6-rules-of-thumb-for-mongodb-schema-design-part-3).

#### One to one relation

An Employee has one Resume and one Resume belongs to one Employee

```text
+-------------------+          +-------------------+
|     Employee      |          |      Resume       |
+-------------------+          +-------------------+
| _id: ObjectID     |          | _id: ObjectID     |
| name: String      |          | jobs: []          |
+-------------------+          | education: []     |
                               | skills: []        |
                               +-------------------+
```

[Submit your answer here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

#### One to many relation

A Character is in one Location, but a Location can have multiple Characters in it.

```text
+-------------------+          +-------------------+
|     Character     |          |     Location      |
+-------------------+          +-------------------+
| _id: ObjectID     |          | _id: ObjectID     |
| name: String      |          | name: String      |
| race: String      |          +-------------------+
| class: String     |
+-------------------+
```

[Submit your answer here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

#### Many to many relation

A Student can have multiple Semesters and a Semester can hold multiple Students.

```text
+-------------------+         +-------------------+
|      Student      |         |     Semester      |
+-------------------+         +-------------------+
| _id: ObjectID     |         | _id: String       |
| name: String      |         | name: String      |
| address: String   |         | credits: String   |
| e-mail: String    |         +-------------------+
| phones: []        |
+-------------------+
```

[Submit your answer here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

### Preparation 6: Q & A

[Please submit one question about the code, the reading sections, or any other MongoDB or Node related subject here.](https://dwa-courses.firebaseapp.com/qna_swd_6.1.html)

## Session 6-2: Mongo in Node with Mongoose

### Preparation 1: Kittens

Follow this tutorial and answer the questions. Note that this tutorial is an adaptation of the [quick start](http://mongoosejs.com/docs/index.html) on the mongoosejs website.

Before we start make sure mongoose is installed by running

```bash
npm install mongoose
```

#### Connecting to the database

Say we like fuzzy kittens and want to record every kitten we ever meet in MongoDB. The first thing we need to do is include mongoose in our project and open a connection to the kittens database on our locally running instance of MongoDB.

```javascript
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
```

Place the rest of the code below these configuration lines.

With Mongoose, everything is derived from a Schema. Let's get a reference to it and define our kittens.

```javascript
var kittySchema = mongoose.Schema({
  name: String,
});
```

So far so good. We've got a schema with one property, `name`, which will be a String. The next step is compiling our schema into a Model.

```javascript
var Kitten = mongoose.model("Kitten", kittySchema);
```

A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:

```javascript
var silence = new Kitten({ name: "Silence" });
console.log(silence.name);
```

Execute the program on a terminal with node.

> Note that the the call to `mongoose.connect` keeps the program alive, so you'll have to manually close it whenever you want to test changes to the program.

In a new terminal open a mongoshell.

> Is there any database containing kittens?

#### Saving to the database

We have a kitten. But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.
Add the code below, test your program.

```javascript
silence.save(function (err, kitten) {
  if (err) console.log(err);
  console.log(kitten.name + " saved");
});
```

Go back to you mongoshell and answer the following questions:

- What is the name of the new database containing all kittens?
- Switch to this database. What is the name of the collection in this database?
- Use this collection to find the kitten you just saved. Which fields are automatically added by Mongo or Mongoose?

Since we are saving `silence` everytime we run this script, it might be a good idea to clear the collection (using the mongoshell) whenever you want to test a change.

Let's try to add a kitten with an invalid field like this and one with a missing name field:

```javascript
var invalid = new Kitten({ name: "Invalid", age: 10 });

console.log(invalid.age);

invalid.save(function (err, kitten) {
  if (err) console.log(err);
  console.log(kitten.name + " saved");
});

var missing = new Kitten({});

console.log(missing.name);

missing.save(function (err, kitten) {
  if (err) console.log(err);
  console.log(kitten.name + " saved");
});
```

In the mongoshell find all kittens in the collection.

> How does Mongoose handle invalid, and missing fields?

#### Adding methods

Kittens can meow, so let's take a look at how to add "speak" functionality to our documents. Place the following just after the schema definition and before the definition of the model

```javascript
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};
```

We can create talking kittens! Let's save one to the database? Add:

```javascript
var fluffy = new Kitten({ name: "fluffy" });
fluffy.speak();

fluffy.save(function (err, kitten) {
  if (err) console.log(err);
  kitten.speak();
});
```

And check if fluffy speaks and is saved to the database.

### Preparation 2: Assignment Unit 6 - 'ICA Adventure in Mongoose'

Finally, we return to our ICA Adventure game and use Mongoose to model a schema and save the data to a Mongo Database.

Our data model is similar to the model in the previous exercises, but we will use only one server and store all data in one database. So we will create a collection called _players_ and a collection called _locations_.

Below you'll see the database schema. The arrow in the _players_ collection indicates that the String in `currentLocation` is a reference to a location in the `map` attribute.

```text
+-------------------------+           +---------------------+
|       Player            |           |      Location       |
+-------------------------+           +---------------------+
| _id: String             |           | _id: String         |
| name: String            |           | description: String |
| items: [String]         |           | exits: [String]     |
| currentLocation: String |-----+     +---------------------+
| map: [Location]         |<----+
+-------------------------+
```

In this assignment you will implement this schema step by step.

#### A1) Create a schema for `Location`

Inspect the folder [assignment_unit_6](./session6-2/assignment_unit_6/).

All our schema and model definitions for one collection will reside in its own file in the 'model' folder.

Open [`location.js`](./session6-2/assignment_unit_6/ica_adventure_mongoose/model/location.js) and implement a mongoose schema that corresponds to the design below.

```text
+---------------------+
|      Location       |
+---------------------+
| _id: String         |
| description: String |
| exits: [String]     |
+---------------------+
```

For an overview of the Mongoose schema syntax, see [mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html) and a guide to the Mongoose datatypes can be found here: [mongoosejs.com/docs/schematypes.html](http://mongoosejs.com/docs/schematypes.html)

#### A2) Create a Mongoose Model and test it

In the same file, define a Mongoose model called `Location` that uses the schema you've just defined. See: [mongoosejs.com/docs/models.html](http://mongoosejs.com/docs/models.html)

In Robo 3T create a database called `ica-adventure`.

We've created a file that removes all data in the database and populates it with some initial data. Such a file is called a seed-file. Run it:

```bash
node seed.js
```

And check that your database now contains the collection _locations_ with three documents.

> **Note on naming:** It is common practice to start collection names with a lower case character and use a plural form. Models on the other hand are singular and start with an upper case letter (because they resemble a class name).

#### A3) Add validation

With Mongoose, you don't have to write data validation from scratch.

See [fiznool.com/blog/2014/04/23/mongoose-validations/](http://fiznool.com/blog/2014/04/23/mongoose-validations/) for some an example of validation.

Add the following validation rule to all the fields in the locationSchema:

- The field must not be empty

#### B1) Create a schema definition and a model for `Player`

Now open [`player.js`](./session6-2/assignment_unit_6/ica_adventure_mongoose/model/player.js), create a schema definition and add a model for `Player` that uses this schema.

- You need to export the schema of location and import in player, so you can use it for the attribute `map`.
- Also add the required validation to all attributes in the schema.
- You can ignore the method definitions for now.

```text
+-------------------------+
|       Player            |
+-------------------------+
| _id: String             |
| name: String            |
| items: [String]         |
| currentLocation: String |
| map: [Location]         |
+-------------------------+
```

#### B2) Test it

In [`seed.js`](./session6-2/assignment_unit_6/ica_adventure_mongoose/seed.js) uncomment this line ‘`//return seedPlayer();`’, run the file and test whether the _players_ collection contains two players with the data from the seed file.

#### C1) Implement `GET /where` route handler

Open the file [`actions.js`](./session6-2/assignment_unit_6/ica_adventure_mongoose/routes/actions.js) in routes. This file contains two familiar route definitions. For convenience we've removed the session management code.

Implement the route handler for `GET /:player/where`. This handler should:

1. Retrieve the player from the database using the `Player` model and the name in the `:player` URL-parameter.
1. Return a JSON-object with the `currentLocation` and the names of all exits from that location.

Use [mongoosejs.com/docs/queries.html](https://mongoosejs.com/docs/queries.html) as a reference.

#### C2) Test it

Test your route handler with Postman.

For example, a GET request to [`localhost:3000/femke/where`](http://localhost:3000/femke/where) should return:

```json
{
  "description": "a town",
  "exits": ["forest", "mountain"]
}
```

[Please submit the commit-URL of your solution here.](https://dwa-courses.firebaseapp.com/assignment_swd_6.2.html)

### Preparation 3: Q & A

[Please submit one question about Mongoose or any related subject here.](https://dwa-courses.firebaseapp.com/qna_swd_6.2.html)

### Classroom activities

- **Q & A**: We'll try to answer a many of your insightful questions as time will allow.
- **Assignment 6B & 6C**

#### Assignment unit 6B - 'Implementing `getLocationInformation`'

Ideally, the code that retrieves the location information of the player's current should not reside in the route handler because it contains too much information about the database structure. The only job of the route handler should be:

1. finding the player.
1. calling methods on this player
1. returning a response that is based on the first two steps to the client.

Below you can see the Express implementation of these three steps:

```js
router.get('/:player/where', (req, res) => {
    //1. find the correct player.
    Player.findById(req.params.player).then(player => {
        //2. call the correct method from the model.
        return player.getLocationInformation();
    }).then(locationInformation => {
        //3. send back the response.
        res.json(locationInformation);
    });
```

##### Implement <!-- omit in toc -->

Move your code from the controller to the method `getLocationInformation` in the `Player` model. Because this method is an instance method, the reference to the current player is stored in the `this`-variable.

##### And test <!-- omit in toc -->

Now copy the given Expresss code above in your own controller and test your implementation of `getLocationInformation` with Postman.

You can rerun the seed-script whenever you want to reset your database to its initial state.

[Please submit the commit-URL of your solution here.](https://dwa-courses.firebaseapp.com/assignment_swd_6.2.html)

#### Assignment unit 6C - 'Implementing `goToLocation`'

Implement the method `goToLocation` in the `Player` model, implement the route handler that calls this method (e.g. `router.put('/:player/goto'`) and test it using postman.

`goToLocation` should work just like it did before, but instead of retreiving a new location from a map server, it should copy a new location from the _locations_ collection.

For example, a PUT request to `localhost:3000/femke/goto?location=forest` should return this response:

```json
{
  "description": "a forest"
}
```

and in the database the document with `_id` 'femke' should look like:

```json
{
  "_id": "femke",
  "items": [],
  "currentLocation": "forest",
  "map": [
    {
      "exits": ["forest", "mountain"],
      "_id": "town",
      "description": "a town"
    },
    {
      "exits": ["town"],
      "_id": "forest",
      "description": "a forest",
      "__v": 0
    }
  ],
  "__v": 1
}
```

[Please submit the commit-URL of your solution here.](https://dwa-courses.firebaseapp.com/assignment_swd_6.2.html)

## Session 6-3: Small-test

### Preparation

Prepare for the small test by learning:

- [Query Operations](http://docs.mongodb.org/manual/reference/operator/query/) and [Update Operations](http://docs.mongodb.org/manual/reference/operator/update/) and [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/).

- Make sure you know the terminology used to distinguish the different components of a Mongo/SQL query [found in the images in this folder](session6-1/terminology/) **_by heart_**.

- We will ask you to write basic MongoDB queries based on the ones in these documents, so make sure you can write basic find, insert, update and delete queries off the top of your head.

- Also review [6 Rules of Thumb for MongoDB Schema Design](http://blog.mongodb.org/post/88473035333/6-rules-of-thumb-for-mongodb-schema-design-part-3) and make sure you can apply these rules to select an appropriate schema for a given problem. You will **not** be asked to write down any of these rules off the top of you head.

- [mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html) and
  [mongoosejs.com/docs/models.html](http://mongoosejs.com/docs/models.html). Make sure you are able to write mongoose code for creating a schema and model based on the diagrams from section 6.2
