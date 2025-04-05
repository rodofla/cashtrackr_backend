import type { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget: Budget;
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('id')
            .isInt().withMessage('Id not valid')
            .custom((value) => value > 0).withMessage('Id not valid')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateBudgeExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const budget = await Budget.findByPk(id)
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' })
        }
        req.budget = budget
        next()
    } catch (error) {
        //console.error('Error fetching budget:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}