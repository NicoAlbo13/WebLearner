
export const validLink = async (req, res, next) => {
    try {
        let {fullLink} = req.body

        if (!fullLink.startsWith('https://')){
            fullLink = 'https://'+fullLink;
            req.body.fullLink = fullLink
        }

        const res = await fetch(fullLink, { method: "HEAD" });
        if (!res.ok) throw new Error('This is not a valid Link 404');
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({ok: false, error: error.message})
    }
}
