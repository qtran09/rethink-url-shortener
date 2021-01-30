const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const encodeRouter = require('./routes/encoder');
const decodeRouter = require('./routes/decoder');

app.use('/encoder', encodeRouter);
app.use('/decoder', decodeRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => 
{
    console.log('MongoDB database connection established successfully');
});

const URL = require('./models/url');
app.route('/:alias').get((req,res) => 
{
    const id = req.params.alias;
    console.log("Redirect ID: " + id);
    URL.findById(id, (err,data) => 
    {
        if(data)
        {
            console.log("Data: "  + data);
            res.redirect(data.url);
        }
        else
        {
            console.log("Redirect error: " + err);
            res.redirect('/');
        }
    });
    
});

app.listen(port, () => 
{
    console.log('Server is running on port: ' + port);
});