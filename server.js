const express = require('express');
const app = express();
const dir = express.static(__dirname + '/dist');
console.log(__dirname);
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.get('/', function(req,res) {
    res.sendFile(path.join( `${dir}/index.html`));
})

console.log('Console Listenin');