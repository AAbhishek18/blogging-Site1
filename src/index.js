
const express = require('express');
const bodyParser = require('body-Parser');
const route = require('./routes/routes.js')
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://AAbhishek2022:1ESrG6kzyaqzUE3p@cluster0.am17a.mongodb.net/bloggingSite-DB", {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))



app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port' + (process.env.PORT || 3000))
});