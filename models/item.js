let client = require('../dbConnection');

let collection = client.db().collection('Item');

function postItem(item, callback) {
    collection.insertOne(item,callback);
}

function getAllItem(callback) {
    collection.find({}).toArray(callback);
}

module.exports = {postItem,getAllItem}