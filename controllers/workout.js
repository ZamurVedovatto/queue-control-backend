
const Workout = require('./../models/workoutModel')
const mongoose = require('mongoose')

const getAll = async(req, res) => {
    try {
        const data = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOne = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'data not found'})
    }
    try {
        const data = await Workout.findById(id)
        if (!data) res.status(404).json({error: 'data not found'})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postOne = async(req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []
    if(!title) emptyFields.push('title')
    if(!reps) emptyFields.push('reps')
    if(!load) emptyFields.push('load')
    if(emptyFields.length > 0) return res.status(400).json( { error: 'please fill in all fields', emptyFields })

    try {
        const data = await Workout.create({ title, reps, load })
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
        const data = await Workout.findOneAndDelete({ _id: id })
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editOne = async(req, res) => {
    const { id } = req.params
    try {
        const data = await Workout.findOneAndUpdate({ _id: id }, {
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
    postOne,
    deleteOne,
    editOne
}