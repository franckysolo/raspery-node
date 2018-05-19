// Example client
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const axios = require('axios')
const endPoint = 'http://0.0.0.0:3333'

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

const getSensorDataAndEmit = async socket => {
  try {
    const res = await axios.get(endPoint)
    socket.emit("sensors::data", res.data)
    // console.log('Sensor data ', res.data)
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

server.listen(3334, function () {
  console.log('App listening on port 3334!')
})

io.on('connection', socket => {
  setInterval(() => {
    getSensorDataAndEmit(socket)
  }, 1000)
  socket.on('disconnect', () => {
    delete socket
  })
})
