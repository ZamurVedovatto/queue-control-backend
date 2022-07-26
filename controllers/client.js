
const Client = require('./../models/clientModel')
const mongoose = require('mongoose')

const getAll = async(req, res) => {
    try {
        const data = await Client.find({}).sort({ createdAt: 1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOne = async(req, res) => {
    const { email, whatsapp } = req.body

    try {
        const data = await Client.find({$or:[{email}, {whatsapp}]})
        if (!data) res.status(404).json({error: 'data not found'})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getById = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'data not found'})
    }
    try {
        const data = await Client.findById(id)
        if (!data) res.status(404).json({error: 'data not found'})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postOne = async(req, res) => {
    const { name, whatsapp, email } = req.body

    let emptyFields = []
    if(!name) emptyFields.push('name')
    if(!whatsapp) emptyFields.push('whatsapp')
    if(!email) emptyFields.push('email')
    if(emptyFields.length > 0) return res.status(400).json( { error: 'please fill in all fields', emptyFields })

    try {
        const data = await Client.create({ name, whatsapp, email })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteOne = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'data not found'})
    }
    try {
        const data = await Client.findOneAndDelete({ _id: id })
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editOne = async(req, res) => {
    const { id } = req.params
    try {
        const data = await Client.findOneAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAll,
    getOne,
    getById,
    postOne,
    deleteOne,
    editOne
}