var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1884')
var topic = 'door'
var topic2 = 'rob'
var topic3 = 'watever'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
    client.subscribe(topic2)
    client.subscribe(topic3)
})