/**
 * Node server to install on Raspery-pi
 * Connect to Arduino Uno to get sensor data
 *
 * @author franckysolo
 * @see https://github.com/franckysolo/am2302-gui
 */
const http = require('http')
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline
const port = 3333
const hostname = '0.0.0.0'

var stringData = ''
var serialPort = new SerialPort('/dev/ttyACM0', {
    baudRate: 115200
})
const parser = serialPort.pipe(new Readline({ delimiter: '\r\n' }))

var readArduino = () => {
  parser.on('data', data => {
    let dataResult = data.toString('utf-8').split(':')
    if (dataResult.length == 2) {
      let testData = {
        temperature: dataResult.pop(),
        humidity: dataResult.pop()
      }
      stringData = testData
    }
  })
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  readArduino()
  let json = JSON.stringify(stringData)
  res.end(json)
})

server.listen(port, hostname)
// let date = (new Date()).toLocaleTimeString('fr-FR')
// console.log(`Server started at ${date}`)
