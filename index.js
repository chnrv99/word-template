const express = require('express')
var parseUrl = require('body-parser')
const { spawn } = require('child_process')
const fs = require('fs')
const users = require("./list.json")
const app = express()
const port = 3000
let encodeUrl = parseUrl.urlencoded({ extended: false })




app.get('/', (req, res) => {

  // logic to get input from user and send it to json
  let user = {
    NAME:'New User'
  }
  users.push(user)
  fs.writeFileSync('list.json',JSON.stringify(users), err=>{
    if (err) throw err;
    console.log("Done writing")
  })

  // logic to read the json file from python
  let largeDataSet = []
  // spawn new child process to call the python script
  // const python = spawn('python', ['script3.py'])
  const python = spawn('python', ['wordtemplate.py'])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...')
    //dataToSend =  data;
    largeDataSet.push(data)
    console.log(largeDataSet.join(''))
  })

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    // send data to browser
    res.send(largeDataSet.join(''))
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
