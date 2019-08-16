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

//
app.get('/',(request, response)=>{
  response.render('pages/index');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
