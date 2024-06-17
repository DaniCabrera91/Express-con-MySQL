const express = require('express')

const router = express.Router()

const ProductControllers = require("../controllers/ProductControllers")

router.get('/table', ProductControllers.table)

router.post('/', ProductControllers.create)

router.put('/update/:id', ProductControllers.update)

router.get('/', ProductControllers.get)

router.get('/getWithCategory', ProductControllers.getWithCategory)

router.get('/getById/:id', ProductControllers.getById)
  
router.get('/getDescendent', ProductControllers.getDesc)

router.get('/productsByName/:productName', ProductControllers.getByName) 

router.delete('/delete/:id', ProductControllers.delete)


module.exports = router