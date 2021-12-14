db.users.find({
  $and: [
    {
      'hobbies.title': 'sports',
      'hobbies.frequency': { $gt: 3 },
    },
  ],
});

db.users.updateMany(
  { 'hobbies.title': 'Smoking' },
  { $set: { 'hobbies.$[rej].goodFrequency': true } },
  { arrayFilters: [{ 'rej.frequency': { $gt: 4 } }] }
);

db.boxOffice.find({
  $or: [{ genre: ['action', 'thriller'] }, { genre: ['thriller', 'action'] }],
});

db.movies.find({
  genre: { $size: 2 },
});

db.movies.find({
  'meta.aired': 2018,
});

db.movies.find({
  ratings: { $elemMatch: { $gt: 8, $lt: 10 } },
});

db.movies.find().sort({ 'rating.average': 1 });

//? find the movies whose rating is not null and sort the movie based on its rating
db.movies
  .find({ 'rating.average': { $not: { $eq: null } } })
  .sort({ 'rating.average': 1, runtime: -1 });

//? basic query projections
db.movies.findOne(
  {},
  { name: 1, genres: 1, 'schedule.time': 1, 'rating.average': 1 }
);

//? query projections in an array
db.movies.find(
  { genres: 'Horror' },
  { name: 1, rating: 1, genres: { $elemMatch: { $all: ['Drama', 'Horror'] } } }
);

//? slice the array on query projection
db.movies.find(
  {
    'rating.average': { $gt: 8 },
  },
  { name: 1, genres: { $slice: 2 } }
);
