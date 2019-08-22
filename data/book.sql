DROP TABLE IF EXISTS books;

CREATE TABLE books (
id SERIAL PRIMARY KEY,
author VARCHAR(255),
title VARCHAR(255),
isbn VARCHAR(30),
image VARCHAR(255),
description TEXT,
bookshelf VARCHAR(255)
);

-- INSERT INTO books (author, title, isbn, image, description, bookshelf)
-- VALUES ('test author1', 'test title1', 'test isbn1', 'test', 'test description1', 'test bookshelf1'),
-- ('test author2', 'test title2', 'test isbn2', 'test image', 'test description2', 'test bookshelf2');