const mongoose = require('mongoose');

mongoose.connect('mongodb://testeSky:sky123@host:port/dbname/skyapi',
    {
        useFindAndModify: false, 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
mongoose.Promise = global.Promise;

module.exports = mongoose;