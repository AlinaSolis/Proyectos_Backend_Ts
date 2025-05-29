import express from "express";
import { generateAccessToken } from "../utils/generateToken.ts";
import cache from "../utils/cache.ts";
import dayjs from "dayjs";
import { User } from "../models/User.ts";


export const login=(req:express.Request, res:express.Response)=>{
    const {username,password}=req.body;
    if (username!=='admin' || password!=='admin') {
        return res.status(401)
            .json({message:"Credenciales Incorrectas"});
    }
    //123456
    const userId = '123456';
    const accessToken = generateAccessToken(userId);

    cache.set(userId, accessToken, 60 * 15);
    res.json({accessToken});
}

export const getTimeToken=(req:express.Request, res:express.Response)=>{
    const {userId}=req.params;
    const ttl =cache.getTtl(userId);
    
//Va a entra el if por si no existe por eso se pone la negacion 
    if(!ttl){
        return res.status(404)
        .json({message:"Token no encontrado"});
    }
    const now = Date.now();
    const timetolife = Math.floor((ttl - now)/1000);
    //libreria intalar dayjs 
    //ttl lo trasforma a un formato entendible 
    const expTime = dayjs(ttl).format('HH:mm:ss');
    
    return res.json({ timetolife, expTime});
}
//aui va 
//para actualizar put y pat

export const updateTime = (req: Request, res: Response) => {
  const { userId } = req.body;

  const ttl = cache.getTtl(userId);

  if (!ttl) {
    return res.status(404).json({ message: 'Token no encontrado o expirado' });

  }

  const nuevaTTLsegundos: number = 60 * 10;
  
  cache.ttl(userId, nuevaTTLsegundos);

  res.json("Actualizado con éxito");
};
export const getAllUsers = async (req: Request, res: Response) =>{
const userList=await User.frnd();//BUsqueda de todos los registris 
//const userList=await User.frnd({status:false})//Busqueda de todo 
return res.json({ userList});
}
