import {response} from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const newUser = async(req, res = response )=>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'User already registered with that email'
            })
        }

        user = new User( req.body )

        //HASH password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error on register'
        })
    }
}

export const loginUser = async(req, res = response )=>{
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Cannot find a user with that email'
            })
        }

        //Check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'No valid password'
            })
        }

        //TODO: JWT

        res.json({
            ok: true,
            msg: 'login',
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error on register'
        })
    }

}

export const validToken = (req, res = response )=> {
    res.json({
        ok: true,
        msg: 'token'
    })
}
