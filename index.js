const express = require("express")
const app = express()
const db = require('./config/database')

const PORT = 3000

app.use(express.json())




app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE expressSqlDB'
   
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.status(200).send('Database created...')
    })
})

app.get('/createCategoriesTable', (req, res) => {
    const sql = 'CREATE TABLE categories(id int AUTO_INCREMENT,categorie_name VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.status(200).send('Categories table created...')
    })
})   

app.get('/createProductsTable', (req, res) => {
    const sql = 'CREATE TABLE products(id int AUTO_INCREMENT,product_name VARCHAR(255), description VARCHAR(255), price int(50), categories_id int, PRIMARY KEY(id), FOREIGN KEY (categories_id) REFERENCES categories(id))'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.status(200).send('Products table created...')
    })
})
   
app.post('/newCategory', (req, res) => {
    const {categorie_name} = req.body
    const sql = `INSERT INTO categories (categorie_name) values ('${categorie_name}');`
   
    db.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.status(200).send('Categorie added...')
    })
})

app.post('/newProduct', (req, res) => {
    const {product_name, description, price, categories_id} = req.body
    if (!product_name || !description || !price || !categories_id) return res.status(400).send('Error: Falta algún campo por rellenar');
    const sql = `INSERT INTO products (product_name, description, price, categories_id) values ('${product_name}', '${description}', '${price}', '${categories_id}');`
   
    db.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.status(200).send('Product added...')
    })
})

app.put('/categories/id/:id', (req, res) => {
    const id = req.params.id  
    const categorie_name = req.body.categorie_name
    const newCatName = `UPDATE categories SET categorie_name = '${categorie_name}' WHERE id = ${id}`
    db.query(newCatName, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.put('/products/id/:id', (req, res) => {
    const id = req.params.id  
    const {product_name, description} = req.body
    const updateProduct = `UPDATE products SET product_name = '${product_name}', description = '${description}' WHERE id = ${id}`
    db.query(updateProduct, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
        




app.listen(PORT, () => console.log(`server started at port ${PORT}`))
