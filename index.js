const express = require('express');
const db = require('./db/connect');
const ContactModel = require('./models/Contact');
const contact = require('./routes/contact');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', contact);

app.get('/', (req,res) =>{
    res.send('working');
})

app.listen(PORT, () => console.log(`server running on ${PORT}`));