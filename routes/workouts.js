const express = require('express')
const router = express.Router()

const {
    getAll,
    getOne,
    postOne,
    deleteOne,
    editOne
} = require('./../controllers/workout.js')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', postOne)
router.delete('/:id', deleteOne)
router.patch('/:id', editOne)

module.exports = router