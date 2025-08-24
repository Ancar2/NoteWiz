const express = require ('express')
const controllUser = require('../controller/user.controller')
const controllerWork = require('../controller/work.controller')
const { middlewareJWT } = require('../middleware/jwt')
const { login } = require('../controller/login.controller')
const router = express.Router()

//rutas de usuario
router.get('/users', controllUser.getUser)
router.get('/users/:id', controllUser.getOneUser)
router.post('/users/create', controllUser.createUser)
router.post('/users/verify', controllUser.verificar)
router.put('/users/update/:id', controllUser.updateUser)
router.delete('/users/delete/:id', controllUser.deleteUser)

//rutas de tareas
router.get('/works',middlewareJWT,controllerWork.getWorks)
router.get('/works/:id',middlewareJWT,controllerWork.getOneWork)
router.post('/works/create',middlewareJWT, controllerWork.createWork)
router.put('/works/update/:id',middlewareJWT,controllerWork.updateWork)
router.delete('/works/delete/:id',middlewareJWT,controllerWork.deleteWork )

//Login
router.post('/login', login)

module.exports = router