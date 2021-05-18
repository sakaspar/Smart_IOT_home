
This Project can be hosted on your pi 

# Mosca MQTTjs  MongoDB__

## __1. Mosca & MQTT.js__
- Initiate a Node.js project then install Mosca & MQTT.js:
    
    ```bash
    $ npm init
    $ npm i mosca mqtt
    ```

- Create an __*MQTT broker*__ (_broker.js_):

    ```javascript
    // Mosca MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
    })
    ```

- Create an __*MQTT subscriber*__ (_sub.js_):

    ```javascript
    // MQTT subscriber
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost:1234')
    var topic = 'LINTANGtest123'

    client.on('message', (topic, message)=>{
        message = message.toString()
        console.log(message)
    })

    client.on('connect', ()=>{
        client.subscribe(topic)
    })
    ```

- Create an __*MQTT publisher*__ (_pub.js_):

    ```javascript
    // MQTT publisher
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost:1234')
    var topic = 'LINTANGtest123'
    var message = 'Hello World!'

    client.on('connect', ()=>{
        setInterval(()=>{
            client.publish(topic, message)
            console.log('Message sent!', message)
        }, 5000)
    })
    ```
#


- Create an __*MQTT broker*__ (_brokerMySQL.js_):

    ```javascript
    // MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    // MySQL 
    var mysql = require('mysql')
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'lintang',
        password: '12345',
        database: 'mqttJS'
    })
    db.connect(()=>{
        console.log('Database connected!')
    })

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
        if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
            var dbStat = 'insert into mqttJS set ?'
            var data = {
                message: message
            }
            db.query(dbStat, data, (error, output)=>{
                if(error){
                    console.log(error)
                } else {
                    console.log('Data saved to database!')
                }
            })
        }
    })
    ```

#

## __3. Mosca, MQTT.js & MongoDB__
- Create a database & collection on MongoDB:
    
    ```bash
    $ use mqttJS
    $ db.createUser({
        'user': 'lintang',
        'pwd': '12345',
        'roles': ['readWrite', 'dbAdmin']
    })
    $ db.createCollection('mqttJS')
    ```

- Install _MongoDB.js_:

    ```bash
    $ npm i mongodb
    ```

- Create an __*MQTT broker*__ (_brokerMongoDB.js_):

    ```javascript
    // MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    // MongoDB
    var mongo = require('mongodb')
    var mongc = mongo.MongoClient
    var url = 'mongodb://lintang:12345@localhost:27017/mqttJS'

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
        if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
            mongc.connect(url, (error, client)=>{
                var myCol = client.db('mqttJS').collection('mqttJS')
                myCol.insertOne({
                    message: message
                }, ()=>{
                    console.log('Data is saved to MongoDB')
                    client.close()
                })
            })
        }
    })
    ```

#

#Feel Free to take and change this code for your own good e_mail: saadihamza2020@gmail.com

