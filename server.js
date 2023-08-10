
let express = require('express');
let app = express();
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.9pm654b.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.PORT || 3000;
let collection;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  async function runDBConnection() {
    try {
      await client.connect();
      collection = client.db().collection('cat');
      console.log(collection);
    } catch(ex){
        console.error(ex);
    }
  }
  runDBConnection().catch(console.dir);

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/api/cat',(req,res)=>{
    getAllCats((err,result)=>{
        if(!err){
            res.json({statusCode:200, data:result, message:'get all cats successful'});
        }
    });
});

app.post('/api/cat',(req,res)=>{
    let cat = req.body;
    postCat(cat,(err, result) => {
        if(!err){
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postCat(cat,callback){
    collection.insertOne(cat,callback);
}

function getAllCats(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, () => {
    console.log('server started');
    runDBConnection();
});

