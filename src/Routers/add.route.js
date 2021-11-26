var express = require('express');
const { listHandler,singleHandler,createHandler,updateHandler,deleteHandler,dummyDataHandler } = require('../controller/add/add.controller');
var router = express.Router();


router.get('/dummyData', dummyDataHandler);
router.get('/:id', singleHandler);
router.post('/list', listHandler);
router.post('/', createHandler);
router.put('/', updateHandler);
router.delete('/', deleteHandler);


module.exports = router;