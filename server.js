const db = require('./db/db');
const authorQueries = require('./db/authorQueries');
const articleQueries = require('./db/articleQueries');

db.sync().then(async () => {
  console.log('synced');
  /*
  Invoke queries here and console.log results
  */
});
