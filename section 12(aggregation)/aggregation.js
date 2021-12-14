db.person.aggregate([{ $match: { gender: 'female' } }]);

//? group by gender: female
db.person.aggregate([
  {
    $match: { gender: 'male' },
  },
  {
    $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } },
  },
  { $sort: { totalPersons: -1 } },
]);

//? group by state
db.person.aggregate([
  { $match: { gender: 'female' } },
  {
    $group: {
      _id: { state: '$location.state' },
    },
  },
]);

db.person.aggregate([
  { $match: { 'dob.age': { $gt: 50 } } },
  {
    $group: {
      _id: { gender: '$gender' },
      avgAge: { $avg: '$dob.age' },
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
]);

//? use the $project operator
db.person.aggregate([
  {
    $project: {
      gender: 1,
      fullname: { $concat: ['$name.first', ' ', '$name.last'] },
    },
  },
]);

//? capitalize the fullname using $substrCP and location to geoLocation
db.person.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      gender: 1,
      location: {
        type: 'Point',
        geometry: {
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
              },
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
              },
            },
          ],
        },
      },
      // dob: {$convert: {input: '$dob.date', to: 'date'}}
      dob: { $toDate: '$dob.date' },
      age: { $convert: { input: '$dob.age', to: 'double' } },
    },
  },
  {
    $project: {
      gender: 1,
      fullname: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $toLower: {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          },
          ' ',
          {
            $toUpper: {
              $substrCP: ['$name.last', 0, 1],
            },
          },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.last' }, 1] },
            ],
          },
        ],
      },
      location: 1,
      dob: 1,
      age: 1,
    },
  },
]);

//? use isoweekyear

//! usage of array operators in aggregate framework
db.friends.aggregate([
  { $unwind: '$hobbies' },
  { $group: { _id: { age: '$age' }, hobbies: { $addToSet: '$hobbies' } } },
]);

//? using projections with arrays
db.friends.aggregate([
  { $project: { examScores: { $slice: ['$examScores', 1] } } },
]);

//? get the length of an array
db.friends.aggregate([{ $project: { len: { $size: '$hobbies' } } }]);

//! use filters
db.friends.aggregate([
  {
    $project: {
      examScores: {
        $filter: {
          input: '$examScores',
          as: 'sc',
          cond: { $gt: ['$$sc.score', 60] },
        },
      },
    },
  },
]);
