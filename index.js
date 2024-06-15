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
    const sql = 'CREATE TABLE categories(id int AUTO_INCREMENT,category_name VARCHAR(255), PRIMARY KEY(id))'
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
    const {category_name} = req.body
    const sql = `INSERT INTO categories (category_name) values ('${category_name}');`
   
    db.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.status(200).send('Category added...')
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
    const category_name = req.body.category_name
    const newCatName = `UPDATE categories SET category_name = '${category_name}' WHERE id = ${id}`
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

app.get('/showProducts', (req, res) => {
    const sql = 'SELECT * FROM products'
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result)
    });
  });



app.get('/showCategories', (req, res) => {
    const sql = 'SELECT * FROM categories'
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result)
    })
  })

  app.get('/getWithCategory', (req, res) => {
    const sql = `
    SELECT products.product_name, products.description, categories.category_name 
    FROM products
    INNER JOIN categories ON products.categories_id = categories.id`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).send('No se encontraron productos');
      } else {
        res.status(200).json(result);
      }
    });
  });

app.get('/productsById/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM products WHERE id = ${id}`
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).send('Producto no encontrado')
      } else {
        res.status(200).json(result)
      }
    });
  });
  
  app.get('/productsInvert', (req, res) => {
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
  })

  app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM categories WHERE id = ${id}`
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).send('Categoría no encontrada')
      } else {
        res.status(200).json(result)
      }
    })
  })
  
  app.get('/productsByName/:productName', (req, res) => {
    const productName = req.params.productName;
    const sql = `
      SELECT p.product_name, p.description, p.price
      FROM products p
      JOIN categories c ON p.categories_id = c.id
      WHERE p.product_name = '${productName}'
    `
    db.query(sql, (err, result) => {
      if (err) throw err;
     
        res.status(200).json(result)
      }
    )
  }) 

  app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `DELETE FROM products WHERE id = ${id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result === 0) {
        res.status(404).send('Producto no encontrado');
      } else {
        res.status(200).send('Producto eliminado');
      }
    });
  });

app.listen(PORT, () => console.log(`server started at port ${PORT}`))
