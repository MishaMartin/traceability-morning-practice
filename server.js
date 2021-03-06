const express = require('express')

const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'daaecba1f10b45d4860a56ac04be4f96',
    captureToken: true,
    captureUnhandledRejections: true
})

rollbar.log('Hello World!')

const app = express()
app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let button1 = document.getElementById('btn1')
function errorStatus(){
    rollbar.status(400).send("Don't push this button!")
}

button1.addEventListener('click', errorStatus )

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))