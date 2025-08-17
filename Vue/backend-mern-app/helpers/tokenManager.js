import jwt from 'jsonwebtoken';

export const generateToken = (payload={}) => {
    try {
        const expiresIn = 60 * 15;

        const token = jwt.sign({...payload}, process.env.JWT_SECRET, {expiresIn});
        return {token, expiresIn}
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (payload={}, res) => {
    try {
        const expiresIn = 60 * 60 * 24;
        const refreshToken = jwt.sign({...payload}, process.env.JWT_REFRESH, {expiresIn})
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + expiresIn * 1000)
        });

    } catch (error) {
        console.log(error);
    }
}
