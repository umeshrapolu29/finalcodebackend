 var express=require('express');
 var Schema=require('../Model/schema')
 var nodemailer=require('nodemailer');
 var randomstring=require('randomstring');



// Register Data....
 
 module.exports.insert=(username,password,firstname,lastname,email,file,callback)=>{
    console.log(username.username,password.password,firstname.firstname,lastname.lastname,email.email,file.file)

       Schema.find({"email":{$ne:null}}).then(result=>{
           //callback(null,result)
           //console.log(result);
           var regid=Object.keys(result).length;
           console.log(regid+"result is");
           var reg=new Schema({
            username:username.username,
            password:password.password,
              firstname:firstname.firstname,
              lastname:lastname.lastname,
              email:email.email,
              file:file.file,
              regid:regid
              
        
          })
          reg.save()
          .then(result=>{
              callback(null,result)
              console.log("result is")
          }).catch(error=>{
              callback(null,error)
          })
     
       }).catch(error=>{
           callback(null,error);
       })

 
}



// Login Data......

 module.exports.selectlogindata=(req,callback)=>{
    console.log(req)
        Schema.findOne(req).then(result=>{
            callback(null,result)
        })
        .catch(error=>{
            callback(null,error);
        })

 }

 // Getting All Users

 module.exports.usernames=(req,callback)=>{

     Schema.find({"password":{$ne:null}})
     .then(result=>{
        callback(null,result)
        console.log(result);
     })
     .catch(error=>{
         callback(null,error);
     })
 }


 // Posting Data....

module.exports.posting=(username,file,comment,date,file1,likes,callback)=>{
 
   
    Schema.find({"postimg":{$ne:null}}).then(result=>{
        //callback(null,result)
        //console.log(result);
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
        console.log(file,comment +"at repo");
        var reg=new Schema({
            username:username.username,
          postimg:file.file,
          comment:comment.comment,
          date:date.date,
          file:file1.file1,
          regid:regid,
          likes:likes.likes,
       
         
   
      
        })
        reg.save()
        .then(result=>{
            callback(null,result)
        }).catch(error=>{
            callback(null,error)
        })
    })
   

}

// Getting posting Data.....

module.exports.getpostdata=((req,callback)=>{
    Schema.find({comment:{$ne : null}}).sort( { regid: -1 } ).then(result=>{
        callback(null,result)
        console.log(result);
    }).catch(error=>{
        callback(null,error)
    })
})
module.exports.getrequest=(requestto,requestfrom,requeststatus,file,requesttofile,callback)=>{
    console.log(requestto,requestfrom,requeststatus+"at repo");
     var reg=new Schema({

        requestto:requestto.requestto,
        requestfrom:requestfrom.requestfrom,
        requeststatus:requeststatus.requeststatus,
        file:file.file,
        requesttofile:requesttofile.requesttofile,

     }) 
     reg.save()
     .then(result=>{
         callback(null,result)
     }).catch(error=>{
         callback(null,error)
     })
}

// send request....
 module.exports.requestdata=(requestto,requeststatus,callback)=>{
     console.log(requestto,requeststatus);
     

    Schema.find({requestto: requestto.requestto,requeststatus:requeststatus.requeststatus}).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })

 }

 
// Accepted request...
 module.exports.getrequestaccepted=((id,requeststatus,callback)=>{

    console.log(id,requeststatus+"at repo")

    Schema.updateOne({"_id":id.id},{$set:{"requeststatus":"Accepted"}}).then(result=>{
        callback(null,result)
        console.log(result);

    }).catch(error=>{
        callback(null,error)
    })

 })
 // Accepted Request Data...
 module.exports.requestaccepteddata=((requestto,requeststatus,callback)=>{
     console.log(requestto,requeststatus+"at repo")
      Schema.find({requestto:requestto.requestto,requeststatus:requeststatus.requeststatus}).then(result=>{
          callback(null,result)
          console.log(result);

      }).catch(error=>{
        callback(null,error)
    })
 })

// Request Accepted from data......
 module.exports.requestacceptedfromdata=((requestfrom,requeststatus,callback)=>{
      Schema.find({requestfrom:requestfrom.requestfrom,requeststatus:requeststatus.requeststatus}).then(result=>{
          callback(null,result)
      }).catch(error=>{
          callback(null,error);
      })
 })


 //  Delete Request....
 module.exports.getrequestdelete=((id,requeststatus,callback)=>{
       
    Schema.updateOne({"_id":id.id},{$set:{requeststatus:requeststatus.requeststatus}}).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error);
    })
 })


 module.exports.getdetails=((username,callback)=>{
     console.log(username)
 
    Schema.find({username:username.username,postimg:null}).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })
 })


//  getting posting details....
 module.exports.getpostdetails=((username,callback)=>{
    console.log(username)

   Schema.find({username:username.username,postimg:{$ne : null}}).then(result=>{
       callback(null,result)
   }).catch(error=>{
       callback(null,error)
   })
})


// count Likes...
module.exports.countlikes=((id,likes,callback)=>{
    console.log(id,likes+"at repo");
    Schema.updateOne({"_id":id.id},{$set:{likes:likes.likes}}).then(result=>{
        callback(null,result);
    }).catch(error=>{
        callback(null,error);
    })
})

// forget password

module.exports.forgotpassword=((mailstring,string,updatepassword,id,callback)=>{
    console.log(mailstring,string,updatepassword,id+"at repo")

    if(mailstring==string){
        Schema.updateOne({"_id":id.id},{$set:{password:updatepassword.updatepassword}}).then(result=>{
            callback(null,result);
        }).catch(error=>{
            callback(null,error)
        })
 
    }

  


})