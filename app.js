const express = require('express')
const app = express()
const router = require('./routes/calculatorWebPage')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('./Public'))
app.use('/api/v1/calculator', router)
app.listen(port, console.log('Server is up'))