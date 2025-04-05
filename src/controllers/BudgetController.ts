import type { Request, Response } from 'express'
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {

        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // TODO: filtrar por el usuario autenticado
            })
            res.status(200).json(budgets)
        } catch (error) {
            //console.error('Error fetching budgets:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }

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
        res.json(req.budget)
    }

    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if (!budget) {
                return res.status(404).json({ error: 'Budget not found' })
            }

            await budget.update(req.body)
            res.json({ message: 'Budget updated successfully' })

        } catch (error) {
            //console.error('Error updating budget:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    static deleteById = (async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if (!budget) {
                return res.status(404).json({ error: 'Budget not found' })
            }

            await budget.destroy()
            res.json({ message: 'Budget deleted successfully' })

        } catch (error) {
            //console.error('Error deleting budget:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    })
}