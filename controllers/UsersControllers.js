const db = require('../config/database')
const UsersControllers = {

    table(req, res) {
        const sql = `CREATE TABLE users(
        id int AUTO_INCREMENT,
        first_name VARCHAR(20), 
        last_name VARCHAR(50),
        email VARCHAR(255), 
        address VARCHAR(255), 
        PRIMARY KEY(id)
        )`

        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('Users table created...')
        })
    },


    create(req, res) {
        const {first_name, last_name, email, address} = req.body
        if (!first_name || !last_name || !email || !address) return res.status(400).send('Error: Falta algún campo por rellenar')
        const sql = `INSERT INTO users (first_name, last_name, email, address) values ('${first_name}','${last_name}', '${email}', '${address}')`
       
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('User added...')
        })
    },

    update(req, res) {
        const id = req.params.id  
        const {first_name, last_name, email, address} = req.body
        const updateUsers = `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', address = '${address}' WHERE id = ${id}`
        db.query(updateUsers, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    get(req, res) {
        const sql = 'SELECT * FROM users'
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result)
        })
    },

    getWithOrder(req, res) {
        const sql = `
        SELECT users.first_name, users.last_name, users.email, users.address, orders.order_date, orders.final_price, orders.user_id 
        FROM users
        INNER JOIN orders`
      
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
        const sql = `SELECT * FROM users WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
            res.status(404).send('Usuario no encontrado')
            } else {
            res.status(200).json(result)
            }
        })
    },


    delete(req, res) {
        const id = parseInt(req.params.id)
        const sql = `DELETE FROM users WHERE id = ${id}`
        db.query(sql, (err, result) => {
          if (err) throw err
          if (result === 0) {
            res.status(404).send('Usuario no encontrado')
          } else {
            res.status(200).send('Usuario eliminado')
          }
        })
      }

}

module.exports = UsersControllers