let collection = require('../models/item');

const postItem = (req,res) => {
    let item = req.body;
    collection.postItem(item, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllItem = (req,res) => {
    collection.getAllItem((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const deleteItem = (req,res) => {
    let item = req.body;
    collection.deleteOne(item, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

module.exports = {postItem,getAllItem}