import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                'description': 'API operations related to products'
            }
        ],
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'API Documentation for Products'
        }
    },
    apis: [
        './src/router.ts'
    ]
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerOptions: SwaggerUiOptions = {
    customSiteTitle: 'Products API Documentation'

}
export default swaggerSpec
export { swaggerOptions }