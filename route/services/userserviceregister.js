var express=require('express');
 var userRepo=require('../repositeries/userregisterRepo')
 var multer=require('multer');
 var nodemailer=require('nodemailer');
 var randomstring=require('randomstring');
 var mongoose=require('mongoose');
 var app=express();
//  var server = app.listen(3001)
//  const client = require('socket.io')(server)
// const client = require('socket.io')(server)
 
 
 var flash=require('connect-flash')
 var db=require('../Database/db');
 var url=db.url
 var app = express();
//  var port=3001
//  const client = require('socket.io')(port)
 app.use(flash());

  
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/images')
    },
    filename: function (req, file, cb) {
       var file=file.originalname
       
      cb(null,file )
    }
  })
  var appData={
    "error":1,
    "Status":""
}
 var string='';
 var sendmail="";

 //var id=1;
   
  var upload = multer({ storage: storage })



// Register Data....
module.exports.userdata=(upload.single('file'),(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
     var email=req.body.email;
     var passwordtoken="null"
    
     var file='http://localhost:3001/images/'+ req.file.originalname;
     console.log(file)
     console.log(username,password,firstname,lastname,email,passwordtoken +"at service");

     userRepo.insert({username:username},{password:password},{firstname:firstname},{lastname:lastname},{email:email},{file:file},{passwordtoken:passwordtoken},(err,exist)=>{

        //console.log(exist)
        if(exist){
    res.json({
            "msg":"Registration Successfull",
        "data":exist
    })
        }
        else{
            res.json({

                "msg":"Registration Successfull"
            })
        }
     })
 
    
})


// Login Data......
module.exports.logindata=((req,res)=>{

    var username=req.body.username
    var password=req.body.password;
    var pass;
    console.log(username,password)
    userRepo.selectlogindata({username:username},(err,exists)=>{
 
        pass=exists.password;
        console.log(pass);

        if(pass==password)
        {
            res.json({
                "msg":"Login Successfull",
                "data":exists
            })
        }
        else{
            res.json({
                "msg":"Invalid Credentail",
                "data":err
            })
        }
    })


})

// Getting All Users

module.exports.usernames=((req,res)=>{
    var id=req.body.id;
    console.log(id+"at service");
    userRepo.usernames({id:id},(err,exists)=>{
        console.log(res+"res is")
        if(exists){
            res.json({
                "msg":"data Retrived",
                "data":exists

            })
        }
        else{
            res.json({
                "msg":"data  not Retrived",
            })
        }

    })
})

// Posting Data....

module.exports.posting=(upload.single('file'),(req,res)=>{
    var ts=new Date()
    console.log(ts.toISOString().slice(0,10));
     var h=ts.getHours();

     console.log(h);
     var m=ts.getMinutes()
     console.log(m);
     console.log(ts.toISOString().slice(0,10)+" " +h+":" +m);
      var date=ts.toISOString().slice(0,10)+" " +h+":" +m
      console.log(date);
    var username=req.body.username;
    var comment=req.body.comment;
    var file1=req.body.file1
    var likes=0;
    
     var file='http://localhost:3001/images/'+ req.file.originalname;
     console.log(file)
     console.log(file,comment +"at service");

     userRepo.posting({username:username},{file:file},{comment:comment},{date:date},{file1:file1},{likes:likes},(err,exist)=>{

        console.log(exist)
        if(exist){
    res.json({
            "msg":"posting Successfull",
        "data":exist
    })
        }
        else{
            res.json({

                "msg":"Registration Successfull"
            })
        }
     })
 
    
})

// Getting posting Data.....
module.exports.getpostdata=((req,res)=>{
    userRepo.getpostdata({},(req,data)=>{
        //console.log(data);
   

        res.json({
            "msg":"data Retrived",
            "data":data
    })


       
    })
})
module.exports.getrequest=((req,res)=>{
    var requestto=req.body.requestto;
    var requestfrom=req.body.requestfrom;
    var file=req.body.file;
    var requesttofile=req.body.requesttofile
    var requeststatus="Requested"
    console.log(requestfrom,requestto,requeststatus+"at service");
    userRepo.getrequest({requestto:requestto},{requestfrom:requestfrom},{requeststatus:requeststatus},{file:file},{requesttofile},(req,data)=>{
        console.log(data);
        res.json({
            "msg":"data Retrived",
            "data":data
    })
})
})


// send request....
module.exports.requestdata=((req,res)=>{
    var requestto=req.body.requestto;
    var requeststatus="Requested"
    console.log(requestto,requeststatus+"at service");

    userRepo.requestdata({requestto:requestto},{requeststatus:requeststatus},(req,data)=>{
        console.log(data);

        res.json({
            "msg":"data requestdata",
            "data":data
        })
    })
})

// Accepted request...
module.exports.getrequestaccepted=((req,res)=>{
    var id=req.body.id;
    var requeststatus="Accepted";
    console.log(id,requeststatus+"at service")

    userRepo.getrequestaccepted({id:id},{requeststatus:requeststatus},(req,data)=>{
        res.json({
            "msg":"updated",
            "data":data
        })
    })
})

// Accepted Request Data...

 module.exports.requestaccepteddata=((req,res)=>{
       var requestto=req.body.requestto
       var requeststatus="Accepted";
       console.log(requestto,requeststatus+"at service")
       userRepo.requestaccepteddata({requestto:requestto},{requeststatus:requeststatus},(req,data)=>{
           res.json({
               "msg":"accepteddata",
               "data":data
           })
       })

 })


