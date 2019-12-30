var  mongoose=require('mongoose');

var Schema=mongoose.Schema;
console.log("schema");

var Schema=Schema({
    
    
       
    username:{type:String},
    password:{type:String},
    firstname:{type:String},
    lastname:{type:String},
    
    email:{type:String},
    file:{type:String},
    regid:{type:Number},
           
    likes:{type:String},
    postimg:{type:String},
    comment:{type:String},
    date:{type:String},

    requestfrom:{type:String},
    requestto:{type:String},
    requesttofile:{type:String},
    requeststatus:{type:String},
       
})
module.exports=mongoose.model('Schema',Schema)