//set up server
const express = require('express');
const sendMail = require('./mail.js')
const path = require('path');
const app = express();

//static folder
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Data Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//render html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//receive data from html
app.post('/send', (req, res) => {
  const {name, lastname, email, text, phone} = req.body;
  console.log(req.body);

  //error
  sendMail(name, lastname, email, text, phone, function(err, data) {
    if (err) {
      res.status(500).jason({ message: 'Internal Error' });
    } else {
      res.json({ message: 'Email sent!!!' });
    }
  });
});

//server PORT
app.listen(3030, () => console.log('Server is starting on 3030'));