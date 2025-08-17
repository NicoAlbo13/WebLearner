import { response, request } from "express";

import User from "../models/User.js";
import { generateRefreshToken, generateToken } from "../helpers/tokenManager.js";

export const loginUser = async(req, res=response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({ok: false, errorMessage: 'Incorrect credentials'})
        }

        const passwordCheck = await user.comparePassword(password)

        if(!passwordCheck){
            return res.status(400).json({ok: false, errorMessage: 'Incorrect credentials'})
        }

        //TODO: add JWT
        const response = generateToken({uid: user.id})
        generateRefreshToken({uid: user.id}, res)


        return res.status(200).json({ok: true, ...response})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, errorMessage: error.errmsg})
    }

}

export const registerUser = async(req, res=response) => {
    try {
        const user = new User(req.body)
        const result = await user.save()

        //TODO: add JWT
        const response = generateToken({uid: user.id})
        generateRefreshToken({uid: user.id}, res)

        return res.status(201).json({ok: true, ...response, email: result.email});
    } catch (error) {
        console.log(error);

        if(error.code===11000){
            return res.status(400).json({ok: false, errorMessage: 'Already exists a user with that email'})
        }

        return res.status(500).json({ok: false, errorMessage: error.errmsg})
    }
}

export const refreshToken = (req=request, res=response) => {
    try {
        const response = generateToken({uid: req.uid})
        return res.status(200).json({ok: true, ...response})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, error: 'Internal server error'})
    }
}

export const logoutUser = (req=request, res=response) => {
    res.clearCookie('refreshToken')
    res.json({ok: true, msg: 'logout'})
}

//not part of auth just for testing
export const infoUser = async (req, res=response) => {
    try {
        console.log(req.uid);

        const user = await User.findById(req.uid)
        res.json({ok: true, email: user.email})
    } catch (error) {
        return res.status(500).json({ok: false, error: 'Internal server error'})
    }
}
