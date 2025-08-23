
const { default: mongoose } = require("mongoose")
const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')


exports.getUser = async (req, res) => {
try {
    let data = await userModel.find({},'-password')
    res.status(200).json(data)
} catch (error) {
    res.status(500).json(error)
}
}

exports.getOneUser = async (req, res) => {
try {
    let id = req.params.id
    let user = await userModel.findById(id)
    if (user) {
        res.status(200).json(user)
    }else {
        res.status(205).json({msj: 'user not exist'})

    }
} catch (error) {
    res.status(500).json(error)
}
}

exports.createUser = async (req, res) => {
try {
    let body = req.body
    let newUser = new userModel(body)
    let guardado = await newUser.save()
    res.status(200).json(guardado)
} catch (error) {
    res.status(500).json({detalle: error.message, msj: 'error al crear el usuario'})
}
}

exports.updateUser = async (req, res) => {
try {
    let id = req.params.id
    let data = req.body

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID no válido' });
    }

    if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
    }


    let update = await userModel.findByIdAndUpdate(id, {$set:data , $inc:{__v: 1}}, {new: true}).lean()
    

    if (!update) {
        
        return res.status(404).json({ error: 'user not found' });

    }else{
        
        delete update.password
        res.status(200).json(update)
    }

} catch (error) {
    res.status(500).json(error)
}
}

exports.deleteUser = async (req, res) => {
try {
    let id = req.params.id
    let deleted = await userModel.findByIdAndDelete(id)
    res.status(200).json(deleted)
    
} catch (error) {
    res.status(500).json(error)
}
}

