let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let albums = require('./photos')

app.use(bodyParser.urlencoded({extended:true}))

//own middleware
let checkToken = function (req, res, next) {
    if (req.get('token') == '10') {
        return next()
    }
    res.sendStatus(401)
}

app.use(checkToken)

let checkIp = function (req, res, next) {
    console.log(req.ip)
    console.log('middleware success')
    return next()
}

app.get('/', checkIp, function (req, res) {
    res.send('<h1>middleware pasado con existo</h1>')
})

app.get('/', function(req,res){
    res.send('<h1>Hola mundo</h1>')
})

app.get('/', function (req, res) {
    res.send(__dirname+'/public/index.html') //devuelve la ruta del archivo indicado
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html') //devuelve el contenido del archivo indicado
})

//para obtener coleccion de recursos
app.get('/books', function(req,res){
    res.json([])
})

//obtencion de un recurso y con parametro opcional
app.get('/books/:id', function (req, res) {
    res.json({
        id: req.params.id,
        search: req.query.search //este es el parametro opcional, query se refiere al parametro opcional
    })
})

//agregar posteo
app.post('/books', function (req, res) {
    res.json(req.body)
});

// obtencion de coleccion de albums
// app.get('/albums', function (req, res) {
//     res.json(albums)
// })

app.get('/albums', function (req, res) {
    res.json({
        total: albums.length,
        albums, 
    })
})

//parametro opcional del id opcional
app.get('/albums/:id', function (req, res) {
    let data = albums.filter(album => {
        return album.id == req.params.id
    })
    res.json(data)
})


//ruta local
app.listen(3000);


