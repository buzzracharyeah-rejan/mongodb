db.contacts.createIndex({
  'dob.age': 1,
  gender: 1,
});

db.contacts.dropIndex({ 'dob.age': 1, gender: 1 });

db.contacts
  .find({ 'dob.age': { $gt: 30 } })
  .sort({ gender: 1 })
  .explain('executionStats');

db.contacts.createIndex({ email: 1 }, { unique: true });

//? create partial filters expressions
db.contacts.createIndex(
  { 'dob.age': 1 },
  { partialFilterExpression: { 'dob.age': { $gt: 60 } } }
);

db.contacts.createIndex(
  { 'dob.age': 1 },
  {
    partialFilterExpression: {
      gender: 'male',
    },
    name: 'partialFilter',
  }
);

//? partial filters coherent with $exists
db.users.createIndex(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true }, name: 'email_unique' },
  }
);

//! TTL
db.sessions.insertOne({ data: 'fdasfsd', createdAt: new Date() });

db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });

db.customers.createIndex({ age: 1, name: 1 });

//! create a text indexing
db.products.insertMany([
  { title: 'test', description: 'something went wrong' },
  {
    title: 'some book',
    description: 'this is an awesome book',
  },
  { title: 'T-shirt', description: 'This T-shirt is awesome' },
]);
db.products.createIndex({ description: 'text' });

db.products.find({ $text: { $search: 'something' } });

db.products.find({ description: { $regex: /awesome/ } });

//! working with text indexes
db.products.insertMany([
  {
    title: 'A book',
    description: 'This is an awesome book about an young artist',
  },
  { title: 'T-Shirt', description: 'This T-shirt is awesome' },
]);

//? create a new text index
db.products.createIndex({ description: 'text' });

//? search for the word 'awesome'
db.products.find({ $text: { $search: 'awesome' } });

//? how to exculde words 'T-shirt'
db.products.find({ $text: { $search: 'awesome -T-shirt' } });
