const client = require('./db').client;

const readAuthors = async () => {
  const SQL = 'SELECT * FROM author';
  const result = await client.query(SQL);
  return result.rows;
};

const readAuthorById = async authorId => {
  const SQL = 'SELECT * FROM author where id = $1';
  const result = await client.query(SQL, [authorId]);
  return result.rows;
};

const readAuthorByFullName = async (firstName, lastName) => {
  const SQL = 'SELECT * FROM author where first_name = $1 and last_name = $2';
  const result = await client.query(SQL, [firstName, lastName]);
  return result.rows;
};
const deleteAuthor = async authorId => {
  const getArticlesSql = 'SELECT  * FROM article where author_id = $1';
  const result = await client.query(getArticlesSql, [authorId]);
  const articles = result.rows;
  if (articles.length > 0) {
    return;
  }
  const SQL = 'DELETE FROM author WHERE id = $1';
  await client.query(SQL, [authorId]);
};

const createAuthor = async (firstName, lastName) => {
  const SQL =
    'INSERT INTO author (id, first_name, last_name) VALUES (uuid_generate_v4(), $1, $2) RETURNING  *';
  const result = client.query(SQL, [firstName, lastName]);
  return result.rows;
};

const updateAuthor = async (firstName, lastName, id) => {
  const SQL =
    'UPDATE author SET first_name = $1,  last_name = $2 where  id = $3 RETURNING *';
  const result = client.query(SQL, [firstName, lastName, id]);
  return result.rows;
};

/*
readArticles (reads articles)
readArticle (reads one article)
deleteArticle (deletes an article)
createArticle (creates an article)
updateArticle (updates an article)
*/
module.exports = {
  readAuthors,
  readAuthorById,
  readAuthorByFullName,
  deleteAuthor,
  createAuthor,
  updateAuthor
};
