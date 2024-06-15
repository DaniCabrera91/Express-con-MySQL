const db = require('../config/database')
const CategoryControllers = {

    table(req, res) {
        const sql = 'CREATE TABLE categories(id int AUTO_INCREMENT,category_name VARCHAR(255), PRIMARY KEY(id))'
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('Categories table created...')
        })
    },

    create(req, res) {
        const {category_name} = req.body
        const sql = `INSERT INTO categories (category_name) values ('${category_name}')`
       
        db.query(sql, (err, result) => {
          if (err) throw err
          console.log(result)
          res.status(200).send('Category added...')
        })
    },

    update(req, res) {
        const id = req.params.id  
        const category_name = req.body.category_name
        const newCatName = `UPDATE categories SET category_name = '${category_name}' WHERE id = ${id}`
        db.query(newCatName, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    
    get(req, res) {
        const sql = 'SELECT * FROM categories'
        db.query(sql, (err, result) => {
          if (err) throw err;
          res.status(200).json(result)
        })
    },

    getById(req, res) {
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
    }
}

module.exports = CategoryControllers

