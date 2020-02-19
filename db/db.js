const { Client } = require('pg');
const client = new Client('postgres://localhost/node_pg_db');

client.connect();

const sync = async () => {
  const SQL = `
    DROP TABLE IF EXISTS article;
    DROP TABLE IF EXISTS author;
    
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE author (
      id UUID PRIMARY KEY,
      first_name VARCHAR,
      last_name VARCHAR,
      date_created TIMESTAMP default CURRENT_TIMESTAMP
      );

    CREATE TABLE article (
      id UUID PRIMARY KEY,
      author_id UUID REFERENCES author(id),
      title VARCHAR,
      body TEXT, 
      date_created TIMESTAMP default CURRENT_TIMESTAMP
      );

    INSERT INTO author (id, first_name, last_name) 
    VALUES 
    (uuid_generate_v4(), 'David', 'Brodie'), 
    (uuid_generate_v4(), 'Sherbert', 'Lemon'), 
    (uuid_generate_v4(), 'Howard', 'Roark');

    INSERT INTO article (id, author_id, title, body)
    VALUES
    (uuid_generate_v4(), (SELECT id FROM author where author.last_name = 'Brodie'), 'JavaScript Basics', 'JavaScript is a programming language that adds interactivity to your website (for example games, responses when buttons are pressed or data is entered in forms, dynamic styling, and  animation). This article helps you get started with this exciting language and gives you an idea of what is possible.'),
    (uuid_generate_v4(), (SELECT id FROM author where author.last_name = 'Lemon'), 'Passwords from Harry Potter', 'Sherbert Lemon is the password to Dumbledor''s office');
  `;

  return client.query(SQL);
};

module.exports = {
  sync,
  client
};
