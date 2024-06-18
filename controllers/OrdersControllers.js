const db = require('../config/database')
const OrdersControllers = {

    table(req, res) {
        const sql = `CREATE TABLE orders(
        id int AUTO_INCREMENT,
        order_date DATE, 
        final_price INT(255), 
        user_id int, 
        product_id int, 
        FOREIGN KEY (user_id) REFERENCES users(id), 
        FOREIGN KEY (product_id) REFERENCES products(id), 
        PRIMARY KEY(id)
        )`

        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('Orders table created...')
        })
    },

    create(req, res) {
        const {order_date, final_price, user_id, product_id} = req.body
        if (!order_date || !final_price || !user_id || !product_id) return res.status(400).send('Error: Falta algún campo por rellenar')
        const sql = `INSERT INTO orders (order_date, final_price, user_id, product_id) values ('${order_date}', '${final_price}', '${user_id}', '${product_id}')`
       
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.status(200).send('Order added...')
        })
    },

    update(req, res) {
        const id = req.params.id  
        const {order_date, final_price, user_id, product_id} = req.body
        const updateOrder = `UPDATE orders SET order_date = '${order_date}', final_price = '${final_price}', user_id = '${user_id}', product_id = '${product_id}' WHERE id = ${id}`
        db.query(updateOrder, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    get(req, res) {
        const sql = 'SELECT * FROM orders'
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result)
        })
    },


    getById(req, res) {
        const id = parseInt(req.params.id);
        const sql = `SELECT * FROM orders WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
            res.status(404).send('Pedido no encontrado')
            } else {
            res.status(200).json(result)
            }
        })
    },


    delete(req, res) {
        const id = parseInt(req.params.id)
        const sql = `DELETE FROM orders WHERE id = ${id}`
        db.query(sql, (err, result) => {
          if (err) throw err
          if (result === 0) {
            res.status(404).send('Pedido no encontrado')
          } else {
            res.status(200).send('Pedido eliminado')
          }
        })
      }

}

module.exports = OrdersControllers