import { FastifyReply, FastifyRequest } from "fastify";
import ProductRepository from "../../Data/Repository/ProductRepository";
import { Product } from "../../Domain/Entities/Product";

const productRepository = new ProductRepository();

export class ProductController {
  
    async getProducts(FastifyRequest: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await productRepository.getAll();
            reply.send(products);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
    async getProductById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        try {
            const productId = request.params.id;
            const product = await productRepository.getById(productId);
            if (!product) {
                reply.status(404).send({ error: "Product not found" });
                return;
            }
            reply.send(product);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
    async createProduct(request: FastifyRequest<{ Body: Product }>, reply: FastifyReply) {
        try {
            const newProduct = await productRepository.create(request.body);
            reply.status(201).send(newProduct);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
    async updateProduct(request: FastifyRequest<{ Params: { id: number }, Body: Product }>, reply: FastifyReply) {
        try {
            const productId = request.params.id;
            console.log(request.body);

            const updatedProduct = await productRepository.update(productId, request.body);
            if (!updatedProduct) {
                reply.status(404).send({ error: "Product not found" });
                return;
            }
            reply.send(updatedProduct);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: error });
        }
    }

    async deleteProduct(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        try {
            const productId = request.params.id;
            const deletedProduct = await productRepository.delete(productId);
            if (!deletedProduct) {
                reply.status(404).send({ error: "Product not found" });
                return;
            }
            reply.send(deletedProduct);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
}

export default ProductController;