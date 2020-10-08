import Messages from './dbMessages'
import Pusher from 'pusher'
const express = require("express");
const mongoose = require('mongoose');
import cors from 'cors'
require('dotenv').config();

const { default: dbMessages } = require("./dbMessages");

const pusher = new Pusher({
    appId: '1086828',
    key: process.env.PUSHER_KEY ,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
    encrypted: true
  });


const app=express();
app.use(cors());

const connection_url=process.env.MONGODB_CONN;
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.once("open",()=>{
    console.log("DB connected!");

    const msgCollection = db.collection("messagecontents");
    const changeStream=msgCollection.watch();

    changeStream.on("change",(change)=>{
       
        if(change.operationType==='insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received

            });
        }else{
            console.log('error')
        }
    })
    
})

app.use(express.json());
const port = process.env.PORT || 9000;

app.get('/messages/sync',(req,res)=>{
    const dbMessage = req.body;
    Messages.find((err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(200).send(data);
    }
})
})

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(201).send(data);
    }
})
})

app.get('/',(req,res)=>res.status(200).send('hello world'));
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));