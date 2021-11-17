"use strict";

const socket = require("socket.io-client");
const host = `http://localhost:4000/customerService`;

const mechTeamConnection = socket.connect(host);

mechTeamConnection.emit("get-all", "Mechanical");

mechTeamConnection.on("Mechanical-Problem", (payload) => {
  console.log(
    `The Mechanical Team Start fixing your problem ${payload.payload.serviceDescription}`
  );

  mechTeamConnection.emit("mechTeam-received", payload);
});
