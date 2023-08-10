
let express = require('express');
let app = express();
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.9pm654b.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.PORT || 3000;
let collection;


app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

async function run() {
    try {
      await client.connect();
      collection = client.db().collection('Cats');
      console.log(collection);
    } catch(ex) {
      console.error(ex);
    }
}

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

app.get('/', function (req,res) {
    res.render('index.html');
});

app.post('/api/cat', function(req,res){
    // ask DB to post this CAT
    let cat = req.body;
    insertCat(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
});

function insertCat(cat, callback) {
    collection.insertOne(cat,callback);
}

app.get('/api/cats', (req,res)=>{
    getAllCats((err,result)=>{
        if (!err) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
});

function getAllCats(callback) {
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    run();
});

