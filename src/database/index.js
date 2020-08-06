const mongoose = require('mongoose');

mongoose.connect('mongodb://testeSky:sky123@https://afternoon-earth-42927.herokuapp.com/skydb',
    {
        useFindAndModify: false, 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
mongoose.Promise = global.Promise;

module.exports = mongoose;