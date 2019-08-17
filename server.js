'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const superagent = require('superagent');
require('dotenv').config();

//DAtabase
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));



const PORT = process.env.PORT || 3000;


//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('./public/../'));

//this what returns data fro our form as json object.
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.get('/search',(request, response)=>{
  response.render('pages/searches/new');
});

//initial page
app.get('/', getBooks);
app.get('/books/:id', getBookDetails);


function getBookDetails(request, response){
  // requset.params.id comes from /books/:id
  // let id = request.params.id ? request.params.id : request.body.id 
  let id = request.params.id;
  console.log('id: ', id)
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  client.query(SQL, [id])
    .then(res=> {
      if(res.rowCount > 0) {
        response.render('./pages/books/detail', {bookDetail: res.rows});
      }
    });
}

//Error page
app.get('/error', (request, response)=>{
  response.render('pages/error');
});

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

//search google books api
app.post('/search', (request, response)=>{
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if(request.body.search[1] === 'author') {url += `inauthor:${request.body.search[0]}&maxResults=10`;}
  if(request.body.search[1] === 'title') {url += `intitle:${request.body.search[0]}&maxResults=10`;}
  // console.log('search', url);
  superagent.get(url)

    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => {
    
      response.render('pages/searches/show', {searchResults: results});
      
    }
    )
  
    .catch(error => {
      console.log(error);
      response.render('pages/error');
      //response.render('pages/error', {error: error});
    });

});
//book constructor
function Book(data) {
  this.title = (data.title) ? data.title : 'No title found';
  // this.image = data.imageLinks.thumbnail.replace(/^http:/, 'https:'));
  this.author = (data.authors) ? data.authors : 'No Author found';
 
  this.description = (data.description) ? data.description : 'No description';
  this.image = (data.imageLinks) ? data.imageLinks.thumbnail.replace(/^http:/, 'https:') : './public/styles/book-icon-139.png';
}





