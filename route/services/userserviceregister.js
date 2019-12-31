var express=require('express');
 var userRepo=require('../repositeries/userregisterRepo')
 var multer=require('multer');
 var nodemailer=require('nodemailer');
 var randomstring=require('randomstring');

  
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

 //var id=1;
   
  var upload = multer({ storage: storage })



// Register Data....
module.exports.userdata=(upload.single('file'),(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
     var email=req.body.email;
    
     var file='http://localhost:3001/images/'+ req.file.originalname;
     console.log(file)
     console.log(username,password,firstname,lastname,email +"at service");

     userRepo.insert({username:username},{password:password},{firstname:firstname},{lastname:lastname},{email:email},{file:file},(err,exist)=>{

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

module.exports.usernames=( (req,res)=>{
    userRepo.usernames({},(err,exists)=>{
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
module.exports.forgotpassword=((req,res)=>{
  
    var string=randomstring.generate(7);
    console.log(string+"is")
    var fmail=req.body.fmail;
    var mailstring=req.body.mailstring
    var updatepassword=req.body.updatepassword
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
            res.json({
                "msg":"Token Sent to Email",
                
            })
        }
    })

     userRepo.forgotpassword({mailstring:mailstring},{string:string},{updatepassword:updatepassword},{id:id},(req,res)=>{
        res.json({
            "msg":"likes updated",
            "data":data
        })
     })



})