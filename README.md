# raspberry-node

Base on [am2302-gui](https://github.com/franckysolo/am2302-gui)

A server install on pi provide sensor data in json format  
A client connect to the rest api via socket and display live sensor data  

## Requirements

* 1 Raspberry-pi p3B
* 1 Arduino Uno
* 1 Am2302 sensor
* Node install on Raspberry-pi

## How to

* Clone the project from raspian
* Clone the project from your local machine
* Adjust hostname IP and port on client and server as you need
* Connect the arduino Uno to raspberry-pi via usb port
* Start the server from the raspberry with the command `node server.js` or `npm start`
* Start the client from your local machine
* You should see the sensor datas display on the client html page
