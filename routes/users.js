const express = require('express')

const router = express.Router()

const UsersControllers = require("../controllers/UsersControllers")

router.get('/table', UsersControllers.table)

router.post('/', UsersControllers.create)

router.put('/update/:id', UsersControllers.update)

router.get('/', UsersControllers.get)

router.get('/getById/:id', UsersControllers.getById)
  
router.delete('/delete/:id', UsersControllers.delete)


module.exports = router