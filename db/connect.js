const mongoose = require('mongoose')


// const connectionString =
//   "";


const connectDB = (url) => {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
}


module.exports = connectDB

  // since it's a funct it wont run until we require it in the module where it is going to be executed - app.js


  //coomenting these lines out because it makes more sense to connect to db before server starts
//   .then(() => console.log("COONECTED TO DB"))
//   .catch((err) => console.log(err));