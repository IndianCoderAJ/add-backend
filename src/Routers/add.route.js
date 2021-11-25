var express = require('express');
const { listHandler,singleHandler,createHandler,updateHandler,deleteHandler } = require('../controller/add/add.controller');
var router = express.Router();



router.get('/:id', singleHandler);
router.post('/list', listHandler);
router.post('/', createHandler);
router.put('/', updateHandler);
router.delete('/', deleteHandler);

module.exports = router;