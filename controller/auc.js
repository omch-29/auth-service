import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

export async function signup(req, res){
    try{
    const {name, email, password} = req.body;
    const isname = await User.findOne({name});
    if(isname) return res.status(400).json("name exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    }); 
    res.json({message: "User added"});
 }catch(err){
    console.error(err);
    res.status(500).json({err:"server error"});
 }
}
export async function login(req, res){
    try{
    const {name, password} = req.body;
    const user = await User.findOne({name});
    if(!user) res.status(400).json("invalid credentials");
    const valid = await bcrypt.compare(password,user.password);
    if(!valid) res.status(400).json({error: "Invalid credentials"});
        res.json({message:"login success"});
    }catch(err){
        console.error(err);
        res.status(500).json({err: "server error"});
    }
}