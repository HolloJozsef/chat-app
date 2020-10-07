import Messages from './dbMessages'
const express = require("express");
const mongoose = require('mongoose');
const { default: dbMessages } = require("./dbMessages");

const app=express();
const connection_url='mongodb+srv://admin:admin@cluster0.jylwz.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});
app.use(express.json());
const port = process.env.PORT || 9000;

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(200).send(data);
    }
})
})

app.get('/',(req,res)=>res.status(200).send('hello world'));
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));