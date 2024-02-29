import { FastifyInstance } from 'fastify';
import { ProductController } from '../Service/Controllers/ProductController';

export default function ProductRoutes(fastify: FastifyInstance, controller: ProductController) {
  fastify.get('/products', controller.getProducts);
  fastify.get('/products/:id', controller.getProductById);
  fastify.post('/products', controller.createProduct);
  fastify.put('/products/:id', controller.updateProduct);
  fastify.delete('/products/:id', controller.deleteProduct);
}

export { ProductRoutes };