const express = require('express')
const router = express.Router()

const {
    getAll,
    getOne,
    getById,
    postOne,
    deleteOne,
    editOne
} = require('./../controllers/client.js')

router.get('/', getAll)
router.get('/one', getOne)
router.get('/:id', getById)
router.post('/', postOne)
router.delete('/:id', deleteOne)
router.patch('/:id', editOne)

module.exports = router