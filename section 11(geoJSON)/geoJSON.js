db.places.insertOne({
  type: 'point',
  coords: [27.687313553457777, 85.31499785075228],
});

db.places.insertOne({
  name: 'EBPearls',
  location: {
    type: 'Point',
    coordinates: [85.31572217434602, 27.68734644504298],
  },
});

//! find locations near me
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [85.31592647074424, 27.688431861796087],
      },
      $maxDistance: 500,
      $minDistance: 10,
    },
  },
});

db.places.createIndex({ location: '2dsphere' });

db.places.insertMany([
  {
    name: 'Norvic Hospital',
    location: {
      type: 'Point',
      coordinates: [85.31927641377612, 27.69019229259396],
    },
  },
  {
    name: 'Hotel Himalaya',
    location: {
      type: 'Point',
      coordinates: [27.69019229259396, 85.31927641377612],
    },
  },
  {
    name: 'Bricks Cafe',
    location: {
      type: 'Point',
      coordinates: [27.69019229259396, 85.31927641377612],
    },
  },
]);

const p1 = [85.31529965429893, 27.68734346881708];
const p2 = [85.31819767163907, 27.68579837357211];
const p3 = [85.31561069804486, 27.684575717492205];
const p4 = [85.31410099791219, 27.686295493558188];

db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});

db.places.insertOne({
  name: 'test',
  area: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
});

//! create a 2dsphere index
db.places.createIndex({ area: '2dsphere' });

//? find whether the point lies within the polygon
db.places.find({
  area: {
    $geoIntersects: {
      $geometry: {
        type: 'Point',
        coordinates: [85.31588380962665, 27.686812764654526],
      },
    },
  },
});

//! find me areas within the 10 mile radius
db.places.find({
  location: {
    $geoWithin: {
      $centerSphere: [[85.31510240704543, 27.687041169293813], 10 / 3963.2],
    },
  },
});
