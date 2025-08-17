import jwt from 'jsonwebtoken';

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) throw new Error('No refreshToken provided');

        const {uid} = jwt.verify(refreshToken, process.env.JWT_REFRESH)
        req.uid = uid
        next()
    } catch (error) {
        return res.status(401).json({ok: false, error: error.message})
    }
}
