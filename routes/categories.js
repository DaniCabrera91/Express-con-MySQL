const express = require('express')

const router = express.Router()

const CategoryControllers = require("../controllers/CategoryControllers")


router.get('/table', CategoryControllers.table)  

router.post('/', CategoryControllers.create)

router.put('/update/:id', CategoryControllers.update)

router.get('/', CategoryControllers.get)

router.get('/id/:id', CategoryControllers.getById)  


module.exports = router