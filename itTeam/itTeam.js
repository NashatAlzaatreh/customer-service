'use strict'

const socket=require('socket.io-client')
const host=`http://localhost:4000/customerService`

const iTTeamConnection=socket.connect(host)

 iTTeamConnection.emit('get-all','IT')
 

iTTeamConnection.on('IT-Problem',payload =>{
    console.log(`The IT Team Start fixing your problem ${payload.payload.serviceDescription}`);

    iTTeamConnection.emit('ItTeam-received',payload)

})
