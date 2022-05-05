const connectToMongo = require('./db')    //db.js

const express = require('express')

connectToMongo();


const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello Worldddddddddddddddddddddddddd!')
})


app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes',require('./routes/notes'))




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})