const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'dist')));

app.get('/',(req,res,next) => {
	res.sendFile(__dirname+'dist/index.html');
});

app.listen(process.env.PORT || 3333,() => console.log('i am running'));