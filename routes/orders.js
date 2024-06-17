const express = require('express')

const router = express.Router()

const OrdersControllers = require("../controllers/OrdersControllers")


router.get('/table', OrdersControllers.table)  

router.post('/', OrdersControllers.create)

router.put('/update/:id', OrdersControllers.update)

router.get('/', OrdersControllers.get)

router.get('/id/:id', OrdersControllers.getById)  


module.exports = router