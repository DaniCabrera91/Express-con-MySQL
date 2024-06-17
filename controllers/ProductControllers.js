const db = require('../config/database')
const ProductControllers = {

    table(req, res) {
        const sql = `CREATE TABLE products(
        id int AUTO_INCREMENT,
        product_name VARCHAR(255), 
        description VARCHAR(255), 
        price int(50), 
        categories_id int, 
        PRIMARY KEY(id), 
        FOREIGN KEY (categories_id) REFERENCES categories(id)
        )`
        
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('Products table created...')
        })
    },

    create(req, res) {
        const {product_name, description, price, categories_id} = req.body
        if (!product_name || !description || !price || !categories_id) return res.status(400).send('Error: Falta algún campo por rellenar')
        const sql = `INSERT INTO products (product_name, description, price, categories_id) values ('${product_name}', '${description}', '${price}', '${categories_id}')`
       
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('Product added...')
        })
    },

    update(req, res) {
        const id = req.params.id  
        const {product_name, description} = req.body
        const updateProduct = `UPDATE products SET product_name = '${product_name}', description = '${description}' WHERE id = ${id}`
        db.query(updateProduct, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    get(req, res) {
        const sql = 'SELECT * FROM products'
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result)
        })
    },

    getWithCategory(req, res) {
        const sql = `
        SELECT products.product_name, products.description, categories.category_name 
        FROM products
        INNER JOIN categories ON products.categories_id = categories.id`
      
        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length === 0) {
                res.status(404).send('No se encontraron productos')
            } else {
                res.status(200).json(result);
            }
        })
    },

    getById(req, res) {
        const id = parseInt(req.params.id);
        const sql = `SELECT * FROM products WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
            res.status(404).send('Producto no encontrado')
            } else {
            res.status(200).json(result)
            }
        })
    },

    getDesc(req, res) {
        const sql = `
        SELECT * FROM Products
        ORDER BY id DESC
        `  
        db.query(sql, (err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.status(404).send('No se encontraron productos')
          } else {
            res.status(200).json(result)
          }
        })
    },

    getByName(req, res) {
        const productName = req.params.productName
        const sql = `
          SELECT p.product_name, p.description, p.price
          FROM products p
          JOIN categories c ON p.categories_id = c.id
          WHERE p.product_name = '${productName}'
        `
        db.query(sql, (err, result) => {
          if (err) throw err
         
            res.status(200).json(result)
          }
        )
    },

    delete(req, res) {
        const id = parseInt(req.params.id)
        const sql = `DELETE FROM products WHERE id = ${id}`
        db.query(sql, (err, result) => {
          if (err) throw err
          if (result === 0) {
            res.status(404).send('Producto no encontrado')
          } else {
            res.status(200).send('Producto eliminado')
          }
        })
      }

}

module.exports = ProductControllers