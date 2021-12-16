const session = db.getMongo().startSession();
const userCol = session.getDatabase('blog').users;
const postCol = session.getDatabase('blog').posts;

//? start transaction
session.startTransaction();

//? some query operations
userCol.deleteOne({ _id: ObjectId('61bacc2c6d22cca3799b8578') });
postCol.deleteMany({ _userId: ObjectId('61bacc2c6d22cca3799b8578') });

//? to commit a transaction
session.commitTransaction();

//? to abort a transaction
session.abortTransaction();

//! transactions maintain atomicity at multi level of documents. i.e all transactions for a session are performed
//! or not at all
