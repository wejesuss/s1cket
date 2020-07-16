import { Request, Response, NextFunction } from 'express';

export function symbolNotFound(
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    if (!req.params.symbol) {
        return res
            .status(400)
            .json({ error: "It's necessary a symbol as a parameter" });
    } else {
        next();
    }
}
