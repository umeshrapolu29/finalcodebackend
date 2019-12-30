var express=require('express');
 var route=express.Router();
 var userservice=require('../services/userserviceregister')
 var multer=require('multer');

 var storage= multer.diskStorage({
   destination:function(req,file,cb){
       cb(null,'./uploads/images')
   },
   filename: function (req, file, cb) {
       var file=file.originalname
       console.log(file+' file')
      cb(null,file )
    }
 })
 var upload = multer({ storage: storage })

console.log(' in controller')
route.post('/userregister',upload.single('file'),(req,res)=>{

    return userservice.userdata(req,res)
    

})
route.post('/login',(req,res)=>{
    return userservice.logindata(req,res)

})
route.get('/usernames',(req,res)=>{
    return userservice.usernames(req,res)
})
route.post('/posting',upload.single('file'),(req,res)=>{

    return userservice.posting(req,res);

})
route.get('/getpostdata',(req,res)=>{
 return userservice.getpostdata(req,res);
})
route.post('/postrequest',upload.single(''),(req,res)=>{
    return userservice.getrequest(req,res);

})
route.post('/getrequest',upload.single(''),(req,res)=>{
    return userservice.requestdata(req,res);

})
route.post('/getrequestaccepted',upload.single(''),(req,res)=>{
    return userservice.getrequestaccepted(req,res);
})
 route.post('/requestaccepteddata',upload.single(''),(req,res)=>{
            return userservice.requestaccepteddata(req,res);
 })
 route.post('/getrequestdelete',upload.single(),(req,res)=>{
     return userservice.getrequestdelete(req,res);
 })
 route.post('/getdetails',upload.single(''),(req,res)=>{
     return userservice.getdetails(req,res);
 })
 route.post('/getpostdetails',upload.single(''),(req,res)=>{
     return userservice.getpostdetails(req,res);
 })
 route.post('/requestaccepetedfromdata',upload.single(''),(req,res)=>{
     return userservice.requestaccepetedfromdata(req,res);
 })
 route.post('/countlikes',upload.single(''),(req,res)=>{
     return userservice.countlikes(req,res);
 })
 route.post('/forgotpassword',upload.single(''),(req,res)=>{
     return userservice.forgotpassword(req,res);
 })

module.exports=route;