import { Router, Request, Response, NextFunction } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: Product 1
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 1500
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *             - Products
 *          description: Return a list of products
 *          responses:
 *               200:
 *                  description: Successfull response
 *                  content:
 *                     application/json:
 *                         schema:
 *                           type: array
 *                           items:
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a produuct based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Invalid ID
 */
router.get('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req: Request, res: Response) =>{getProductById(req, res)}
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             name:
 *                                  type: string
 *                                  example: Product 1
 *                             price:
 *                                  type: number
 *                                  example: 1500
 *          responses:
 *              201:
 *                  description: Product created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid input data
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *     put:
 *        summary: Update a product with user input
 *        tags:
 *           - Products
 *        description: Returns the updated product
 *        parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *        requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                             name:
 *                                  type: string
 *                                  example: Product 1
 *                             price:
 *                                  type: number
 *                                  example: 1500
 *                             availability:
 *                                 type: boolean
 *                                 example: true
 *        responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or Invalid input data
 *          404:
    *           description: Product not found
 */
router.put('/:id',
    param('id').isInt().withMessage('ID not valid'),
    body('name').notEmpty().withMessage('The product name is required!!!'),
    body('price')
        .isNumeric().withMessage('The price only numbers')
        .notEmpty().withMessage('The product price is required!!!')
        .custom(value => value > 0).withMessage('Price invalid'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req:Request, res:Response) => {updateProduct(req,res)}
)

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *       summary: Update the availability of a product
 *       tags:
 *          - Products
 *       description: Returns the updated availability
 *       parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *       responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *           description: Product not found
 */
router.patch('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req:Request, res:Response) => {updateAvailability(req, res)}
)


/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *       summary: Deletes a product by a given ID
 *       tags:
 *          - Products
 *       description: Returns the updated availability
 *       parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *       responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                     schema:
 *                          type: string
 *                          value: 'Product deleted successfully'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *           description: Product not found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID not valid'),
    (req:Request, res:Response, next:NextFunction) =>{handleInputErrors(req, res, next)},
    (req:Request, res:Response) => {deleteProduct(req, res)}
)

export default router