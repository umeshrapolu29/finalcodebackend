var express=require('express');
var mongoose=require('mongoose');
 var db=require('./route/Database/db')
 var url=db.url
 var app=express();
var server = app.listen(3001)
 const client = require('socket.io')(server)
 
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
  app.get('/', (req, res) => {
})
    
    



mongoose.connect(url,()=>{

}).then(result=>{
    console.log('connected')
     mongoose.connect(url, function(err, db){
     if(err){
         throw err;
     }

    client.on('connection', function(socket){
        let chat = db.collection('chats');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data1){
            let name = data1.name;
            let message = data1.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({name: name, message: message}, function(err){

                    if(err){
                        throw err
                    } 
                    else{
                        client.emit('output', [data1]);
                            console.log(data1.name);
                    }

                    
                   
                   

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                        
                    });
                });
            }
        });
        
 

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            console.log(data);
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
 });
}).catch(error=>{
    throw error
})



// app.listen(port,()=>{
// console.log('Server is running at port'+ port)
// })