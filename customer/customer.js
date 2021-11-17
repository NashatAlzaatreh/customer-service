"use strict";

const express = require('express');
const app = express();
app.use(express.json());

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
    console.log(`${payload.serviceName} has been sent to the support team`);
});

app.listen(3030, ()=>{
  console.log('customer app server up on port 3030');
});

// POST request:
app.post('/request', (req, res)=>{
  const requestMessage = req.body;
  if(req.body.serviceName === `Mechanical Issue` || req.body.serviceName === `IT Issue`){
    customerConnection.emit('customer-request', requestMessage);
    res.status(200).send('message has been sent to the system successfully');
  } else {
    res.status(400).send('Mechanical or IT support only');
  }
});