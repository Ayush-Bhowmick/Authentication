const mongoose= require('mongoose')

const MONGO_DB=process.env.MONGO_DB
exports.connect = ( ) => {
       mongoose.connect(MONGO_DB,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(console.log("DATABASE connected with a success")
        ).catch((error)=> {
            console.log(error);
            console.log("DATABASE FAILED");
            process.exit(1)
        })
}

