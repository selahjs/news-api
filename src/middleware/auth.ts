import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorize = (roles: ('author' | 'reader')[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ Success: false, Message: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ Success: false, Message: "Forbidden" });
      }
      req.user = decoded; // Contains sub (userId) and role
      next();
    } catch (err) {
      return res.status(401).json({ Success: false, Message: "Invalid Token" });
    }
  };
};