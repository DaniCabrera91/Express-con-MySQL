const express = require('express')

const router = express.Router()

const ProductController = require("../controllers/ProductControllers")

router.get('/table', ProductController.table)

router.post('/', ProductController.create)

router.put('/update/:id', ProductController.update)

router.get('/', ProductController.get)

router.get('/getWithCategory', ProductController.getWithCategory)

router.get('/getById/:id', ProductController.getById)
  
router.get('/getDescendent', ProductController.getDesc)

router.get('/productsByName/:productName', ProductController.getByName) 

router.delete('/delete/:id', ProductController.delete)


module.exports = router