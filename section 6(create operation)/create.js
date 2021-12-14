//? write concern
db.test.insertOne(
  { name: 'test', description: 'some test data', isRead: false },
  { writeConcern: { w: 1, j: undefined } }
);
