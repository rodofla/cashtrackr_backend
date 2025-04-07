import { Router } from 'express'
import { body } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middlewares/validation'
import { validateBudgeExists, validateBudgetId, validateBudgetInput } from '../middlewares/budget'
import { ExpensesController } from '../controllers/ExpenseController'

const router = Router()

// GENERAL MIDDLEWARES FOR ALL ROUTES
router.param('budgetId', validateBudgetId) // Validate the budgetId parameter for all routes that have it
router.param('budgetId', validateBudgeExists) // Validate if the budget exists for all routes that have it

// Budget routes
router.get('/', BudgetController.getAll)

router.post('/', validateBudgetInput, BudgetController.create)

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId', validateBudgetInput, BudgetController.updateById)

router.delete('/:budgetId', BudgetController.deleteById)


/** Routes for expenses */

router.get('/:budgetId/expenses', ExpensesController.getAll)
router.post('/:budgetId/expenses', ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)


export default router