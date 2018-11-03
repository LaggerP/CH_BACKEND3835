let express = require('express')
let app = express()

const Sequelize = require('sequelize');

const database = new Sequelize('Tienda', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = database.import(__dirname + "/productsModel")

app.get('/products', (req, res) => {
    Product.findAll().then(products => {
            res.send(products)
        })
})

// localhost:3000/products
app.post('/products', (req, res) => {
    Product.create(req.body).then(result => res.end(201))
})

// products/123
app.get('/products/:id', (req, res) => {
    Product
        .findById(req.params.id)
        .then(products => {
            if (products) {
                res.send(products)
                res.end()
            }
            else {
                res.sendStatus(404)
            }
        })
})

// products/123
app.delete('/products/:id', (req,res) =>{
    Product.findById(req.params.id).then(products => {
        if (!products) return products;
        products.destroy();
        return products;
    });
})

app.listen(3000)