let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function(req,res){
    controller.postItem(req,res);
});

router.get('/', (req,res)=>{
    controller.getAllItem(req,res);
});

router.delete('/', (req,res)=>{
    controller.getAllItem(req,res);
});


module.exports = router;