db.users.updateOne(
  { _id: ObjectId('61b19620563b150899bbe9dd') },
  { $inc: { age: 10 } }
);

db.users.updateOne(
  { _id: ObjectId('61b19620563b150899bbe9dd') },
  { $set: { age: 30 } }
);

//? you can use $inc and $set in relation as long as
//!there is no conflict eg: can't inc and set age at the same time.

db.users.updateOne(
  { _id: ObjectId('61b19620563b150899bbe9dd') },
  {
    $inc: { age: -10 },
    $set: { phone: 34243242 },
  }
);

db.users.updateOne({ age: { $gt: 30 } }, { $inc: { age: 1 } });
//? alternative way
db.users.updateOne({ name: 'Chris' }, { $min: { age: 35 } });
db.users.updateOne({ name: 'Chris' }, { $mul: { age: 1.1 } });

db.runCommand({
  collMod: 'users',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        age: {
          bsonType: 'number',
        },
      },
    },
  },
});

//? drop a field
db.users.updateMany({}, { $unset: { phone: '' } });

//? rename a field
db.users.updateMany({}, { $rename: { name: 'username' } });

//? upsert a document
db.users.updateOne(
  { name: 'rejan bajracharya' },
  {
    $set: {
      username: 'rejan bajracharya',
      age: 22,
      hobbies: [
        {
          title: 'good coding',
          frequency: 5,
        },
      ],
    },
  },
  { upsert: true }
);

db.sports.updateMany({}, { $set: { title: 'football', requiresTeam: true } });

db.sports.updateMany({ requiresTeam: true }, { $set: { players: 10 } });
db.sports.updateMany({ requiresTeam: true }, { $min: { players: 10 } });

db.users.find;

db.users.find({
  $and: [{ 'hobbies.title': 'Sports', 'hobbies.frequency': { $gt: 2 } }],
});

db.users.find({
  hobbies: { $elemMatch: { title: 'Sports', frequency: { $gt: 2 } } },
});

db.users.updateOne(
  {
    hobbies: { $elemMatch: { title: 'Sports', frequency: { $gt: 2 } } },
  },
  {
    $set: {
      title: 'sports',
      frequency: 6,
    },
  }
);

db.users.updateOne(
  {
    hobbies: { $elemMatch: { title: 'Sports', frequency: { $gt: 2 } } },
  },
  {
    $set: {
      hobbies: [{ title: 'Sports', frequency: 10 }],
    },
  }
);

//? update the element in the array
db.users.updateMany(
  {
    hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 2 } } },
  },
  {
    $set: {
      'hobbies.$.goodFrequency': 5,
    },
  }
);

//? inc the frequency by 5 for hobbies: {$elemMatch: {title: 'Sports', frequency: {$gte: 5}} }
db.users.updateMany(
  {
    hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 2 } } },
  },
  { $unset: { frequency: '', isDead: '' } }
);

// inc by 1 for the given match
db.users.updateMany(
  {
    hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 2 } } },
  },
  {
    $inc: {
      'hobbies.$.frequency': 1,
    },
  }
);

db.users.updateMany(
  { 'hobbies.title': 'Sports' },
  { $set: { 'hobbies.$.frequency': 5 } }
);
db.users.find({
  hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 2 } } },
});

db.users.updateMany(
  {
    hobbies: { $elemMatch: { title: 'Sports' } },
  },
  {
    $set: {
      'hobbies.$.frequency': 10,
    },
  }
);

db.users.updatemany(
  { 'hobbies.$.frequency': { $gt: 2 } },
  {
    $set: {
      'hobbies.$.goodfrequency': true,
    },
  }
);

//! update the hobbies array if the frequency is $gt 2
db.users.updateMany(
  { 'hobbies.frequency': { $gt: 2 } },
  { $set: { 'hobbies.$.goodFrequency': true } }
);

db.users.updateMany(
  {
    age: { $gt: 20 },
  },
  {
    $inc: {
      'hobbies.$.frequency': 1,
    },
  }
);

db.users.updateMany(
  { 'hobbies.frequency': { $lt: 5 } },
  { $set: { 'hobbies.[el].goodFrequency': false } }
);

db.users.updateMany(
  {
    'hobbies.frequency': { $lt: 5 },
  },
  {
    $set: {
      'hobbies.$[el].goodFrequency': false,
    },
  },
  { arrayFilters: [{ 'el.frequency': { $lt: 5 } }] }
);

db.users.updateOne(
  {},
  {
    $push: {
      hobbies: {
        $each: [
          { title: 'something', frequency: 1, goodFrequency: true },
          { title: 'something', frequency: 1, goodFrequency: true },
        ],
      },
    },
  }
);

//! this push array as a element

db.users.updateOne(
  {},
  {
    $push: {
      hobbies: [
        { title: 'something', frequency: 1, goodFrequency: true },
        { title: 'something', frequency: 1, goodFrequency: true },
      ],
    },
  }
);

//? use addToSet alike maps in js
db.users.updateMany({}, { $addToSet: { hobbies: { title: 'good coding' } } });

//? find people with age greater than 60 and less than 70
db.contacts.find({ $and: [{ 'dob.age': { $gt: 60, $lt: 70 } }] });

db.contacts.find({
  $and: [{ 'dob.age': { $gt: 60 } }, { 'dob.age': { $lt: 70 } }],
});

db.users.updateMany(
  { 'hobbies.frequency': { $gt: 3 } },
  {
    $set: {
      'hobbies.$[el].goodFrequency': true,
    },
  },
  { arrayFilters: [{ 'el.frequency': { $gt: 3 } }] }
);

//? multi key indexes
db.contacts.createIndex({ hobbies: 1 });
db.contacts.createIndex({ 'addressses.street': 1 });
