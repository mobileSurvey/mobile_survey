const express = require('express')
const morgan = require('morgan')
const routing = require('./routing/index')
const cors = require('cors')
const app = express()
const session = require('express-session')
const upload = require('express-fileupload')

app.use(upload())
app.use(morgan('dev'))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({limit: '50mb', extended: false,parameterLimit: 500000 }))
app.use(cors())
app.set('view engine', 'ejs');
app.use(express.static('assets'));


app.use(session({
  secret: 'sehat',
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 6000000 }
}))

app.use('/', routing)

const port = 8870
app.listen(port, () => {
  console.log(`telah tersambung pada port : ${port}`)
})
