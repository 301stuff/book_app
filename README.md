# book_app
test
**Author**: Morgan T Shaw, Anastasia Lebedeva
**Version**: 1.0.0

## Overview

## Getting Started

## Architecture
HTML, CSS, jQuery, Java Script used for the front end of this app. 
Java Script, Express, Dotenv, Superagent, Cors for the backend

## Credentials
https://stackoverflow.com/questions/4190885/converting-url-to-https-via-javascript


## Change Log

# Feature #1: 
***
## As a user, I want my application to load quickly so that I have an enjoyable experience.
***
* Estimate of time needed to complete: **30minutes**
* Start time: **5pm**
* Finish time: ****
* Actual time needed to complete: ****

## **Driver:  ** 
## **Navigator: ** 
***

# Feature #2:
***
##  As a user, I want to search the Google Books API so that I can view the results of my search.
***
* Estimate of time needed to complete: **1hour**
* Start time: **pm**
* Finish time: **pm**
* Actual time needed to complete: ****

## **Driver:  ** 
## **Navigator: ** 
***

# Feature #3:
***
## As a user, I want to be able to browse the search results.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

# Feature #4:
***
## As a user, I want to view any error messages that occur during the usage of my book list application so that I know if something has gone wrong.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***


# Feature #5:
***
## As a user, I want a simple, clean looking UI so that my application is easy to navigate.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

# Feature #6:
***
##  STRETCH: As a developer, I want to completely style my website
***
* Estimate of time needed to complete: **2hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

<!-- This is the readme for Lab 12! -->
#lab 12 :

# Feature #1:
***
##  As a user, I want all of my saved books to be displayed on the home page so that I can view all of the books from my collection in a single view.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

# Feature #2:
***
##  As a user, I want to request information about a single book so that I can view its additional details and share it by URL.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

# Feature #3:
***
##  As a user, I want the ability to change details of a single book from the search results so that I can write in my custom details and assign the book to a bookshelf.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

# Feature #4:
***
##  As a user, I want the ability to add new books to my application so that my collection continues to grow.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

# Feature #5:
***
##  As a user, I want the application to be designed in a consistent way so that I do not experience any down time or slow load times.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***
# Feature #6:
***
##  6. As a user, I want a simple, clean-looking UI so that my application is easy to navigate.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***
# Feature #7:
***
##  7. STRETCH: As a developer, I want to explore further functionality so that I can continue to improve the user's experience.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***
# Feature #8
***
##  8. STRETCH: As a developer, I want to automatically populate the database so my application is functioning efficiently.
***
* Estimate of time needed to complete: **1hour**
* Start time: ** **
* Finish time: ** **
* Actual time needed to complete: ** **

## **Driver:** 
## **Navigator:** 
***

## **schema file:**
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
VALUES ('test author1', 'test title1', 'test isbn1', 'test image_url1', 'test description1', 'test bookshelf1'),
('test author2', 'test title2', 'test isbn2', 'test image_url2', 'test description2', 'test bookshelf2');


#Image Sources:
https://unsplash.com/photos/jR4Zf-riEjI
Photo by Andrew Ridley on Unsplash