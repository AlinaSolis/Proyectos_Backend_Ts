import express from "express";
import { generateAccessToken } from "../utils/generateToken.ts";
import cache from "../utils/cache.ts";
import dayjs from "dayjs";

export const login=(req:express.Request, res:express.Response)=>{
    const {username,password}=req.body;
    if (username!=='admin' || password!=='admin') {
        return res.status(401)
            .json({message:"Credenciales Incorrectas"});
    }
    const userId = '123456';
    const accessToken = generateAccessToken(userId);

    cache.set(userId, accessToken, 60 * 15);
    res.json({accessToken});
}

export const getTimeToken=(req:express.Request, res:express.Response)=>{
    const {userId}=req.body;
    const ttl =cache.getTtl(userId);
    

    if(!ttl){
        return res.status(404)
        .json({message:"Token no encontrado"});
    }
    const now = Date.now();
    const timetolife = Math.floor((ttl - now)/1000);
    
    const expTime = dayjs(ttl).format('HH:mm:ss');
    
    return res.json({ timetolife, expTime});
}
