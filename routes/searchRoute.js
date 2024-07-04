const router = require('express').Router()

const {
    SearchResultGetController,
} = require('../controllers/searchController')

router.get('/', SearchResultGetController)

module.exports = router