//  Delete Request....
 module.exports.getrequestdelete=((req,res)=>{
     var id=req.body.id;
     var requeststatus="Deleted"
      console.log(id,requeststatus+"at service");
      userRepo.getrequestdelete({id:id},{requeststatus:requeststatus},(req,data)=>{
          res.json({
              "msg":"deleted",
              "data":data
          })
      })
 })


 module.exports.getdetails=((req,res)=>{
      var username=req.body.username;
        console.log(username+"at service")
        userRepo.getdetails({username:username},(req,data)=>{
            res.json({
                "msg":"Detailes Retrived",
                "data":data
            })
        })
 })

//  getting posting details....
 module.exports.getpostdetails=((req,res)=>{
    var username=req.body.username;
      console.log(username+"at service")
      userRepo.getpostdetails({username:username},(req,data)=>{
          res.json({
              "msg":"Detailes Retrived",
              "data":data
          })
      })
})

// Request Accepted from data......
module.exports.requestaccepetedfromdata=((req,res)=>{
    var requestfrom=req.body.requestfrom;
    var requeststatus="Accepted";
    console.log(requestfrom +"from at service")
    userRepo.requestacceptedfromdata({requestfrom:requestfrom},{requeststatus:requeststatus},(req,data)=>{
        res.json({
            "msg":"data Retrived",
            "data":data

        })
    })

})


// count Likes...
module.exports.countlikes=((req,res)=>{
    var id=req.body.id;
    var likes=req.body.likes;
    console.log(id,likes+"at service")
    userRepo.countlikes({id:id},{likes:likes},(req,data)=>{
        res.json({
            "msg":"likes updated",
            "data":data
        })
    })
})

// forgotpassword
module.exports.forgotpassword=((req,res,next)=>{
  
    string=randomstring.generate(7);
    console.log(string+"is")
    var string1=string;
  
    var fmail=req.body.fmail;
    // module.exports.sendmail=fmail;
    // console.log(sendmail+"sendmail");

    var mailstring=req.body.mailstring
    var updatepassword=req.body.updatepasswords
    var id=req.body.id;
    console.log(fmail+"fmail")
    console.log(mailstring,string,updatepassword)

    var  smtptransport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'sampathkumar0078@gmail.com',
            pass:'$@mp@th586'
        }
    });
    var mailOption={
        to:fmail,
        from:'umeshrapolu29@gmail.com',
        subject:'reset password',
        text:'change password\n\n'+string,  
    };
    smtptransport.sendMail(mailOption,function(err,data){
        if(err){
        console.log("mail not sent");
        console.log(err);
        }
        else{
            console.log("mail sent");
            // res.json({
            //     "msg":"Token Sent to Email",
                
            // })
            console.log(string,id + "at service1")
            userRepo.storetoken({fmail:fmail},{string1:string1},(req,data)=>{
                res.json({
                    "msg":"password updated",
                    "data":data
                })
            })
        }
    })

    

})
module.exports.resetpassword=((req,res)=>{
    var token1=req.body.token1
    var updatepassword=req.body.updatepassword
     var fmail=req.body.fmail;
    
    
  
  
    var string1=string;
    console.log(fmail+"is")
    console.log(token1,updatepassword ,fmail+ "at service")
    userRepo.resetpassword({fmail:fmail},token1,{updatepassword:updatepassword},(req,result)=>{
        res.json({
            "msg":"password updated",
            "data":result
        })
     })
    })
    module.exports.commentonpost=((req,res)=>{
        var commentonpost=req.body.commentonpost
        var to_id=req.body.to_id;
        var from_id=req.body.from_id;
        console.log(commentonpost,to_id,from_id +"at service")
        userRepo.commentonpost({commentonpost:commentonpost},{to_id:to_id},{from_id:from_id},(req,data)=>{
            res.json({
                "msg":"commented",
                "data":data
            })
        })
    })
    module.exports.retrivecommentonpost=((req,res)=>{
        var to_id=req.body.to_id;
        userRepo.retrivecommentonpost({to_id:to_id},(req,data)=>{
            res.json({
                "msg":"retrived data from post",
                "data":data

            })
        })
    })
    module.exports.sendmessage=((req,res)=>{
         var to_msgid=req.body.to_msgid;
         var from_msgid=req.body.from_msgid;
         var from_msg=req.body.from_msg;
         userRepo.sendmessage({to_msgid:to_msgid},{from_msgid:from_msgid},{from_msg:from_msg},(req,data)=>{
            res.json({
                "msg":"message data from post",
                "data":data

            })

         })


    })
//     module.exports.twowaycommunicatio=((req,res)=>{

//         mongoose.connect(url, function(err, db){
//     if(err){
//         throw err;
//     }

//     console.log('MongoDB connected...');

//     // Connect to Socket.io
//     client.on('connection', function(socket){
//         let chat = db.collection('chats');

//         // Create function to send status
//         sendStatus = function(s){
//             socket.emit('status', s);
//         }

//         // Get chats from mongo collection
//         chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
//             if(err){
//                 throw err;
//             }

//             // Emit the messages
//             socket.emit('output', res);
//         });

//         // Handle input events
//         socket.on('input', function(data){
//             let name = data.name;
//             let message = data.message;

//             // Check for name and message
//             if(name == '' || message == ''){
//                 // Send error status
//                 sendStatus('Please enter a name and message');
//             } else {
//                 // Insert message
//                 chat.insert({name: name, message: message}, function(){
//                     client.emit('output', [data]);

//                     // Send status object
//                     sendStatus({
//                         message: 'Message sent',
//                         clear: true
//                     });
//                 });
//             }
//         });
        
 

//         // Handle clear
//         socket.on('clear', function(data){
//             // Remove all chats from collection
//             chat.remove({}, function(){
//                 // Emit cleared
//                 socket.emit('cleared');
//             });
//         });
//     });
   
// });

//     })



