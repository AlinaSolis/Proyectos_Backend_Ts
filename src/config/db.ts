import mongoose from "mongoose";

const connectDBMongo= async ():Promise<void> =>{
    //
    const mongoUri = "mongodb://localhost:27017/Proyecto_I4.0";

    try{
        await mongoose.connect(mongoUri);
        console.log("Cpnexion a mongo")
    }catch(error){
        console.log("Error a conecion: ", error);
    }
}

export default connectDBMongo;