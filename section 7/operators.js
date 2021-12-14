db.movies.find({
  $nor: [{ 'rating.average': { $lt: 5 } }, { 'rating.average': { $gte: 9 } }],
});

//? query to find high quality dramas whose rating is gte 9
db.movies.find({
  $or: [{ 'rating.average': { $gte: 9 } }, { genres: ['Drama'] }],
});

db.movies.find({ genre: { $in: ['Drama', 'Horror'] } });

// db.movies.find({ $not: { runtime: 60 } });

//? find the movies whose runtime is not equal to 60
db.movies.find({ runtime: { $not: { $eq: 60 } } });

db.users.insertMany([
  {
    name: 'Rejan',
    age: 22,
    hobbies: [
      { title: 'Coding', frequency: 5 },
      { title: 'cooking', frequency: 0 },
    ],
  },
  {
    name: 'MaX',
    age: 30,
    hobbies: [
      {
        title: 'something',
        frequency: 10,
      },
      { title: 'something went wrong', frequency: 20 },
    ],
  },
]);

//? create the collection using schema validation

db.runCommand({
  collMod: 'users',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'age', 'hobbies'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must have a string and is required',
        },
        age: {
          bsonType: 'number',
          minimum: 0,
          maximum: 150,
          description: 'must have a age and is required',
        },
        hobbies: {
          bsonType: 'array',
          description: 'must have an array and is required',
          required: ['title', 'frequency'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must have a title and is required',
            },
            frequency: {
              bsonType: 'number',
              description: 'must have a frequency and is required',
            },
          },
        },
      },
    },
  },
});

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'age', 'hobbies'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must have a string and is required',
        },
        age: {
          bsonType: 'number',
          description: 'must have a age and is required',
        },
        hobbies: {
          bsonType: 'array',
          description: 'must have an array and is required',
          required: ['title', 'frequency'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must have a title and is required',
            },
            frequency: {
              bsonType: 'number',
              description: 'must have a frequency and is required',
            },
          },
        },
      },
    },
  },
});

//? $type element operator
db.users.find({ phone: { $type: 'string' } });

db.movies.find({ summary: { $regex: /musical/ } });

//? use use $expr to perform some operations
db.supplies.find({
  $expr: {
    $lte: [
      {
        $cond: {
          if: { $gte: ['$qty', 100] },
          then: { $multiply: ['$price', 0.5] },
          else: { $multiply: ['$price', 0.75] },
        },
      },
      5,
    ],
  },
});

db.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ['$volume', 190] },
          then: { $subtract: ['$volume', 10] },
          else: '$volume',
        },
      },
      '$target',
    ],
  },
});
//! how to view validation error description on the log flie
