db.boxOffice.find({
  $and: [{ 'meta.rating': { $gt: 9.2 } }, { 'meta.runtime': { $lt: 100 } }],
});

db.boxOffice.find({ genre: { $in: ['action', 'drama'] } });

db.boxOffice.find({ $expr: { $gt: ['$visitors', '$expectedVisitors'] } });

db.users.insertMany([
  {
    name: 'reajn bajracharya',
    age: 22,
    hobbies: [
      { title: 'test', frequency: 4 },
      { title: 'coding', frequency: 5 },
    ],
  },
  { name: 'test', age: 1, hobbies: [{ title: 'title', frequency: 1 }] },
]);
