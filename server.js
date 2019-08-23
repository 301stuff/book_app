'use strict';

//=====================Global Variables and appplication dependensies=================================//
let bookshelves = [];

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

const methodOverride = require('method-override');

//method override allows us to put or delete forms
app.use(methodOverride((request, response)=> {
  if(request.body && (typeof request.body === 'object') && ('_method' in request.body)){
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

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

app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);
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
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  client.query(SQL, [id])
    .then(res=> {
      if(res.rowCount > 0) {
        response.render('./pages/books/showBook', {bookDetail: res.rows});
      } 

      else {
        errorHandle(request, response);

      }
    })
    
    .catch(error => {
      errorHandle(error, response);
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
      errorHandle(error, response);
    });

    
}


//add  book to database from search form
function postBook(request, response){

  const SQL = `INSERT INTO books(author, title, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  const values = [request.body.addBooks[1], request.body.addBooks[0], request.body.addBooks[3], request.body.addBooks[5]=== './public/styles/book-icon-139.png' ? `../../../${request.body.addBooks[5]}` : request.body.addBooks[5], request.body.addBooks[2], request.body.addBooks[4]];

  return client.query(SQL, values)
    .then (addShelf())
    .then(res=>{
      if(res.rowCount >0){
        console.log(bookshelves);
        response.redirect(`/books/${res.rows[0].id}`);
      }

    })
    .catch(error => {
      errorHandle(error, response);
    });
}

function deleteBook(request, response){
  let SQL = `DELETE FROM books WHERE id=$1;`;
  let id = request.params.id;

  return client.query(SQL, [id])
    .then( response.redirect('/'))
    .catch(error => {
      errorHandle(error, response);
    });
}

function updateBook(request, response){
  
  // let {title, author, description, isbn, bookshelf, image_url, id} = request.body; 
 
  

  let SQL = `UPDATE books SET title=$1, author=$2, description=$3, isbn=$4, bookshelf=$5, image_url=$6 WHERE id=$7;`;

  // let values = [title, author, description, isbn, bookshelf, image_url, id];

 
  const values = [request.body.addBooks[0], request.body.addBooks[1], request.body.addBooks[2], request.body.addBooks[3], request.body.addBooks[4], request.body.addBooks[5]=== './public/styles/book-icon-139.png' ? `../../../${request.body.addBooks[5]}` : request.body.addBooks[5],   request.params.id]; 

  client.query(SQL, values)
    .then(update => {
      
      if(update.rowCount > 0) {
        return response.redirect(`/books/${request.params.id}`);
      }
    })
    .catch(error => {
      errorHandle(error, response);
    });
}



function errorHandle(error, response){
  response.render('pages/error');

}



//function to list all bookshelves

function addShelf(){
  let SQL = `SELECT DISTINCT bookshelf FROM books;`;
  client.query(SQL)
    .then(result=>{
      bookshelves.push(result);
    });
}

