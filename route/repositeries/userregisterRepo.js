 var express=require('express');
 var Schema=require('../Model/schema')
 var nodemailer=require('nodemailer');
 var randomstring=require('randomstring');



// Register Data....
 
 module.exports.insert=(username,password,firstname,lastname,email,file,passwordtoken,callback)=>{
    console.log(username.username,password.password,firstname.firstname,lastname.lastname,email.email,file.file,passwordtoken)

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
              passwordtoken:passwordtoken.passwordtoken,
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

module.exports.resetpassword=((fmail,token1,updatepassword,callback)=>{
    console.log(token1,updatepassword,fmail+"at repo")
    Schema.find({email:fmail.fmail}).then(result=>{
        
        

        var token=result[0].passwordtoken

        console.log(token);
        console.log(token1);

        if(token==token1)
        {
            Schema.updateOne({"email":fmail.fmail},{$set:{password:updatepassword.updatepassword}}).then(result=>{
                callback(null,result);

            }).catch(error=>{
                callback(null,error);
            })
        }
        else{
            console.log("not matched")
            callback(null,error);
        }





    }).catch(error=>{
        callback(null,error)
    })





    
 
    

  


})
// store token
module.exports.storetoken=((fmail,string1,callback)=>{
    console.log(fmail,string1+"at repo");

    // Schema.updateOne({"_id":id.id},{$set:{passwordtoken:string.string}}).then(result=>{
    //     callback(null,result);
    // }).catch(error=>{
    //     callback(null,error);
    // })
    Schema.updateOne({"email":fmail.fmail},{$set:{passwordtoken:string1.string1}}).then(result=>{
        callback(null,result);

        console.log(result.file);
    }).catch(error=>{
        callback(null,error);
    })
 })

//  comment on post

module.exports.commentonpost=((commentonpost,to_id,from_id,callback)=>{

    var reg=new Schema({
 
    commentonpost:commentonpost.commentonpost,
        to_id:to_id.to_id,
        from_id:from_id.from_id,


    })
    reg.save()
     .then(result=>{
         callback(null,result)
     }).catch(error=>{
         callback(null,error)
     })

})
module.exports.retrivecommentonpost=((to_id,callback)=>{
    Schema.find({to_id:to_id.to_id}).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })

})