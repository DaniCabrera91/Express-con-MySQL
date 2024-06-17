const db = require('./config/database')

const express = require('express')
const app = express()

app.use(express.json())
app.use('/products', require('./routes/products'))
app.use('/categories', require('./routes/categories'))
app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))


const PORT = 3000

// Create a Database:
app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE expressSqlDB'
   
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.status(200).send('Database created...')
    })
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))






