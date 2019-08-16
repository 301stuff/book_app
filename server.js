'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const superagent = require('superagent');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('./public/../'));
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
//initial page
app.get('/',(request, response)=>{
  response.render('pages/index');
});

//search google books api
app.post('/search', (request, response)=>{
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if(request.body.search[1] === 'author') {url += `inauthor:${request.body.search[0]}&maxResults=10`;}
  if(request.body.search[1] === 'title') {url += `intitle:${request.body.search[0]}&maxResults=10`;}
  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => {
      console.log(results);
      response.render('pages/searches/show', {searchResults: results});

    });

});
//book constructor
function Book(data) {
  this.title = data.title;
  this.image = data.imageLinks.thumbnail.replace(/^http:/, 'https:');
  this.author = data.authors;
  this.description = data.description;
}

//image
//title
//author
//description



