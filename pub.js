var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
var topic = 'door'
var topic2 = 'rob'
var message = 'open_door'
var message2 = 'rob_use'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message)

        client.publish(topic2, message2)

        console.log('Message sent!', message, message2)
    },10000 )
})