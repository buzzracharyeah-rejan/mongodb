//? create a user

db.createUser({
  user: 'root',
  pwd: 'root',
  roles: ['userAdminAnyDatabase'],
});

//? user auth
db.auth('root', passwordPrompt());

//? create a new user
db.createUser({
  user: 'test',
  pwd: 'test',
  roles: [{ role: 'read', db: 'analytics' }],
});

//create a database admin user
db.createUser({
  user: 'dbManager',
  pwd: 'root',
  roles: ['dbOwnerAnyDatabase'],
});

//create a developer user
db.createUser({
  user: 'dbManager',
  pwd: 'root',
  roles: ['readWriteAnyDatabase'],
});

//create a user manager
db.createUser({
  user: 'userManager',
  pwd: 'root',
  roles: ['userAdminAnyDatabase'],
});

//create a dbManager
db.createUser({
  user: 'dbManager',
  pwd: passwordPrompt(),
  roles: ['userAdminAnyDatabase', 'readWriteAnyDatabase'],
});
