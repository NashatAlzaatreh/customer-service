"use strict";

const io = require("socket.io")(4000);
const faker = require(`faker`);
const customerService = io.of("/customerService");

let messageQueue = {
  itTeam: {},

  mechTeam: {},
};

customerService.on("connection", (socket) => {
  console.log(`you are connected to the system`);

  socket.on("customer-request", (payload) => {
    console.log("The system received the customer request", {
      time: new Date(),
      payload: payload,
    });
    const id = faker.datatype.uuid();

    if (payload.serviceName === `Mechanical Issue`) {
      (messageQueue.mechTeam[id] = payload),
        customerService.emit("Mechanical-Problem", {
          id: id,
          payload: messageQueue.mechTeam[id],
        });
    } else {
      messageQueue.itTeam[id] = payload;
      customerService.emit("IT-Problem", {
        id: id,
        payload: messageQueue.itTeam[id],
      });
    }

    socket.emit("customer-received", payload);
  });

  socket.on("mechTeam-received", (payload) => {
    // console.log(`The mechTeam received The problem and the system will automatically will remove this ${payload.id}`);
    console.log(
      "The Mech-Team received the request, updated queue: ",
      messageQueue.mechTeam[payload.id]
    );
    console.log(`=========================================`);
    delete messageQueue.mechTeam[payload.id];
    // console.log('messageQueue.mechTeam after',messageQueue.mechTeam[payload.id]);
  });

  socket.on("ItTeam-received", (payload) => {
    // console.log(`The mechTeam received The problem and the system will automatically will remove this ${payload.id}`);
    console.log(
      "The IT-Team received the request, updated queue: ",
      messageQueue.itTeam[payload.id]
    );
    console.log(`=========================================`);
    delete messageQueue.itTeam[payload.id];

    // console.log('messageQueue.mechTeam after',messageQueue.mechTeam[payload.id]);
  });

  socket.on("get-all", (payload) => {
    if (payload === "Mechanical") {
      Object.keys(messageQueue.mechTeam).forEach((id) => {
        socket.emit("Mechanical-Problem", {
          id: id,
          payload: messageQueue.mechTeam[id],
        });
      });
    } else {
      Object.keys(messageQueue.itTeam).forEach((id) => {
        socket.emit("IT-Problem", { id: id, payload: messageQueue.itTeam[id] });
      });
    }
  });
});
