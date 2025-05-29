import { Document, model, Schema, Types } from "mongoose";
//interfdaces o medelos para cada pantalla en from 
export interface IUser extends Document{
    id:Types.ObjectId;
    username:string;
    password:string;
    role:string;
    email:string;
    status:boolean;
    createDate:Date;
    daleteDate:Date;
}
const userSchem = new Schema<IUser>({
    username:{
        type:String,
        require:true,
        //tiene que se unico 
        unique:true
    },
    email:{
        type:String,
        require:true,
        //tiene que se unico 
        unique:true
    },
    password:{
        type:String,
        require:true
        
    },
    role:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    createDate:{
        type:Date
    }

});

export const User = model<IUser>('User', userSchem, 'user');
//fecha de creacion  y de eliminacion para  nuestra integradora 