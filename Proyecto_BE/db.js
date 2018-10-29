let express = require('express')
let app = express()

const Sequelize = require('sequelize');

const database = new Sequelize('Tienda', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = database.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    price_currency: {
        type: Sequelize.CHAR
    },
    price_amount: {
        type: Sequelize.FLOAT
    },
    stock: {
        type: Sequelize.SMALLINT
    }
}, {
        timestamps: false
    });

app.get('/products', (req, res) => {
    Product
        .findAll()
        .then(products => {
            res.send(products)
        })
})


// localhost:3000/products
app.post('/products', (req, res) => {
    Product
        .create(req.body)
        .then(result => res.end(201))
})

// products/123
app.get('/products/:id', (req, res) => {
    Product
        .findById(req.params.id)
        .then(product => {
            if (product) {
                res.send(product)
                res.end()
            }
            else {
                res.sendStatus(404)
            }
        })
})

app.listen(3000)