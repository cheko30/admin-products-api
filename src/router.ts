import { Router, Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import { createProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)

router.post('/',
    // Validation
    body('name')
        .notEmpty().withMessage('The product name is required!!!'),
    body('price')
        .isNumeric().withMessage('The price only numbers')
        .notEmpty().withMessage('The product price is required!!!')
        .custom(value => value > 0).withMessage('Price invalid'),
        (req: Request, res:Response, next: NextFunction) => {
            handleInputErrors(req, res, next)
        },
    (req: Request, res: Response) => {
        createProduct(req, res)
    }
)

router.put('/', (req, res) => {
    res.json('From PUT')
})

router.patch('/', (req, res) => {
    res.json('From PATCH')
})

router.delete('/', (req, res) => {
    res.json('From DELETE')
})

export default router