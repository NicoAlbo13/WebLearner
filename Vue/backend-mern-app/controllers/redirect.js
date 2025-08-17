import Link from "../models/Link.js";


export const redirectLink = async(req, res) => {
    try {
        const link = await Link.findOne({nano: req.params.nano})

        if(!link) return res.status(404).json({ok: false, error: 'No link with that nano id'});

        return res.redirect(link.full)
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({ok: false, error: 'Not a valid id'});
        }
        return res.status(500).json({ok: false, error: 'Internal server error'});
    }
}
