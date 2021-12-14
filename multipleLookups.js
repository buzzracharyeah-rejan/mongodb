db.posts.aggregate([
  {
    $lookup: {
      from: 'comments',
      localField: 'comments',
      foreignField: '_id',
      as: 'user_comments',
    },
  },
  { $unwind: '$user_comments' },
  {
    $lookup: {
      from: 'users',
      localField: 'user_comments.owner',
      foreignField: '_id',
      as: 'user_details',
    },
  },
  {
    $project: {
      name: '$user_details.name',
      age: '$user_details.age',
      email: '$user_details.email',
      title: 1,
      text: 1,
      tags: 1,
      text: '$user_comments.text',
    },
  },
]);
