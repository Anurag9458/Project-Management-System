const express=require('express');
const connectToMongo=require("./db");
const cors=require("cors");

connectToMongo();
const app=express();
const port=5000;


app.use(cors());
app.use(express.json());

// //Available Routes
app.use("/api/forms",require('./routes/form'));
app.use("/api/auth",require('./routes/auth'));

app.get('/',(req,res)=>{
    res.send(JSON.stringify("Hello World!"));
})



app.listen(port,()=>{
    console.log("Server Started");
})