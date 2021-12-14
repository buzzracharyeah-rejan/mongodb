// db.runCommand({
//   collMod: 'posts',
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: ['title', 'text', 'comments'],
//       properties: {
//         title: {
//           bsonType: 'string',
//           description: 'must have a title and is required',
//         },
//         text: {
//           bsonType: 'string',
//           description: 'must have a text and is required',
//         },
//         comments: {
//           bsonType: 'array',
//           required: 'must have an array and is required',
//           items: {
//             bsonType: 'object',
//             required: ['text', 'author'],
//             properties: {
//               text: {
//                 bsonType: 'string',
//                 description: 'must have a text and is required',
//               },
//               author: {
//                 bsonType: 'objectId',
//                 description: 'must have an objectId and is required',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   validationAction: 'warn',
// });

db.runCommand({
  collMod: 'posts',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must have a title and is required',
        },
        text: {
          bsonType: 'string',
          description: 'must have a text body and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'must have a creator and is required',
        },
        comments: {
          bsonType: 'array',
          description: 'must have comments and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must have a text and is required',
              },
              author: {
                bsonType: 'objectId',
                description: 'must have an object Id and is required',
              },
            },
          },
        },
      },
    },
  },
  validationAction: 'warn',
});
