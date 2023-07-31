
let express = require('express');


let app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




let port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/'));


app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log('server started');
});