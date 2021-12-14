db.posts.updateOne(
  { _id: ObjectId('61aef7ff7ca18c008581c512') },
  {
    $set: {
      comment: [
        {
          text: 'woah, its beautiful',
          author: ObjectId('61aef75c7ca18c008581c511'),
        },
        {
          text: 'Still remember this place',
          author: ObjectId('61aef75c7ca18c008581c50f'),
        },
      ],
    },
  }
);
