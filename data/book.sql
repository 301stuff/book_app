DROP TABLE IF EXISTS books;

CREATE TABLE books (
id SERIAL PRIMARY KEY,
author VARCHAR(255),
title VARCHAR(255),
isbn VARCHAR(30), 
image_url VARCHAR(255),
description TEXT,
bookshelf VARCHAR(255)
);

INSERT INTO books (author, title, isbn, image_url, description, bookshelf)
VALUES ('test author1', 'test title1', 'test isbn1', 'https://books.google.com/books/content?id=1Vs9AwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'test description1', 'test bookshelf1'),
('test author2', 'test title2', 'test isbn2', 'https://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'test description2', 'test bookshelf2');