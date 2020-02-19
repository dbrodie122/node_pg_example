const client = require('./db').client;
/*
deleteArticle (deletes an article)
createArticle (creates an article)
updateArticle (updates an article)
*/

const readArticles = async () => {
  const SQL = 'SELECT * FROM article';
  const result = await client.query(SQL);
  return result.rows;
};

const readArticleById = async articleId => {
  const SQL = 'SELECT * FROM article WHERE id = $1';
  const result = await client.query(SQL, [articleId]);
  return result.rows;
};

const readArticleByTitle = async title => {
  const SQL = 'SELECT * FROM article WHERE title LIKE $1 LIMIT 1';
  const result = await client.query(SQL, [`%${title}%`]);
  return result.rows;
};

const deleteArticle = async articleId => {
  const SQL = 'DELETE FROM article WHERE id = $1';
  await client.query(SQL, [articleId]);
};

const createArticle = async (title, body) => {
  const SQL =
    'INSERT INTO article (id, first_name, last_name) VALUES (uuid_generate_v4(), $1, $2) RETURNING  *';
  const result = client.query(SQL, [title, body]);
  return result.rows;
};

const updateArticle = async (title, body, id) => {
  const SQL =
    'UPDATE article SET title = $1,  body = $2 WHERE  id = $3 RETURNING *';
  const result = client.query(SQL, [title, body, id]);
  return result.rows;
};

module.exports = {
  readArticles,
  readArticleById,
  readArticleByTitle,
  deleteArticle,
  createArticle,
  updateArticle
};
