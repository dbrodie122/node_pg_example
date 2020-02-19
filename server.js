const db = require('./db/db');
const authorQueries = require('./db/authorQueries');
const articleQueries = require('./db/articleQueries');

db.sync().then(async () => {
  console.log('synced');
  const data = await articleQueries.readArticles();
  const id = data[0].id;
  console.log(await articleQueries.readArticleByTitle('Harry'));
});
