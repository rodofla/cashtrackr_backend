import type { Request, Response } from 'express'
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        console.log('GET /api/v1/budgets')
    }

    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)

            await budget.save()
            res.status(201).json({ message: 'Budget created successfully' })

        } catch (error) {
            //console.error('Error creating budget:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    static getById = async (req: Request, res: Response) => {
        console.log('GET /api/v1/budgets/:id')
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('PUT /api/v1/budgets/:id')
    }

    static deleteById = (async (req: Request, res: Response) => {
        console.log('DELETE /api/v1/budgets/:id')
    })
}