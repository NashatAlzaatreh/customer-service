"use strict";

const socket = require("socket.io-client");

const host = "http://localhost:4000/customerService";
const faker=require('faker')

const customerConnection = socket.connect(host);

setInterval(() => {
  let randomNumber = Math.random();
  let service = {
    customerName: faker.name.firstName(),
    serviceDescription: faker.random.words(),
    servicePrice: faker.commerce.price(),
  };

  if (randomNumber < 0.5) {
    service.serviceName = `Mechanical Issue`;
  } else {
    service.serviceName = `IT Issue`;
  }

  customerConnection.emit('customer-request',service)
}, 5000);



customerConnection.on('customer-recieved', payload=>{

    console.log(`please confirm the kind of your issue ${payload.serviceName}`);

})