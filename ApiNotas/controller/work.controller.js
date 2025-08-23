const { default: mongoose, version } = require("mongoose")
const workModel = require("../models/work.model")


exports.getWorks = async (req, res) => {
    try {
        let ownerId =  req.decode.id 
        // owner:ownerId in false. isDeleted:false
        let data = await workModel.find({owner:ownerId}).populate('owner', 'nombre apellido correo')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getOneWork = async (req, res) => {
    try {
        let id = req.params.id
        let ownerId =  req.decode.id 
        let work = await workModel.findOne({_id:id,isDeleted:false,owner:ownerId}).populate('owner', 'nombre, apellido')

        if (work) {
        res.status(200).json(work)
    } else {
        res.status(205).json({msj: 'work not found!'})
    }
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.createWork = async (req, res) => {
    try {
        let data = req.body
        let id =  req.decode.id
        data.owner = id

        let newWork = new workModel(data)
        let guardado = await newWork.save()
        res.status(200).json(guardado)

    } catch (error) {
        res.status(500).json(error)
    }
}


exports.updateWork = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let owner = req.decode.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }

        let work = await workModel.findById(id)
       
        if (work.owner == owner) {
            let update = await workModel.findByIdAndUpdate(id, {$set: data, $inc: { __v: 1 }},{new: true})
            res.status(200).json(update)
        }else{
            res.status(403).json({msj: 'You are not the owner of this work.'})
        }
         
        

    } catch (error) {
        res.status(500).json(error)
    }
}


exports.deleteWork = async (req, res) => {
    try {
    let id = req.params.id
    let hardDelete = req.query.hard == 'true'
    let owner = req.decode.id
    
    const work = await workModel.findById(id)

    if (work.owner == owner) {
        if (hardDelete) {
            await workModel.findByIdAndDelete(id)
            return res.status(200).json({msj: 'work permanently deleted'})
        } else {
            if (work.isDeleted) {
                return res.status(410).json({msj: 'work already deleted'})
            } else {
                work.isDeleted = true
                work.deletedAt = new Date()
                await work.save()

                return res.status(200).json({msj:'work deleted', data: work})
            }
        }

    } else {
     return res.status(404).json({ message: 'Work not found' })
    }

   
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

