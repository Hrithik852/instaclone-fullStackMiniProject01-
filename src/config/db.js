const mongoose=require('mongoose')

let connectToDb=()=>{
    mongoose.connect(process.env.MONGO_ID).then(()=>{
        console.log('connected to db');
        
    })
}
module.exports=connectToDb