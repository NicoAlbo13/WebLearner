import { response, request } from "express";
import { nanoid } from "nanoid";

import Link from "../models/Link.js";

export const getAllLinks = async (req, res=response) => {
    try {
        const allLinks = await Link.find({user: req.uid});
        res.json({ok: true, links: allLinks})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, error: 'Internal server error'});
    }
}

export const getLink = async (req=request, res=response) => {
    try {
        const link = await Link.findOne({nano: req.params.nano})

        if(!link) return res.status(404).json({ok: false, error: 'No link with that nano id'});

        res.json({ok: true, fullLink: link.full})
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({ok: false, error: 'Not a valid id'});
        }
        return res.status(500).json({ok: false, error: 'Internal server error'});
    }
}

// If traditional CRUD backed
// export const getLink = async (req=request, res=response) => {
//     try {
//         const link = await Link.findById(req.params.id)

//         if(!link) return res.status(404).json({ok: false, error: 'No link with that id'});

//         if(link.user != req.uid) return res.status(403).json({ok: false, error: 'Not authorized'});

//         res.json({link})
//     } catch (error) {
//         console.log(error);
//         if(error.kind === 'ObjectId'){
//             return res.status(403).json({ok: false, error: 'Not a valid id'});
//         }
//         return res.status(500).json({ok: false, error: 'Internal server error'});
//     }
// }

export const createLink = async (req, res) => {
    try {
        const newLink = {
            full: req.body.fullLink,
            nano: nanoid(6),
            user: req.uid
        }

        const link = new Link(newLink)
        const savedLink = await link.save()
        res.status(201).json({ok: true, link: savedLink})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, error: 'Internal server error'});
    }
}

export const updateLink = async (req, res=response) => {
    try {
        const link = await Link.findById(req.params.id)

        if(!link) return res.status(404).json({ok: false, error: 'No link with that id'});

        if(link.user != req.uid) return res.status(403).json({ok: false, error: 'Not authorized'});

        await link.updateOne({full: req.body.fullLink});

        const updatedLink = {
            ...link._doc,
            full: req.body.fullLink,
        }

        res.json({ok: true, link: updatedLink})
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({ok: false, error: 'Not a valid id'});
        }
        return res.status(500).json({ok: false, error: 'Internal server error'});
    }
}

export const removeLink = async (req=request, res=response) => {
    try {
        const link = await Link.findById(req.params.id)

        if(!link) return res.status(404).json({ok: false, error: 'No link with that id'});

        if(link.user != req.uid) return res.status(403).json({ok: false, error: 'Not authorized'});

        await link.deleteOne();

        res.json({ok: true, link})
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({ok: false, error: 'Not a valid id'});
        }
        return res.status(500).json({ok: false, error: 'Internal server error'});
    }
}
