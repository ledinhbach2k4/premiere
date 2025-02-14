import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
        res.status(401).json({ message: 'Not authorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || secet)
        req.user = decoded;
        next();
    } catch (error){
        res.status(400).json({ message: 'Token is not valid' })
    }
}
export default authMiddleware