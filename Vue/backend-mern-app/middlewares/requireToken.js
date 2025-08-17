import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error('No token found use Bearer token to send it');

        token = token.split(' ')[1]
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid;
        next()
    } catch (error) {
        return res.status(401).json({ok: false, error: error.message})
    }
}
