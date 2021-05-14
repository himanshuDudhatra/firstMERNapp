const mongoose = require('mongoose');
//const express = require('express');
//const app = express();
//const portNumber = process.env.PORT_NUMBER;

const DB = process.env.DATABASE_LINK;

mongoose.connect(DB , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection successfull`);
    //app.listen(portNumber,() => console.log(`server is running at port number ${portNumber}`));
}).catch((error) => {
    console.log(`no connection`);
    console.log(error);
});