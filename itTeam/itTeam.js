'use strict'

const socket=require('socket.io-client')
const host=`http://localhost:4000/customerService`

const iTTeamConnection=socket.connect(host);

iTTeamConnection.emit('get-all','IT');
 
iTTeamConnection.on('IT-Problem',payload =>{
    console.log(`IT Team Started fixing problem ${payload.id}: ${payload.payload.serviceDescription}`);
    iTTeamConnection.emit('ItTeam-recieved',payload)
});
