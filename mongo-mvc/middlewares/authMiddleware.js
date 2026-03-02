import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    try {
        const header = req.header.authorization || "";
        const [type, token] = header.split(" ") //"Bearer token"

        //si no hay Bearer o no hay token
        if(type !== "Bearer" || !token) {
            return res.status(401).json({error: 'Token no proporcionado'})
        }
        
        // si hay token ---> verificamos el token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: verifyToken.id }

        next()

    } catch (err) {
        return res.status(401).json({error: "Token no valido o expirado"})
    }
}