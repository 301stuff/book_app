'use strict';

//=====================Global Variables and appplication dependensies=================================//

const express = require('express');
const app = express();

//add cors and superagent
const cors = require('cors');
app.use(cors());

const superagent = require('superagent');
require('dotenv').config();

//add Database
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('./public/../'));

//this what returns data from our form as json object.
app.use(express.urlencoded({extended:true}));

//decalring our PORT variable
const PORT = process.env.PORT || 3000;

// tell our express server to start listening on port PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//=======================================================================================//


//=====================================ROUTES================================================//

//initial page (file index.ejs)
app.get('/', getBooks);


app.get('/books/:id', getBookDetails);

app.post('/books', postBook);

//new search page (file searches/new.ejs)
app.get('/search',(request, response)=>{
  response.render('pages/searches/new');
});

//post search results (file searches/show.ejs)
app.post('/search', postSearch);
//request for singular book


//bad request error handle
app.get('*', (request, response)=>{
  response.render('pages/error');
});


//=======================================Constructor Functions==============================================//
//book constructor
function Book(data) {
  this.title = (data.title) ? data.title : 'No title found';
  // this.image = data.imageLinks.thumbnail.replace(/^http:/, 'https:'));
  this.author = (data.authors) ? data.authors : 'No Author found';

  this.description = (data.description) ? data.description : 'No description';
  this.image_url = (data.imageLinks) ? data.imageLinks.thumbnail.replace(/^http:/, 'https:') : './public/styles/book-icon-139.png';
  this.isbn = (data.industryIdentifiers) ? data.industryIdentifiers[0].identifier : 'No ISBN';
}

//=======================================================================================================//

//=======================================Functions=========================================================//

//gets books from the database
function getBooks(request, response){
  let SQL = `SELECT * FROM books`;
  return client.query(SQL)

    .then(result => {
      // console.log(result);
      if(result.rowCount > 0 ) {
        // console.log("results:", result);
        response.render('pages/index', {booksDb: result.rows});
      }
    });
}

//get details about single book
function getBookDetails(request, response){
  let id = request.params.id;
  console.log('id: ', id);
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  client.query(SQL, [id])
    .then(res=> {
      if(res.rowCount > 0) {
        response.render('./pages/books/showBook', {bookDetail: res.rows});
      } else {
        response.render('pages/error');

      }

    });
}

//search google books api
function postSearch(request, response){
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if(request.body.search[1] === 'author') {url += `inauthor:${request.body.search[0]}&maxResults=10`;}
  if(request.body.search[1] === 'title') {url += `intitle:${request.body.search[0]}&maxResults=10`;}
  // console.log('search', url);
  superagent.get(url)

    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => {

      response.render('pages/searches/showSearchResults', {searchResults: results});

    })

    .catch(error => {
      console.log(error);
      response.render('pages/error');

    });
}


//add  book to database from search form
function postBook(request, response){

  const SQL = `INSERT INTO books(author, title, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  const values = [request.body.addBooks[1], request.body.addBooks[0], request.body.addBooks[3], request.body.addBooks[5]=== './public/styles/book-icon-139.png' ? `../../../${request.body.addBooks[5]}` : request.body.addBooks[5], request.body.addBooks[2], request.body.addBooks[4]];

  return client.query(SQL, values)
    .then(res=>{
      if(res.rowCount >0){
        response.redirect(`/books/${res.rows[0].id}`);
      }

    })
    .catch(errorHandle);

}

function errorHandle(error, response){
  response.redirect('pages/error', {error: error});
}





