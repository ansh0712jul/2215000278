const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const postRoute = require('./routes/post.route');

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/evaluation-service', postRoute);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(8080,()=>{
    console.log("Server is listening on port 8080 🥳🥳")
})