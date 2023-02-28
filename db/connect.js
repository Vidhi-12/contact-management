let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/contact-api",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(res => console.log("db connected"))
.catch(console.error())