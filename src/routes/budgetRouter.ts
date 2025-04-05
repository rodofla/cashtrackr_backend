import { Router } from 'express'
import { body } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middlewares/validation'
import { validateBudgeExists, validateBudgetId } from '../middlewares/budget'

const router = Router()

router.get('/', BudgetController.getAll)

router.post('/',
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('amount').notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number')
        .custom((value) => value > 0).withMessage('Amount must be a positive number greater than 0'),
    handleInputErrors,
    BudgetController.create)

router.get('/:id', 
    validateBudgetId,
    validateBudgeExists,
    BudgetController.getById)

router.put('/:id', 
    validateBudgetId,
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('amount').notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number')
        .custom((value) => value > 0).withMessage('Amount must be a positive number greater than 0'),
    handleInputErrors,
    BudgetController.updateById)

router.delete('/:id', 
    validateBudgetId,
    BudgetController.deleteById)


export default router