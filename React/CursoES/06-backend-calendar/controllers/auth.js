import {response} from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import {generateJWT} from '../helpers/jwt.js'

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

        //Generate token
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

        //Generate JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            msg: 'login',
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error on register'
        })
    }

}

export const validToken = async(req, res = response )=> {

    const { uid, name } = req

    //Generate JWT
    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}
