const mongoose=require('mongoose');
const mongoURI="mongodb+srv://Anurag9458:Ramanand9458@cluster0.t263du0.mongodb.net/PMS";

const connectToMongo=async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongodb success");
    } catch (error) {
        
    }
}

module.exports=connectToMongo;