// MQTT broker
var mosca = require('mosca')

    var settings = {
        port: 1884,
        username: 'blue',
        password: 'azerty',
        clientId: 'mqttjs_667'
    }
var broker = new mosca.Server(settings)
var mqtt = require('mqtt')

// MongoDB
var mongo = require('mongodb')
var mongc = mongo.MongoClient
var url ='mongodb://localhost:27017/mqttjs'
//date
let date_ob = new Date();
var topic3 = 'state'

broker.on('ready', ()=>{
    console.log('Broker is ready!')
})

var pipub = mqtt.connect('mqtt://localhost:1883')





broker.on('published', (packet)=>{
  
  //add user to activity1
  const message = packet.payload.toString()
const idu =5 
console.log("we goin in add ");
if(message=="0%")
{
const idu=message; 
}
/*messssaage*/
    
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        mongc.connect(url, (error, db)=>{
            if (error) {
                console.error('An error occurred connecting to MongoDB: ', error);
            } else {
            var dbo = db.db("mqttjs");
         //   pipub.publish(topic3, '0')
            console.log("we in add ");
            dbo.collection('activity1').insertOne({
                
                _id : idu,
                doorstate:"Closed",
                date:("0" + date_ob.getDate()).slice(-2),
                time: date_ob.getHours(),
                state: "o",
                mints:date_ob.getMinutes(),
            }, ()=>{
                console.log('Data is saved to MongoDB')
                db.close()
            })
         } })
    }


/*update state

  
    const myquery = { id : message };
        var newvalues = { $set: {state: "he_is_still_inside" } };
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        mongc.connect(url, (error, client)=>{
            var dbo = client.db("mqttjs");
         
            dbo.collection('activity1').updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log(err);
          console.log("1 document updated");
          db.close();
        });
      });
     */


      /*door*/
console.log("maybe we go door",message)
if(message=="open_door!"){
    console.log("fel if ta3 door ",message)
    console.log(idu)
    const myquery2 = { _id : idu };
    
            var newvalues2 = { $set: {state: 0,doorstate:"Closed" ,leavingtime:date_ob.getMinutes(),} };
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        mongc.connect(url, (error, db)=>{
            if (error) {
                console.error('An error occurred connecting to MongoDB: ', error);
            } else {
            var dbo = db.db("mqttjs");
         
            dbo.collection('activity1').updateOne(myquery2, newvalues2, function(err, res) {
          if (err) throw err;
          console.log(err);
          console.log("1 document updatedxdoorx");
          db.close();
        });
           }   });
    
    }
}




/*wash hands*/
console.log("maybe we go had washed ",message,typeof(message))
if(message=="rob_use"){
    //pipub.publish(topic3, '2')
    console.log("rob_use",idu)
const myquery1 = { _id : idu };
        var newvalues1 = { $set: {state: 2,doorstate:"open" } };
if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
    mongc.connect(url, (error, client)=>{
        if (error) {
            console.error('An error occurred connecting to MongoDB: ', error);
        } else {
        var dbo = client.db("mqttjs");
     
        dbo.collection('activity1').updateOne(myquery1, newvalues1, function(err, res) {
      if (err) throw err;
      console.log(err);
      console.log("1 document updated xwash handsx");
      client.close();
    });
      }  });


}


/* add user to db 
broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        mongc.connect(url, (error, client)=>{
            var dbo = client.db("mqttjs");
         
            dbo.collection('mqttJS').insertOne({
                id: message,
                time:"12AM" ,
                doorstate:"open",
                date:("0" + date_ob.getDate()).slice(-2),
                time: date_ob.getHours(),

            }, ()=>{
                console.log('Data is saved to MongoDB')
                client.close()
            })
        })
    }
})*/




    }






})



