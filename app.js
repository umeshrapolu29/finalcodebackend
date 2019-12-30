var express=require('express');
var mongoose=require('mongoose');
 var db=require('./route/Database/db')
 var url=db.url
 var port=3001
 var app=express();
  var bodyparser=require('body-parser');
  app.use(express.static(__dirname+'/uploads'))
  app.use(bodyparser.urlencoded({extended:true}))
  app.use(bodyparser.json())
  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authoriuzation');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,PATCH,GET')
        return res.status(200).json({});
    }
    next();

})


  var userregister=require('./route/controllers/userregister');
  {
      app.use('/user',userregister)
  }


mongoose.connect(url,()=>{

}).then(result=>{
    console.log('connected')
}).catch(error=>{
    throw error
})

app.listen(port,()=>{
console.log('Server is running at port'+ port)
})