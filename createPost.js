db.posts.insertOne({
  title: 'test',
  text: 'something went wrong',
  creator: ObjectId('61aef44e9b6a74371aefe9cd'),
  comments: {
    text: 'some comments went wrong',
    author: ObjectId('61aef44e9b6a74371aefe9cd'),
  },
});
