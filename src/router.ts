import { Router, Request, Response, NextFunction } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)
router.get('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req: Request, res: Response) =>{getProductById(req, res)}
)

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

router.put('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req:Request, res:Response) => {updateProduct(req,res)}
)

router.patch('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req:Request, res:Response) => {updateAvailability(req, res)}
)

router.delete('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req:Request, res:Response) => {deleteProduct(req, res)}
)

export default router