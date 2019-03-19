export const getToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token){
        const tokenValue = token.split(' ');
        if(tokenValue[0] === 'Bearer' && tokenValue[1]) req.token = tokenValue[1];
        next();
    }
    else{
        res.status(401);
        res.json({error: 'Unauthorized'});
    }
}